import { treaty } from '@elysiajs/eden'
import type { App } from 'app/src/index.ts'

const client = treaty<App>('http://localhost:3003', { fetch: { credentials: 'include' } })

const ret = await client.demo.get({ query: { name: '1'} })
console.log(ret)
