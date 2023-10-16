import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string([]),
    params: schema.object().members({
      id: schema.string({ escape: true, trim: true }, [
        rules.uuid({ version: 4 }),
        rules.exists({
          table: 'posts',
          column: 'id',
        }),
      ]),
    }),
  })

  public messages: CustomMessages = {
    'description.string': 'The description must be a string',
    'description.required': 'The description is required',
  }
}
