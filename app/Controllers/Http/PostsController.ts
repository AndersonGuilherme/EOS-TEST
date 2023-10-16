import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'
import PostLike from 'App/Models/PostLike'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(PostValidator)
    const post = await Post.create({ ...payload, user_id: auth.user?.id })
    response.status(201).json(post)
  }

  public async show({ response, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    response.status(200).json(post)
  }

  public async index({ response, params }: HttpContextContract) {
    const posts = await Post.query().where({ user_id: params.id })
    return response.json(posts)
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    const payload = await request.validate(PostValidator)
    const post = await Post.query()
      .where('id', params.id)
      .andWhere({ user_id: auth.user?.id })
      .first()
    if (!post) {
      return response
        .status(403)
        .json({ message: 'Você não possui permissão para alterar esta publicação.' })
    }
    post.merge(payload)
    await post.save()
    return response.json(post)
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    const post = await Post.query()
      .where('id', params.id)
      .andWhere({ user_id: auth.user?.id })
      .first()
    if (!post) {
      return response
        .status(403)
        .json({ message: 'Você não possui permissão para excluir esta publicação.' })
    }
    await post.delete()
    return response.status(204)
  }
}
