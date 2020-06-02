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
  return { 
    title: 'Sistema de gerenciamento de patrimonios escolares [API Rest]',
    description: 'API Rest desenvolvida para o projeto final da disciplina de Projeto de Software 1' 
  }
})

Route.post('/sessions', 'SessionController.create')

// Rota de cadastro de usuário
Route.post('/users', 'UserController.store')

// Rotas autenticadas para o usuário e/ou admin
Route.group(() => {
  // Edição de usuário
  Route.put('/users/:id', 'UserController.update')

  // Rota cadastro de ticket
  Route.post('/tickets/:userId', 'TicketController.store')
  Route.get('/tickets/:userId', 'TicketController.index')
  Route.get('/tickets/:userId/:id', 'TicketController.show')
  Route.put('/tickets/:userId/:id', 'TicketController.update')

  Route.post('/ticket/:userId/:id/photos', 'PhotoController.store')
  Route.get('/ticket/:userId/:id/photos', 'PhotoController.show')

  Route.post('/user_schools', 'UserSchoolController.store')
}).middleware(['auth'])

// Rotas autenticadas apenas para admin
Route.group(() => {
  Route.resource('users', 'UserController')
    .apiOnly()
    .except(['store']),
  Route.resource('schools', 'SchoolController')
    .apiOnly()
  Route.resource('classrooms', 'ClassroomController')
    .apiOnly()
  Route.resource('addresses', 'AddressController')
    .apiOnly()
    .only(['store', 'update', 'destroy'])
}).middleware(['auth', 'is:(admin)'])
