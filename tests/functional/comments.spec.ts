import { test } from '@japa/runner'
import User from 'App/Models/User'

import user_payload from '../mocks/user_payload'

let user: User | null = null
let token: string | null = null

test.group('Comentario em publicações', () => {
  test(`😎 Garantir que um cliente consiga criar uma publicação.`, async ({ client, assert }) => {})

  test(`😎 Garantir que um cliente consiga editar sua propria publicação.`, async ({
    client,
    assert,
  }) => {})

  test(`😒 Garantir que um cliente não consiga editar uma publicação de outro usuario.`, async ({
    client,
    assert,
  }) => {})

  test(`😎 Garantir que um cliente consiga ver as publicações.`, async ({ client, assert }) => {})

  test(`😎 Garantir que um cliente consiga remover as suas proprias publicações.`, async ({
    client,
    assert,
  }) => {})

  test(`😒 Garantir que um cliente não consiga remover uma publicação de outro usuario.`, async ({
    client,
    assert,
  }) => {})
})
