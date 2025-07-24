import { treaty } from '@elysiajs/eden'
import type { App } from 'app/src/index.ts'

const client = treaty<App>('http://localhost:3000')

export { client }