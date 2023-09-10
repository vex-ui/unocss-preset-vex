import type { Preset } from 'unocss'

/**
 * @public
 */
export interface PrimitivesOptions {
  /**
   * @default 'ui'
   */
  prefix?: string
}

export default function (options: PrimitivesOptions = {}): Preset {
  const { prefix = 'ui' } = options
  const variants = 'open|checked|selected|active|disabled'
  const selector = 'data-vex-state'

  return {
    name: 'unocss-preset-vex',
    variants: [
      (matcher: string) => {
        const regex = new RegExp(`^${prefix}(-not)?-(${variants}):`)
        const match = matcher.match(regex)
        if (match) {
          const attr = `[${selector}~='${match[2]}']`

          return {
            matcher: matcher.slice(match[0].length),
            selector: (s: any) =>
              match[1] === '-not'
                ? `${s}[${selector}]:not(${attr}),:where([${selector}]:not(${attr})) ${s}:not(${selector})`
                : `${s}${attr},:where(${attr}) ${s}`,
          }
        } else {
          return matcher
        }
      },
    ],
  }
}
