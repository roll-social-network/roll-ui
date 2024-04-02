export default () => {
  const els = document.querySelectorAll('[data-copy2clipboard]')
  els.forEach((el) => {
    el.addEventListener('click', () => {
      el.select()
      el.setSelectionRange(0, el.value.length)
      if (navigator.clipboard) {
        navigator.clipboard.writeText(el.value)
      }
    })
  })
}
