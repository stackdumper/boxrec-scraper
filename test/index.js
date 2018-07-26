import test from 'ava'
import { boxrecScraper } from '../'

test('initialization', (t) => {
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

test('config', (t) => {
  t.truthy(boxrecScraper.defaultConfig)
  t.truthy(boxrecScraper.config)

  t.deepEqual(boxrecScraper.config, boxrecScraper.defaultConfig)

  const newConfig = {
    url: 'updated',
    routes: {},
    auth: {},
  }

  boxrecScraper.configure(newConfig)

  t.deepEqual(boxrecScraper.config, newConfig)
  t.notDeepEqual(boxrecScraper.config, boxrecScraper.defaultConfig)
  boxrecScraper.resetConfig()
  t.deepEqual(boxrecScraper.config, boxrecScraper.defaultConfig)

  const authCredentials = {
    email: 'updated',
    password: 'updated'
  }

  boxrecScraper.configureAuthCredentials(authCredentials)

  t.deepEqual(boxrecScraper.config.auth, authCredentials)
  boxrecScraper.resetConfig()
  t.deepEqual(boxrecScraper.config, boxrecScraper.defaultConfig)
})

test('scrap events ids', async (t) => {
  boxrecScraper.configureAuthCredentials({
    email: 'stackdumper',
    password: 'unsafe_password'
  })

  const eventsIds = await boxrecScraper.scrapers.scrapEventsIds({
    offset: 0,
    limit: 30
  })

  t.truthy(eventsIds)
  t.is(eventsIds.length, 30)

  const eventsIds2 = await boxrecScraper.scrapers.scrapEventsIds({
    offset: 1,
    limit: 2
  })

  t.truthy(eventsIds2)
  t.is(eventsIds2.length, 2)
  t.is(eventsIds[1], eventsIds2[0])
})

test('scrap fighter', async (t) => {
  boxrecScraper.configureAuthCredentials({
    email: 'stackdumper',
    password: 'unsafe_password'
  })

  const fighter = await boxrecScraper.scrapers.scrapFighter('447121')

  t.deepEqual(fighter, {
    id: '447121',
    role: 'boxer',
    bouts: '33',
    rounds: '177',
    KOs: '73%',
    status: 'active',
    born: '1987-09-2',
    nationality: 'USA',
    debut: '2008-03-14',
    division: 'welterweight',
    residence: 'Omaha, Nebraska, USA',
    birthPlace: 'Omaha, Nebraska, USA',
    name: 'Terence Crawford',
    image: 'http://static.boxrec.com/thumb/7/70/Crawford_Terence.jpg/200px-Crawford_Terence.jpg'
  }) 
})
