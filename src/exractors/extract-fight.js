import R from 'ramda'


export const extractFight = () => (el) => {
  console.log(el);
  
  return {
    boxrecId: el.id,
    division: el.querySelector('td:nth-child(2)')?.textContent?.trim(),
    fighters: R.map(
      a => a.href |> R.split('/') |> R.last,
      el.querySelectorAll('.personLink'),
    ),
    titles: [],
  }
}
