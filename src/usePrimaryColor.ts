import { useCallback, useEffect, useRef, useState } from 'react'

interface PrimaryColorOptions {
  skip: number
  callback?: (primaryColor: string, topColors: string[]) => void
}

interface ColorCounter {
  [key: string]: number
}

interface PrimaryColorObject {
  rgb: string
  count: number
}

export interface UsePrimaryColorReturnType {
  primaryColor: string | undefined
  ref: React.RefObject<HTMLImageElement>
}

const defaultOptions: PrimaryColorOptions = {
  skip: 5,
}

export const isApproximateColor = (
  color1: string,
  color2: string,
  threshold = 35,
): boolean => {
  if (!color1 || !color2) {
    return false
  }
  const [r1, g1, b1] = color1.split(',').map(Number)
  const [r2, g2, b2] = color2.split(',').map(Number)
  const r = r1 - r2
  const g = g1 - g2
  const b = b1 - b2
  const l = Math.sqrt(r * r + g * g + b * b)
  return l < threshold
}

export const getImageData = (img: HTMLImageElement): ImageData => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  canvas.width = img.width
  canvas.height = img.height
  context.drawImage(img, 0, 0)
  return context.getImageData(0, 0, img.width, img.height)
}

export const detectColor = (
  { data }: ImageData,
  skip = 0,
): [PrimaryColorObject, ColorCounter] => {
  const primary: PrimaryColorObject = { rgb: '', count: 0 }
  const colors: ColorCounter = {}

  for (let px = 0, len = data.length; px < len; px += (skip + 1) * 4) {
    // eslint-disable-next-line no-continue
    if (data[px + 3] < 255) continue
    const tmpRgb = `${data[px]},${data[px + 1]},${data[px + 2]}`
    const rgb =
      primary.rgb && isApproximateColor(primary.rgb, tmpRgb)
        ? primary.rgb
        : tmpRgb
    colors[rgb] = (colors[rgb] || 0) + 1
    if (colors[rgb] > primary.count) {
      primary.rgb = rgb
      primary.count = colors[rgb]
    }
  }

  return [primary, colors]
}

export const sortColors = (colors: ColorCounter): string[] =>
  Object.keys(colors).sort((a, b) => colors[b] - colors[a])

const usePrimaryColor = (
  options = defaultOptions,
): UsePrimaryColorReturnType => {
  const ref = useRef<HTMLImageElement>(null)
  const [primaryColor, setPrimaryColor] = useState<string>()
  const onLoadImage = useCallback(
    (e: Event) => {
      const imageData = getImageData(e.currentTarget as HTMLImageElement)
      const [{ rgb }] = detectColor(imageData, options.skip)
      setPrimaryColor(rgb)
    },
    [options],
  )

  useEffect(() => {
    if (!primaryColor && ref.current) {
      const image = new Image()
      image.crossOrigin = 'Anonymous'
      image.onload = onLoadImage
      image.src = ref.current.src
    }
  }, [primaryColor, onLoadImage])

  return { primaryColor, ref }
}

export default usePrimaryColor
