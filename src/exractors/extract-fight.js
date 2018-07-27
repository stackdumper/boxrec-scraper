import R from 'ramda'


export const extractFight = () => (el) => ({
  boxrecId: el.id,
  weightClass: el.querySelector('td:nth-child(2)')?.textContent?.trim(),
  fighters: R.map(
    a => a.href |> R.split('/') |> R.last,
    el.querySelectorAll('.personLink')
  ),
})
