/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/api/auth', 'AuthController.login')

Route.post('/api/users', 'UsersController.store')
Route.get('/api/users', 'UsersController.show').middleware('auth')
Route.put('/api/users', 'UsersController.update').middleware('auth')
Route.delete('/api/users', 'UsersController.destroy').middleware('auth')

Route.get('/api/users/:id/posts', 'PostsController.index')
Route.get('/api/posts/:id', 'PostsController.show')
Route.get('/api/posts/:id/report', 'PostReportsController.show').middleware('auth')
Route.post('/api/posts', 'PostsController.store').middleware('auth')
Route.put('/api/posts/:id', 'PostsController.update').middleware('auth')
Route.delete('/api/posts/:id', 'PostsController.destroy').middleware('auth')

Route.patch('/api/posts/:id/like', 'PostsLikesController.update').middleware('auth')

Route.post('/api/posts/:id/comments', 'CommentsController.store').middleware('auth')
Route.get('/api/posts/:id/comments', 'CommentsController.index').middleware('auth')
Route.get('/api/comments/:id', 'CommentsController.show').middleware('auth')
Route.put('/api/comments/:id', 'CommentsController.update').middleware('auth')
Route.delete('/api/comments/:id', 'CommentsController.destroy').middleware('auth')
