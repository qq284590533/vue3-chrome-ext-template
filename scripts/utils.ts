import { resolve } from 'path'

export const IS_DEV = process.env.NODE_ENV !== 'production'
export const r = (...arg: string[]) => resolve(__dirname, '..', ...arg)
