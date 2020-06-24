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

Route.resource('/photos', 'PhotoController')
  .apiOnly()

// Rotas autenticadas para o usuário e/ou admin
Route.group(() => {
  // Edição de usuário
  Route.put('/users/:id', 'UserController.update')

  Route.get('/photos/:path', 'PhotoController.show')

  Route.post('/user_schools', 'UserSchoolController.store')
  Route.get('/user_schools', 'UserSchoolController.index')

  Route.get('/schools/:schoolIdHash/classrooms', 'ClassroomController.index')

  // Rota cadastro de ticket
  Route.resource('/schools/:schoolIdHash/classrooms/:classroomSlug/tickets', 'TicketController')
    .apiOnly()
    .except(['destroy', 'update'])
  
  Route.get('/schools/:schoolIdHash/tickets', 'TicketController.index')
}).middleware(['auth'])

// Rotas autenticadas apenas para admin
Route.group(() => {
  Route.resource('users', 'UserController')
    .apiOnly()
    .except(['store'])
  
  Route.resource('schools', 'SchoolController')
    .apiOnly()
}).middleware(['auth', 'is:(admin)'])

// Rotas filhas de escolas, pois é mais fácil relacionar as rotas dessa forma
Route.group(() => {
  Route.resource('/classrooms', 'ClassroomController')
    .apiOnly()
    .except(['index'])

  Route.put('/classrooms/:classroomSlug/tickets/:id', 'TicketController.update')
  Route.delete('/classrooms/:classroomSlug/tickets/:id', 'TicketController.destroy')

  Route.resource('/classrooms/:classroomSlug/tickets/:ticketId/history', 'HistoricController')
    .apiOnly()
    .except(['show'])

  // TODO: Fazer CRUD individual das rotas
  Route.resource('/addresses', 'AddressController')
    .apiOnly()
    
  Route.get('/users', 'UserSchoolController.show')

  Route.get('/reportedTickets', 'ReportController.reportedTickets')
  Route.get('/reportedTicketsBySituation', 'ReportController.reportedTicketsBySituation')
  Route.get('/reportedTicketsByUser', 'ReportController.reportedTicketsByUser')
  Route.get('/reportedTicketsByClassroom', 'ReportController.reportedTicketsByClassroom')
}).middleware(['auth', 'is:(admin)'])
  .prefix('schools/:schoolIdHash')
