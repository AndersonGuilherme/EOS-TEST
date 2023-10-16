import { test } from '@japa/runner'
import User from 'App/Models/User'

import user_payload from '../mocks/user_payload'

test.group('Registro e Autenticação', () => {
  test(`😎 Garantir que um cliente consiga se cadastrar.`, async ({ client, assert }) => {
    const data = await client.post('/api/users').json({ ...user_payload })
    assert.exists(data.response.body.id)
    assert.exists(data.response.body.email)
    data.assertStatus(201)
  })

  test(`😎 Garantir que um cliente consiga se autenticar.`, async ({ client, assert }) => {
    const data = await client.post('/api/auth').json({ ...user_payload })
    assert.exists(data.response.body.token)
    data.assertStatus(200)
  })

  test(`😎 Garantir que um cliente consiga ver seus dados.`, async ({ client, assert }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const data = await client.get(`/api/users`).loginAs(user)
    assert.exists(data.response.body.id)
    assert.exists(data.response.body.email)
    data.assertStatus(200)
  })

  test(`😎 Garantir que um cliente consiga atualizar seus dados.`, async ({ client }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const data = await client
      .put(`/api/users`)
      .json({ email: 'alterado@provedor.com', password: '12345678' })
      .loginAs(user)
    data.assertStatus(200)
  })

  test(`😎 Garantir que um cliente consiga excluir sua conta.`, async ({ client }) => {
    const user = await User.firstOrCreate({ email: user_payload.email }, { ...user_payload })
    const data = await client
      .delete(`/api/users`)
      .json({ ...user_payload })
      .loginAs(user)
    data.assertStatus(204)
  })
})
