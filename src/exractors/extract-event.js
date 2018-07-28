import R from 'ramda'
import { JSDOM } from 'jsdom'


const CARD_DATE_SELECTOR = '#eventResults > thead:nth-child(1) > tr > td > table > tbody > tr:nth-child(1) > td > h2'
const CARD_TITLES_SELECTOR = '.titleLink'
const FIGHTS_ROWS_SELECTOR = '#eventResults > tbody:nth-child(3) > tr'

export const extractEvent = (boxrecScraper) => (html) => {
  const { window: { document } } = new JSDOM(html)

  return {
    date: document.querySelector(CARD_DATE_SELECTOR)?.textContent?.trim(),
    titles: document.querySelectorAll(CARD_TITLES_SELECTOR)
      |> R.map(
        R.pipe(
          R.prop('textContent'),
          R.trim,
        )
      ),
    fights: document.querySelectorAll(FIGHTS_ROWS_SELECTOR)
      |> R.addIndex(R.reduce)(
        (acc, cur, index) => {          
          if (cur.childNodes.length === 1) {            
            if (cur.className.split(' ').includes('SR')) {
              acc[index - 1].secondRow = cur
              
              return acc
            }
          } else {
            return [
              ...acc,
              cur,
            ]
          }
        },
        []
      )
      |> R.map(boxrecScraper.extractors.extractFight),
      // |> R.filter(el => el.childNodes.length !== 1)
      // |> R.map(boxrecScraper.extractors.extractFight),
  }
}
