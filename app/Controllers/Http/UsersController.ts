import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(UserValidator)
    const user = await User.create(payload)
    response.status(201).json(user)
  }

  public async show({ response, auth }: HttpContextContract) {
    const user = await User.findOrFail(auth.user?.id)
    response.status(200).json(user)
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(UserValidator)
    const user = await User.findOrFail(auth.user?.id)
    user.merge(payload)
    await user.save()
    response.status(200).json(user)
  }

  public async destroy({  response, auth }: HttpContextContract) {
    const user = await User.findOrFail(auth.user?.id)
    await user.delete()
    response.status(204)
  }
}
