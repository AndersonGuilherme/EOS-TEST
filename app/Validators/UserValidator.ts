import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string([]),
  })

  public messages: CustomMessages = {
    'email.unique': 'The email is already taken',
    'email.required': 'The email is required',
    'email.email': 'The email is not valid',
    'password.string': 'The password must be a string',
    'password.required': 'The password is required',
  }
}
