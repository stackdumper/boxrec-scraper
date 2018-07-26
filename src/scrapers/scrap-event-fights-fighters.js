import bluebird from 'bluebird'


export const scrapEventFightsFighters = (boxrecScraper) => async (event) => ({
  ...event,
  fights: await bluebird.Promise.map(event.fights, boxrecScraper.scrapers.scrapFightFighters)
})
