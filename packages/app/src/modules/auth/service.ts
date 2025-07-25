import { AuthModel } from './model'
import { User } from '../../entity/user'

export abstract class Auth {
	static async signIn({ username, password }: AuthModel.signInBody) {
        console.log('登录', username, password)
		const user = await User.findOne({ username, password })
		if (!user) {
			throw new Error('Invalid username or password')
		}
		return {
			token: user.username,
			refreshToken: 'mock-refresh'
		}
	}
}
