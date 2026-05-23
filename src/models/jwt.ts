export interface JwtPayload {
  id: string
  auth: string
  allowed: string[]
  exp: number
}
