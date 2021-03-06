import R from 'ramda'
import { JSDOM } from 'jsdom'


const CARD_DATE_SELECTOR = '#eventResults > thead:nth-child(1) > tr > td > table > tbody > tr:nth-child(1) > td > h2'
const CARD_TITLES_SELECTOR = '.titleLink'
const FIGHTS_ROWS_SELECTOR = '#eventResults > tbody:nth-child(3) > tr'
const CARD_ID_SELECTOR = '#eventResults > thead:nth-child(1) > tr > td > table > tbody > tr:nth-child(1) > td > div.desktop > div > a'

export const extractEvent = (boxrecScraper) => (html) => {
  const { window: { document } } = new JSDOM(html)

  return {
    id: document.querySelector(CARD_ID_SELECTOR).href?.split(':').pop(),
    date: document.querySelector(CARD_DATE_SELECTOR)?.textContent?.trim(),
    titles: R.map(
      R.pipe(
        R.prop('textContent'),
        R.trim,
      )
    )(document.querySelectorAll(CARD_TITLES_SELECTOR)),
    fights: R.pipe(
      R.addIndex(R.reduce)(
        (acc, cur, index) => {
          if (isNaN(parseInt(cur.id))) {
            if (acc.length > 0) {
              acc[acc.length - 1].secondRow = cur
            }

            return acc
          }

          return [
            ...acc,
            cur,
          ]
        },
        []
      ),
      R.map(boxrecScraper.extractors.extractFight),
      // R.filter(el => el.childNodes.length !== 1)
      // R.map(boxrecScraper.extractors.extractFight),
    )(document.querySelectorAll(FIGHTS_ROWS_SELECTOR)),
  }
}
