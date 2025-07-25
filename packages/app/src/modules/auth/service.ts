import { AuthModel } from './model'
import { User } from '../../entity/user'
import BetterAuth from '../../libs/betterAuth'

export abstract class Auth {
	static async signUp({ username, email, password }: AuthModel.signUpBody) {
		if (await User.findOne({ email })) {
			throw new Error('Email already exists')
		}
		if (await User.findOne({ username })) {
			throw new Error('Username already exists')
		}
		const response = await BetterAuth.api.signUpEmail({
			body: {
				name: username,
				email,
				password,
			},
			asResponse: true
		})
		console.log(response)
		const user = await User.create({ username, email, password })
		return {
			_id: user._id.toString(),
			email: user.email,
		}
	}
	static async signIn({ email, password }: AuthModel.signInBody) {
        console.log('登录', email, password)
		const response = await BetterAuth.api.signInEmail({
			body: {
				email,
				password,
			},
			asResponse: true
		})
		console.log('登录结果', response)
		const user = await User.findOne({ email, password })
		if (!user) {
			throw new Error('Invalid email or password')
		}
		return {
			token: user.email,
			refreshToken: 'mock-refresh'
		}
	}
}
