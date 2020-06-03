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
  Route.get('/tickets/:userId/:ticketId', 'TicketController.show')
  Route.put('/tickets/:userId/:ticketId', 'TicketController.update')

  Route.post('/tickets/:userId/:ticketId/photos', 'PhotoController.store')
  Route.get('/tickets/:userId/:ticketId/photos', 'PhotoController.show')

  Route.post('/user_schools', 'UserSchoolController.store')

  Route.get('/schools/:schoolIdHash/classrooms', 'ClassroomController.index')
}).middleware(['auth'])

// Rotas autenticadas apenas para admin
Route.group(() => {
  Route.resource('users', 'UserController')
    .apiOnly()
    .except(['store']),
  
  Route.resource('schools', 'SchoolController')
    .apiOnly()
}).middleware(['auth', 'is:(admin)'])

// Rotas filhas de escolas, pois é mais fácil relacionar as rotas dessa forma
Route.group(() => {
  Route.resource(':schoolIdHash/classrooms', 'ClassroomController')
    .apiOnly()
    .except(['index'])

  // TODO: Fazer CRUD individual das rotas
  Route.resource(':schoolIdHash/addresses', 'AddressController')
  .apiOnly()
    
  Route.get(':schoolIdHash/users', 'UserSchoolController.show')
}).middleware(['auth', 'is:(admin)'])
  .prefix('schools')