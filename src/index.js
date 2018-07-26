// import scrapers
import { scrapEventsIds } from './scrapers/scrap-events-ids'
import { scrapEvent } from './scrapers/scrap-event'
import { scrapEventFightsFighters } from './scrapers/scrap-event-fights-fighters'
import { scrapFightFighters } from './scrapers/scrap-fight-fighters'
import { scrapFighter } from './scrapers/scrap-fighter'

// import extractors
import { extractEvent } from './exractors/extract-event'
import { extractFight } from './exractors/extract-fight'
import { extractFighter } from './exractors/extract-fighter'

// import requestors
import { getHTML } from './requestors/get-html'

// export generator
export const createBoxrecScraper = (config = {}) => {
  const defaultConfig = {
    url: 'http://boxrec.com',
    routes: {
      events: '/en/schedule',
      auth: '/en/login',
    },
    auth: {
      email: null,
      password: null,
    }
  }

  const boxrecScraper = {
    defaultConfig,
    config: Object.assign({}, defaultConfig, config),
    scrapers: {},
    extractors: {},
    requestors: {},
  }

  boxrecScraper.configure = (config) => Object.assign(
    boxrecScraper.config,
    config,
  )

  boxrecScraper.configureAuthCredentials = ({ email, password }) => Object.assign(
    boxrecScraper.config,
    {
      auth: {
        email,
        password,
      }
    }
  )

  boxrecScraper.resetConfig = () => boxrecScraper.configure(boxrecScraper.defaultConfig)

  boxrecScraper.scrapers = {
    scrapEventsIds: scrapEventsIds(boxrecScraper),
    scrapEvent: scrapEvent(boxrecScraper),
    scrapEventFightsFighters: scrapEventFightsFighters(boxrecScraper),
    scrapFightFighters: scrapFightFighters(boxrecScraper),
    scrapFighter: scrapFighter(boxrecScraper),
  }

  boxrecScraper.extractors = {
    extractEvent: extractEvent(boxrecScraper),
    extractFight: extractFight(boxrecScraper),
    extractFighter: extractFighter(boxrecScraper),
  }

  boxrecScraper.requestors = {
    getHTML: getHTML(boxrecScraper),
  }

  return boxrecScraper
}

// export singleton
export const boxrecScraper = createBoxrecScraper()
