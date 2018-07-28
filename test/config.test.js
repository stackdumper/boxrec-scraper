import test from 'ava'
import { createBoxrecScraper } from '../'
import { config } from '../config/test'


test.beforeEach((t) => {
  t.context.boxrecScraper = createBoxrecScraper(config)
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
    password: 'updated',
  }

  boxrecScraper.configureAuthCredentials(authCredentials)

  t.deepEqual(boxrecScraper.config.auth, authCredentials)


  // reset config
  boxrecScraper.resetConfig()
  t.deepEqual(boxrecScraper.config, boxrecScraper.defaultConfig)
})
