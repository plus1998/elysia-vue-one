import { betterAuth } from 'better-auth'

const BetterAuth = betterAuth({
  basePath: '/api',
  emailAndPassword: {
    enabled: true
  }
})

export default BetterAuth