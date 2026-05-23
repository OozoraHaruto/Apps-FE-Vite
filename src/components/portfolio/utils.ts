const API_BASE = 'https://app-api-pr9v.onrender.com/portfolio'
const IMG_BASE = 'https://res.cloudinary.com/duxmjjxns/image/upload/t_portfolio_icon/'
const GH_BASE = "https://github.com/OozoraHaruto"

export function imgUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return IMG_BASE ? `${IMG_BASE}/${path}` : ''
}

export function linkUrl(url: string): string {
  if (!url) return '#'
  if (url.startsWith('http')) return url
  return `${GH_BASE}/${url}`
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

export async function fetchSection<T>(section: string): Promise<T[]> {
  const res = await fetch(`${API_BASE}/${section}`)
  const json = await res.json() as { success: boolean; data: T[] }
  return json.data
}

const codeLogo: { [ id: string ]: string } = {
  "CSS": "css3",
  "Go": "golang",
  "HTML": "html5",
  "Java": "java",
  "Javascript": "js",
  "Node.js": "node-js",
  "PHP": "php",
  "Python": "python",
  "React.js": "react",
  "Swift": "swift",
  "SwiftUI": "swift",
}

export const getCodeLogo = (lang: string) => {
  return codeLogo[ lang ] || null
}
