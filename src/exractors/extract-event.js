import R from 'ramda'
import { JSDOM } from 'jsdom'


const DATE_SELECTOR = '#eventResults > thead:nth-child(1) > tr > td > table > tbody > tr:nth-child(1) > td > h2'
const FIGHTS_ROWS_SELECTOR = '#eventResults > tbody:nth-child(3) > tr'

export const extractEvent = (boxrecScraper) => (html) => {
  const { window: { document } } = new JSDOM(html)

  return {
    date: document.querySelector(DATE_SELECTOR)?.textContent?.trim()
      |> Date,
    fights: document.querySelectorAll(FIGHTS_ROWS_SELECTOR)
      |> R.drop(1)
      |> R.filter(el => el.childNodes.length !== 1)
      |> R.map(boxrecScraper.extractors.extractFight),
  }
}
