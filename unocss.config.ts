import { defineConfig, presetUno } from 'unocss'
import presetVex from './src'

export default defineConfig({
  presets: [presetUno(), presetVex()],
})
