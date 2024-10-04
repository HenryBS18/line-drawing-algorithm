export interface FormData {
  x1: number
  y1: number
  x2: number
  y2: number
  algorithm: "basic" | "dda"
}

export interface BasicResult {
  x: number
  dx: number | null
  xc: number
  b: number
  m: number | null
  y: number
}

export interface ErrorState {
  isError: boolean
  message: string
}

export interface DDAResult {
  k: number | null
  x: number | null
  y: number | null
  roundX: number
  roundY: number
}

export interface Coordinate {
  x: number
  y: number
}