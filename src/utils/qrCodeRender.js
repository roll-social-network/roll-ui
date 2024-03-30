import QRCode from 'qrcode'

export default () => {
  const els = document.querySelectorAll('[data-qr-code]')
  els.forEach(async (el) => {
    const uri = el.dataset.qrCode
    const qrCodeImgSrc = await QRCode.toDataURL(uri)
    const imgEl = document.createElement('img')
    imgEl.src = qrCodeImgSrc
    el.appendChild(imgEl)
  })
}
