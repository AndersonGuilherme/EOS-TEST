import { test } from '@japa/runner'
import User from 'App/Models/User'
import Post from 'App/Models/Post'

import user_payload from '../mocks/user_payload'
import Comment from 'App/Models/Comment'

test.group('Comentario em publicações', () => {
  test(`😎 Garantir que um cliente comentar uma publicação.`, async ({ client }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const post = await Post.firstOrCreate(
      { user_id: user.id },
      { title: 'Titulo do Post', description: 'Descrição do Post' }
    )
    const user2 = await User.firstOrCreate(
      { email: 'segundo@provedor.com' },
      { email: 'segundo@provedor.com', password: 'password' }
    )
    const data = await client
      .post(`/api/posts/${post.id}/comments`)
      .json({ description: 'Comentario legal' })
      .loginAs(user2)
    data.assertStatus(201)
  })

  test(`😎 Garantir que um cliente consiga listar comentarios de uma publicação`, async ({
    client,
  }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const post = await Post.firstOrCreate(
      { user_id: user.id },
      { title: 'Titulo do Post', description: 'Descrição do Post' }
    )
    await Comment.create({ user_id: user.id, post_id: post.id, description: 'Um comentario legal' })
    const data = await client.get(`/api/posts/${post.id}/comments`).loginAs(user)
    data.assertStatus(200)
  })

  test(`😎 Garantir que um cliente consiga ver uma publicações.`, async ({ client }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const post = await Post.firstOrCreate(
      { user_id: user.id },
      { title: 'Titulo do Post', description: 'Descrição do Post' }
    )
    const comment = await Comment.create({
      user_id: user.id,
      post_id: post.id,
      description: 'Um comentario legal',
    })

    const data = await client.get(`/api/comments/${comment.id}`).loginAs(user)
    data.assertStatus(200)
  })

  test(`😎 Garantir que um cliente  consiga editar uma publicação.`, async ({ client }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const post = await Post.firstOrCreate(
      { user_id: user.id },
      { title: 'Titulo do Post', description: 'Descrição do Post' }
    )
    const comment = await Comment.create({
      user_id: user.id,
      post_id: post.id,
      description: 'Um comentario legal',
    })
    const data = await client
      .put(`/api/comments/${comment.id}`)
      .json({ title: 'Titulo do Post editado', description: 'Descrição do Post editada' })
      .loginAs(user)
    data.assertStatus(200)
  })

  test(`😡 Garantir que um cliente não consiga editar uma publicação de outro usuario.`, async ({
    client,
  }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const post = await Post.firstOrCreate(
      { user_id: user.id },
      { title: 'Titulo do Post', description: 'Descrição do Post' }
    )
    const comment = await Comment.create({
      user_id: user.id,
      post_id: post.id,
      description: 'Um comentario legal',
    })

    const user2 = await User.firstOrCreate(
      { email: 'segundo@provedor.com' },
      { email: 'segundo@provedor.com', password: 'password' }
    )
    const data = await client
      .put(`/api/comments/${comment.id}`)
      .json({ title: 'Titulo do Post editado', description: 'Descrição do Post editada' })
      .loginAs(user2)
    data.assertStatus(403)
  })

  test(`😎 Garantir que um cliente consiga remover as suas proprias publicações.`, async ({
    client,
  }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const post = await Post.firstOrCreate(
      { user_id: user.id },
      { title: 'Titulo do Post', description: 'Descrição do Post' }
    )
    const comment = await Comment.create({
      user_id: user.id,
      post_id: post.id,
      description: 'Um comentario legal',
    })
    const data = await client.delete(`/api/comments/${comment.id}`).loginAs(user)
    data.assertStatus(204)
  })

  test(`😡 Garantir que um cliente não consiga remover uma publicação de outro usuario.`, async ({
    client,
  }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const post = await Post.firstOrCreate(
      { user_id: user.id },
      { title: 'Titulo do Post', description: 'Descrição do Post' }
    )
    const comment = await Comment.create({
      user_id: user.id,
      post_id: post.id,
      description: 'Um comentario legal',
    })

    const user2 = await User.firstOrCreate(
      { email: 'segundo@provedor.com' },
      { email: 'segundo@provedor.com', password: 'password' }
    )
    const data = await client.delete(`/api/comments/${comment.id}`).loginAs(user2)
    data.assertStatus(403)
  })
})
