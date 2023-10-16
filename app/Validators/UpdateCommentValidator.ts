import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string([]),
  })

  public messages: CustomMessages = {
    'description.string': 'The description must be a string',
    'description.required': 'The description is required',
  }
}
