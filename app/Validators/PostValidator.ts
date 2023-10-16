import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string([]),
    description: schema.string([]),
  })

  public messages: CustomMessages = {
    'title.string': 'The title must be a string',
    'title.required': 'The title is required',
    'description.string': 'The description must be a string',
    'description.required': 'The description is required',
  }
}
