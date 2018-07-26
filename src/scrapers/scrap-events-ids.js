import querystring from 'querystring'
import url from 'url'
import bluebird from 'bluebird'
import R from 'ramda'
import { JSDOM } from 'jsdom'


const MAX_OFFSET_SELECTOR = '#pageOuter > div > div.content > div.columnBox > table:nth-child(1) > tbody > tr > td:nth-child(2) > div > div.fluidFilterBox > div:nth-child(4) > div > div:nth-child(1) > div:nth-child(6) > a'
const EVENTS_TABLE_SELECTOR = '#calendarSchedule'
const EVENT_LINK_SELECTOR = 'tr > td > table > tbody > tr:nth-child(1) > td > div.desktop > div > a:nth-child(1)'
const OFFSET_STEP = 20

export const scrapEventsIds = (boxrecScrapper) => async ({
  offset = 0,
  limit = null,
}) => {
  const html = await boxrecScrapper.requestors.getHTML(url.resolve(boxrecScrapper.config.url, boxrecScrapper.config.routes.events))  
  const { window: { document } } = new JSDOM(html)

  const maxOffset = querystring.parse(document.querySelector(MAX_OFFSET_SELECTOR).href).offset
  const iterationsCount = Math.ceil(
    limit
      ? Math.min(limit, maxOffset) / OFFSET_STEP
      : maxOffset / OFFSET_STEP
  )
  
  return await bluebird.Promise.reduce(
    new Array(iterationsCount),
    async (acc, _, index) => {
      const uri = url.resolve(
        boxrecScrapper.config.url,
        `${boxrecScrapper.config.routes.events}?${querystring.stringify({ offset: index * OFFSET_STEP + offset })}`
      )

      const html = await boxrecScrapper.requestors.getHTML(uri)
      const {
        window: {
          document,
        },
      } = new JSDOM(html)

      const eventsTable = document.querySelector(EVENTS_TABLE_SELECTOR)

      const events = eventsTable.childNodes
        |> R.remove(1, 2)
        |> R.filter(
          (e) => e
          |> R.prop('tagName')
          |> R.equals('THEAD')
        )
        |> R.take(limit - OFFSET_STEP * index)
    
      const eventsLinks = events.map(
        (e) => e.querySelector(EVENT_LINK_SELECTOR).href
          |> R.split('/')
          |> R.last
      )

      return [
        ...acc,
        ...eventsLinks,
      ]
    },
    []
  )
}

