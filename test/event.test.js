import test from 'ava'
import { createBoxrecScraper } from '../'
import { config } from '../config/test'


test.beforeEach((t) => {
  t.context.boxrecScraper = createBoxrecScraper(config)
})

test('scrap events ids', async (t) => {
  const { boxrecScraper } = t.context

  const eventsIds = await boxrecScraper.scrapers.scrapEventsIds({
    offset: 0,
    limit: 30,
  })

  t.truthy(eventsIds)
  t.is(eventsIds.length, 30)

  const eventsIds2 = await boxrecScraper.scrapers.scrapEventsIds({
    offset: 1,
    limit: 2,
  })

  t.truthy(eventsIds2)
  t.is(eventsIds2.length, 2)
  t.is(eventsIds[1], eventsIds2[0])
})

test('scrap event', async (t) => {
  const { boxrecScraper } = t.context

  const event = await boxrecScraper.scrapers.scrapEvent('754460')

  t.truthy(event)
  t.truthy(event.date)
  t.truthy(event.titles)
  t.truthy(event.fights)

  t.is(event.date, 'Wednesday 26, July 2017')

  t.is(event.titles.length, 1)
  t.is(event.titles[0], 'World Boxing Association Fedelatin Welterweight Title')
  

  t.is(event.fights.length, 10)
  t.deepEqual(event.fights[0], {
    boxrecId: '2176794',
    division: 'welterweight',
    fighters: [ '723287', '240119' ],
    titles: [ 'World Boxing Association Fedelatin Welterweight Title' ]
  })

  t.pass()
})

test('scrap another event', async (t) => {
  const { boxrecScraper } = t.context

  const event = await boxrecScraper.scrapers.scrapEvent('771965')

  t.truthy(event)
  t.is(event.date, 'Saturday 28, July 2018')
  t.deepEqual(event.titles, ['South American Bantamweight Title'])
  t.is(event.fights.length, 6)
})
