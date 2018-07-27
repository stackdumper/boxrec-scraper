import test from 'ava'
import { createBoxrecScraper } from '../'

const config = {
  auth: {
    email: 'stackdumper',
    password: 'unsafe_password'
  }
}

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

test('config', (t) => {
  const { boxrecScraper } = t.context

  // check config existence
  t.truthy(boxrecScraper.defaultConfig)
  t.truthy(boxrecScraper.config)


  // reseted config should be equal to default config
  boxrecScraper.resetConfig()

  t.deepEqual(boxrecScraper.config, boxrecScraper.defaultConfig)


  // providing new config
  const newConfig = {
    url: 'updated',
    routes: {},
    auth: {},
  }

  boxrecScraper.configure(newConfig)

  // should equal new config and not equal default config
  t.deepEqual(boxrecScraper.config, newConfig)
  t.notDeepEqual(boxrecScraper.config, boxrecScraper.defaultConfig)


  // reset config
  boxrecScraper.resetConfig()

  t.deepEqual(boxrecScraper.config, boxrecScraper.defaultConfig)

  // configuring auth credentials
  const authCredentials = {
    email: 'updated',
    password: 'updated'
  }

  boxrecScraper.configureAuthCredentials(authCredentials)

  t.deepEqual(boxrecScraper.config.auth, authCredentials)


  // reset config
  boxrecScraper.resetConfig()
  t.deepEqual(boxrecScraper.config, boxrecScraper.defaultConfig)
})

test('scrap events ids', async (t) => {
  const { boxrecScraper } = t.context

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

  t.is(event.fights.length, 9)
  t.deepEqual(event.fights[1], {
    boxrecId: '2176798',
    weightClass: 'super lightweight',
    fighters: ['746605', '385951'] 
  })
  
  t.pass()
})

test('scrap fighter', async (t) => {
  const { boxrecScraper } = t.context

  const fighter = await boxrecScraper.scrapers.scrapFighter('474')
  
  t.deepEqual(fighter, {
    id: '474',
    role: 'boxer',
    bouts: '58',
    rounds: '215',
    height: '5′ 10″   /   178cm',
    stance: 'orthodox',
    KOs: '76%',
    status: 'inactive',
    alias: 'Iron',
    born: '1966-06-03',
    nationality: 'USA',
    debut: '1985-03-06',
    division: 'heavyweight',
    residence: 'Henderson, Nevada, USA',
    birthPlace: 'Brooklyn, New York, USA',
    name: 'Mike Tyson',
    image: 'http://static.boxrec.com/thumb/b/b3/Tyson-1a.jpg/200px-Tyson-1a.jpg',
  }) 
})
