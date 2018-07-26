import url from 'url'


const FIGHTER_PREFIX = 'en/boxer'

export const scrapFighter = (boxrecScraper) => async (fighterId) => {  
  const html = await boxrecScraper.requestors.getHTML(
    url.resolve(
      boxrecScraper.config.url,
      `${FIGHTER_PREFIX}/${fighterId}`
    )
  )

  return boxrecScraper.extractors.extractFighter(html)
}
