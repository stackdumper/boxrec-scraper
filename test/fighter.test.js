import test from 'ava'
import { createBoxrecScraper } from '../'
import { config } from '../config/test'


test.beforeEach((t) => {
  t.context.boxrecScraper = createBoxrecScraper(config)
})

test('scrap fighter', async (t) => {
  const { boxrecScraper } = t.context

  const fighter = await boxrecScraper.scrapers.scrapFighter('474')

  console.log(fighter);
  

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
    image: 'http://static.boxrec.com/thumb/a/ad/MikeTyson-1a.jpg/200px-MikeTyson-1a.jpg',
    won: '50',
    lost: '6',
    draw: '0',
  })
})
