'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// Rota de cadastro de usuário
Route.post('/users', 'UserController.store')

// Edição de usuário
Route.put('/users/:id', 'UserController.update')

// Rotas autenticadas para admin
Route.group(() => {
  Route.resource('users', 'UserController')
    .apiOnly()
    .except(['store', 'update']),
  Route.resource('schools', 'SchoolController')
    .apiOnly()
}).middleware(['auth', 'is:(admin)'])

Route.post('/sessions', 'SessionController.create')
