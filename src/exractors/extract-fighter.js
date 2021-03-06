import { JSDOM } from 'jsdom'
import R from 'ramda'


const NAME_SELECTOR = '#pageOuter > div > div.content > div.columnBox > div.filterBar > div.singleColumn > table > tbody > tr:nth-child(1) > td.defaultTitleAlign > h1'
const IMAGE_SELECTOR = '#pageOuter > div > div.content > div.columnBox > div.filterBar > div.singleColumn > table > tbody > tr.profileTable > td:nth-child(1) > div > a > img'
const DATA_NODES_SELECTORS = [
  '#pageOuter > div > div.content > div.columnBox > div.filterBar > div.singleColumn > table > tbody > tr.profileTable > td:nth-child(2) > div:nth-child(1) > table > tbody > tr',
  '#pageOuter > div > div.content > div.columnBox > div.filterBar > div.singleColumn > table > tbody > tr.profileTable > td:nth-child(2) > div:nth-child(2) > table > tbody > tr',
]
const WON_SELECTOR = '#pageOuter > div > div.content > div.columnBox > div.filterBar > div.singleColumn > table > tbody > tr.profileTable > td:nth-child(1) > div > div > table > tbody > tr:nth-child(1) > td.bgW'
const LOST_SELECTOR = '#pageOuter > div > div.content > div.columnBox > div.filterBar > div.singleColumn > table > tbody > tr.profileTable > td:nth-child(1) > div > div > table > tbody > tr:nth-child(1) > td.bgL'
const DRAW_SELECTOR = '#pageOuter > div > div.content > div.columnBox > div.filterBar > div.singleColumn > table > tbody > tr.profileTable > td:nth-child(1) > div > div > table > tbody > tr:nth-child(1) > td.bgD'

const labelKeys = {
  role: 'role',
  bouts: 'bouts',
  rounds: 'rounds',
  KOs: 'KOs',
  status: 'status',
  alias: 'alias',
  born: 'born',
  nationality: 'nationality',
  debut: 'debut',
  division: 'division',
  stance: 'stance',
  height: 'height',
  residence: 'residence',
  'birth place': 'birthPlace',
}

const processors = {
  born: R.pipe(
    R.take(9),
    R.pipe(
      R.split('-'),
      ([year, month, date]) => `${year}-${(`0${month}`).slice(-2)}-${(`0${date}`).slice(-2)}`,
    )
  ),
}

export const extractFighter = () => async (html, id) => {
  const { window: { document } } = new JSDOM(html)

  return R.pipe(
    R.map((selector) => document.querySelectorAll(selector)),
    R.flatten,
    R.reduce(
      (fighter, node) => {
        const key = labelKeys[node.querySelector('td.rowLabel > b')?.textContent?.trim()]

        return key
          ? {
            ...fighter,
            [key]: (processors[key] || R.identity)(
                node.querySelector('td:nth-child(2) > b')?.textContent?.trim()
                || node.querySelector('td:nth-child(2)')?.textContent?.trim()
            ),
          }
          : fighter
      },
      {},
    ),
    R.assoc('name', document.querySelector(NAME_SELECTOR)?.textContent),
    R.assoc('image', document.querySelector(IMAGE_SELECTOR)?.src),
    R.assoc('won', document.querySelector(WON_SELECTOR)?.textContent),
    R.assoc('lost', document.querySelector(LOST_SELECTOR)?.textContent),
    R.assoc('draw', document.querySelector(DRAW_SELECTOR)?.textContent),
    R.assoc('id', id)
  )(DATA_NODES_SELECTORS)
}
