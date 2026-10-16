/** Serve a /public image through Netlify Image CDN at the requested width. */
export function img(path: string, width: number, quality = 75): string {
  return `/.netlify/images?url=${encodeURIComponent(path)}&w=${width}&q=${quality}&fm=webp`
}

export function imgSrcSet(path: string, widths: number[]): string {
  return widths.map((w) => `${img(path, w)} ${w}w`).join(', ')
}
