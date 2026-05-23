export function getStr(key: string, defaultValue: string): string {
  return localStorage.getItem(key) ?? defaultValue
}

export function getBool(key: string, defaultValue: boolean): boolean {
  const val = localStorage.getItem(key)
  return val === null ? defaultValue : val === 'true'
}

export function setStr(key: string, value: string): void {
  localStorage.setItem(key, value)
}

export function setNonStr(key: string, value: unknown): void {
  localStorage.setItem(key, String(value))
}
