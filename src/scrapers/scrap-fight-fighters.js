import bluebird from 'bluebird'


export const scrapFightFighters = (boxrecScraper) => async (fight) => ({
  ...fight,
  fighters: await bluebird.Promise.map(fight.fighters, boxrecScraper.scrapers.scrapFighter)
})
