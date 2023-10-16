import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PostLike from 'App/Models/PostLike'

export default class PostsLikesController {
  public async update({ response, params, auth }: HttpContextContract) {
    const post = await PostLike.query().where('id', params.id).firstOrFail()
    const userLikes = post.user_likes ?? []
    // @ts-ignore
    const indexToRemove = userLikes.findIndex((obj) => obj.user_id === auth.user.id)

    if (indexToRemove >= 0) {
      // @ts-ignore
      userLikes.splice(indexToRemove, 1)
    } else {
      // @ts-ignore
      userLikes.push({ user_id: auth.user.id })
    }

    // @ts-ignore
    post.user_likes = JSON.stringify(userLikes)

    await post.save()

    return response.status(200).json(post)
  }
}
