// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ request, auth }) {
    const { email, password } = request.all()
    const user = await auth.attempt(email, password)
    return user
  }
}
