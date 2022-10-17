export default function boundingClientRect(el: HTMLElement): Promise<DOMRect> {
  return new Promise(resolve => {
    const io = new IntersectionObserver(([entry]) => {
      resolve(entry.boundingClientRect)
      io.disconnect()
    })
    io.observe(el)
  })
}
