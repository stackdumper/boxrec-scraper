import url from 'url'


const EVENT_PREFIX = 'en/event'

export const scrapEvent = (boxrecScraper) => async (eventId) => {
  const html = await boxrecScraper.requestors.getHTML(
    url.resolve(
      boxrecScraper.config.url,
      `/${EVENT_PREFIX}/${eventId}`,
    )
  )

  return boxrecScraper.extractors.extractEvent(html)
}
