/**
 * 替换vue文件中的内容
 */
import { Plugin } from 'vite'
import { createFilter, FilterPattern } from '@rollup/pluginutils'

interface IPluginOptions {
  match: string | RegExp
  replacement: string
  global?: boolean
  include?: FilterPattern
  exclude?: FilterPattern
}

export default function srcReplace(options: IPluginOptions): Plugin {
  const { global, match, replacement, include, exclude } = options
  let regExp = match
  if (global && typeof match === 'string') {
    regExp = new RegExp(match, 'g')
  }

  const filter = createFilter(include, exclude)

  function replaceContent(code) {
    return code.replace(regExp, replacement)
  }

  return {
    name: 'vite-plugin-content-replace',
    enforce: 'pre',
    transform(code, id) {
      if (!filter(id)) return
      return replaceContent(code)
    }
  }
}
