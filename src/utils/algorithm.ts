import { BasicResult, DDAResult } from "../types"

interface AlgorithmProps {
  x1: number
  y1: number
  x2: number
  y2: number
}

export const basicAlgorithm = ({ x1, y1, x2, y2 }: AlgorithmProps): BasicResult[] => {
  if (x1 === x2) throw new Error("Cannot calculate: x1 = x2")
  if (y1 === y2) throw new Error("Cannot calculate: y1 = y2")
  if (x2 - x1 === 0) throw new Error("Cannot calculate: x2 - x1 = 0")

  let dx = 1
  const m = (y2 - y1) / (x2 - x1)
  const result: BasicResult[] = []

  result.push({
    x: x1,
    dx: null,
    xc: x1,
    b: y1,
    m: null,
    y: y1,
  })

  let x = x1
  if (x > x2) {
    dx = -dx
  }
  let xc = x + dx
  let y = y1
  let b = y


  if (x < x2) {
    while (x < x2) {
      y = m * dx + b

      result.push({
        x: x,
        dx: dx,
        b: b,
        xc: xc,
        m: m,
        y: y
      })

      xc += dx
      x += dx
      b = y
    }
    return result
  }

  while (x > x2) {
    y = m * dx + b

    result.push({
      x: x,
      dx: dx,
      b: b,
      xc: xc,
      m: m,
      y: y
    })

    xc += dx
    x += dx
    b = y
  }
  return result
}

export const DDAAlgorithm = ({ x1, y1, x2, y2 }: AlgorithmProps) => {
  const result: DDAResult[] = []
  result.push({
    k: null,
    x: null,
    y: null,
    roundX: x1,
    roundY: y1
  })

  const dx = x2 - x1
  const dy = y2 - y1

  let step = 0

  if (dy === 0) throw new Error('Cannot Calculate: dy = 0')

  if (dy > dx) {
    step = dy
  } else {
    step = dx
  }

  let xIncrement = dx / step
  let yIncrement = dy / step

  let i = 0
  let x = x1
  let y = y1
  let roundX = Math.round(x)
  let roundY = Math.round(y)

  if (x < x2) {
    while (x <= x2) {
      result.push({
        k: i,
        x: x,
        y: y,
        roundX: roundX,
        roundY: roundY
      })

      x += xIncrement
      y += yIncrement
      roundX = Math.round(x)
      roundY = Math.round(y)
      i++
    }
    return result
  }

  while (x >= x2) {
    result.push({
      k: i,
      x: x,
      y: y,
      roundX: roundX,
      roundY: roundY
    })

    if (xIncrement < 0) {
      x += xIncrement
    } else {
      x -= xIncrement
    }

    if (y < y2) {
      y += yIncrement
    } else {
      y -= yIncrement
    }

    roundX = Math.round(x)
    roundY = Math.round(y)
    i++
  }

  return result
}