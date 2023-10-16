// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comment from 'App/Models/Comment'
import CreateCommentValidator from 'App/Validators/CreateCommentValidator copy'
import UpdateCommentValidator from 'App/Validators/UpdateCommentValidator'

export default class CommentsController {
  public async store({ request, auth, response, params }) {
    const payload = await request.validate(CreateCommentValidator)
    const comment = await Comment.create({
      description: payload.description,
      user_id: auth.user.id,
      post_id: params.id,
    })
    return response.status(201).json(comment)
  }

  public async index({ params, response }) {
    const comments = await Comment.query().where('post_id', params.id).andWhereNull('deleted_by')
    return response.status(200).json(comments)
  }

  public async show({ response, params }) {
    const comment = await Comment.query().where('id', params.id).first()
    return response.status(200).json(comment)
  }

  public async update({ params, request, auth, response }) {
    const payload = await request.validate(UpdateCommentValidator)
    const comment = await Comment.query().where('id', params.id).firstOrFail()
    if (comment.user_id !== auth.user.id) {
      return response
        .status(403)
        .json({ error: 'Você não tem permissão para editar este comentário' })
    }
    comment.merge(payload)
    await comment.save()
    return response.status(200).json(comment)
  }

  public async destroy({ params, auth, response }) {
    const comment = await Comment.query().where('id', params.id).preload('post').firstOrFail()
    if (comment.post.user_id == auth.user.id || comment.user_id == auth.user.id) {
      comment.deletedBy = comment.user_id == auth.user.id ? auth.user.id : comment.post.user_id
      await comment.save()
      return response.status(204)
    } else {
      return response
        .status(403)
        .json({ message: 'Você não tem permissão para deletar este comentário' })
    }
  }
}
