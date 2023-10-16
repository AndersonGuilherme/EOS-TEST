import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PostReport from 'App/Models/PostReport'

export default class PostReportsController {
  public async show({ response, params, auth }: HttpContextContract) {
    const post = await PostReport.query()
      .where('id', params.id)
      .andWhere({ user_id: auth.user?.id })
      .first()
    if (!post) {
      return response
        .status(403)
        .json({ message: 'Você não possui permissão para ver o relatorio desta publicação.' })
    }
    response.status(200).json(post)
  }
}
