import test from 'ava'
import { createBoxrecScraper } from '../'
import { config } from '../config/test'


test.beforeEach((t) => {
  t.context.boxrecScraper = createBoxrecScraper(config)
})

test('initialization', (t) => {
  const { boxrecScraper } = t.context

  t.truthy(boxrecScraper)

  // check scrapers
  t.truthy(boxrecScraper.scrapers.scrapEventsIds)
  t.truthy(boxrecScraper.scrapers.scrapEvent)
  t.truthy(boxrecScraper.scrapers.scrapEventFightsFighters)
  t.truthy(boxrecScraper.scrapers.scrapFightFighters)
  t.truthy(boxrecScraper.scrapers.scrapFighter)

  // check extractors
  t.truthy(boxrecScraper.extractors.extractEvent)
  t.truthy(boxrecScraper.extractors.extractFight)
  t.truthy(boxrecScraper.extractors.extractFighter)

  // check requestors
  t.truthy(boxrecScraper.requestors.getHTML)
})
