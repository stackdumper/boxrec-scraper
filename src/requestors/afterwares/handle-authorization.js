import url from 'url'
import requestPromise from 'request-promise'


export const handleAuthorization = (boxrecScrapper) => async (res) => {
  const { pathname } = res.request.uri
  const { email, password } = boxrecScrapper.config.auth

  if (!email || !password) {
    throw new Error('Missing BoxRec auth credentials!')
  }

  if (pathname === '/en/login') {
    try {
      await requestPromise.post({
        uri: url.resolve(boxrecScrapper.config.url, boxrecScrapper.config.routes.auth),
        resolveWithFullResponse: true,
        jar: true,
        formData: {
          _username: email,
          _password: password,
        },
      })
    }
    catch (error) {
      // 302 - redirect (it is OK)
    }

    return boxrecScrapper.requestors.getHTML(res.uri, false)
  }

  return res
}
