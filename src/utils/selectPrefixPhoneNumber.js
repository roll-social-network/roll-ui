const mask = (selectEl) => {
  const value = selectEl.value
  const optionEl = selectEl.querySelector(`option[value="${value}"]`)
  optionEl.dataset.originalText = optionEl.text
  optionEl.text = optionEl.text.split(' ').at(-1)
}

const clear = (selectEl) => {
  selectEl.querySelectorAll('option[data-original-text]').forEach((optionEl) => {
    optionEl.text = optionEl.dataset.originalText
    delete optionEl.dataset.originalText
  })
}

export default () => {
  const els = document.querySelectorAll('select[data-prefix-phone-number]')
  els.forEach(async (selectEl) => {
    selectEl.addEventListener('change', () => {
      clear(selectEl)
      mask(selectEl)
    })
  })
}
