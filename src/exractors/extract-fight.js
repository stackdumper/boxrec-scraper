import R from 'ramda'


const FIGHT_TITLES_SELECTOR = '.titleLink'

export const extractFight = () => (el) => ({
  id: el.id,
  division: el.querySelector('td:nth-child(2)')?.textContent?.trim(),
  fighters: R.map(
    a => a.href |> R.split('/') |> R.last,
    el.querySelectorAll('.personLink'),
  ),
  titles: R.ifElse(
    R.has('secondRow'),
    R.pipe(
      el => el.secondRow.querySelectorAll(FIGHT_TITLES_SELECTOR),
      R.map(
        R.pipe(
          R.prop('textContent'),
          R.trim,
        )
      )
    ),
    R.always([]),
  )(el)
})
