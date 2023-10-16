import { test } from '@japa/runner'
import User from 'App/Models/User'

import user_payload from '../mocks/user_payload'
import Post from 'App/Models/Post'

test.group('Publicação de Conteúdo', () => {
  test(`😎 Garantir que um cliente consiga criar uma publicação.`, async ({ client }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const data = await client
      .post(`/api/posts`)
      .json({ title: 'Titulo do Post', description: 'Descrição do Post' })
      .loginAs(user)
    data.assertStatus(201)
  })

  test(`😎 Garantir que um cliente consiga editar sua propria publicação.`, async ({ client }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const post = await Post.firstOrCreate(
      { user_id: user.id },
      { title: 'Titulo do Post', description: 'Descrição do Post' }
    )
    const data = await client
      .put(`/api/posts/${post.id}`)
      .json({ title: 'Titulo do Post 2', description: 'Descrição do Post 2' })
      .loginAs(user)
    data.assertStatus(200)
  })

  test(`😡 Garantir que um cliente não consiga editar uma publicação de outro usuario.`, async ({
    client,
  }) => {
    const user1 = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const user2 = await User.firstOrCreate(
      { email: 'segundo@provedor.com' },
      { email: 'segundo@provedor.com', password: 'password' }
    )
    const post = await Post.firstOrCreate(
      { user_id: user1.id },
      { title: 'Titulo do Post', description: 'Descrição do Post' }
    )
    const data = await client
      .put(`/api/posts/${post.id}`)
      .json({ title: 'Titulo do Post 2', description: 'Descrição do Post 2' })
      .loginAs(user2)
    data.assertStatus(403)
  })

  test(`😎 Garantir que um cliente consiga ver as publicações.`, async ({ client }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const data = await client.get(`/api/users/${user.id}/posts`).loginAs(user)
    data.assertStatus(200)
  })

  test(`😎 Garantir que um cliente consiga remover as suas proprias publicações.`, async ({
    client,
  }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const post = await Post.firstOrCreate(
      { user_id: user.id },
      { title: 'Titulo do Post', description: 'Descrição do Post' }
    )
    const data = await client.delete(`/api/posts/${post.id}`).loginAs(user)
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

    const user2 = await User.firstOrCreate(
      { email: 'segundo@provedor.com' },
      { email: 'segundo@provedor.com', password: 'password' }
    )

    const data = await client.delete(`/api/posts/${post.id}`).loginAs(user2)
    data.assertStatus(403)
  })

  test(`😎 Garantir que um cliente consiga curtir uma publicações.`, async ({ client }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const user2 = await User.firstOrCreate(
      { email: 'segundo@provedor.com' },
      { email: 'segundo@provedor.com', password: 'password' }
    )
    const post = await Post.firstOrCreate(
      { user_id: user.id },
      { title: 'Titulo do Post', description: 'Descrição do Post' }
    )
    const data = await client.patch(`/api/posts/${post.id}/like`).loginAs(user2)
    data.assertStatus(200)
  })

  test(`😎 Garantir que um cliente consiga ver os relatorios da publicação.`, async ({
    client,
  }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const post = await Post.firstOrCreate(
      { user_id: user.id },
      { title: 'Titulo do Post', description: 'Descrição do Post' }
    )
    const data = await client.get(`/api/posts/${post.id}/report`).loginAs(user)
    data.assertStatus(200)
  })
})
