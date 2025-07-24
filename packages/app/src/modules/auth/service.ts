// Service handle business logic, decoupled from Elysia controller
import type { AuthModel } from './model'

// If the class doesn't need to store a property,
// you may use `abstract class` to avoid class allocation
export abstract class Auth {
	static async signIn({ username, password }: AuthModel.signInBody) {
        console.log(username, password)
		return {
			token: 'mock',
			refreshToken: 'mock-refresh'
		}
	}
}
