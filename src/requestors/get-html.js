import requestPromise from 'request-promise'
import pipe from 'promised-pipe'
import R from 'ramda'

import { handleAuthorization } from './afterwares/handle-authorization'


export const getHTML = (boxrecScrapper) => async (uri) => {
  const res = await pipe(
    requestPromise,
    R.assoc('uri', uri),
    handleAuthorization(boxrecScrapper),
  )({
    uri,
    jar: true,
    resolveWithFullResponse: true,
  })
  
  return typeof res === 'string' ? res : res.body
}
