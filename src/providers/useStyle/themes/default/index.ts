import { generate } from '../../colorTool'
import genControlHeight from '../shared/genControlHeight'
import genSizeMapToken from '../shared/genSizeMapToken'
import type {
  MapToken,
  SeedToken,
} from '../../interface'
import { defaultPresetColors } from '../seed'
import genColorMapToken from '../shared/genColorMapToken'
import genCommonMapToken from '../shared/genCommonMapToken'
import { generateColorPalettes, generateNeutralColorPalettes } from './colors'
import genFontMapToken from '../shared/genFontMapToken'

export default function derivative(token: SeedToken): MapToken {
  const colorPalettes = Object.keys(defaultPresetColors)
    .map((colorKey) => {
      const colors = generate(token[colorKey as keyof SeedToken] as string)

      return new Array(10).fill(1).reduce((prev, _, i) => {
        prev[`${colorKey}-${i + 1}`] = colors[i]
        prev[`${colorKey}${i + 1}`] = colors[i]
        return prev
      }, {})
    })
    .reduce((prev, cur) => {
      prev = {
        ...prev,
        ...cur,
      }
      return prev
    }, {})

  return {
    ...token,
    ...colorPalettes,
    // Colors
    ...genColorMapToken(token, {
      generateColorPalettes,
      generateNeutralColorPalettes,
    }),
    // Font
    ...genFontMapToken(token.fontSize),
    // Size
    ...genSizeMapToken(token),
    // Height
    ...genControlHeight(token),
    // Others
    ...genCommonMapToken(token),
  }
}
