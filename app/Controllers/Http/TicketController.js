'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Classroom = use('App/Models/Classroom')
const Ticket = use('App/Models/Ticket')
const School = use('App/Models/School')
const Database = use('Database')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with tickets
 */
class TicketController {
  /**
   * Show a list of all tickets.
   * GET tickets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, params, request, response, view }) {
    const user = await auth.getUser()

    const [userRoles] = await user.getRoles()

    if (userRoles !== 'admin')
      return await Ticket.query()
        .with('photos')
        .where('user_id', user.id)
        .fetch()
        
    if (params.classroomSlug) {
      const classroom = await Classroom.findByOrFail('slug', params.classroomSlug)
      return await Ticket.query()
        .with('photos')
        .where('classroom_id', classroom.id)
        .fetch()
    }

    const school = await School.findByOrFail('id_hash', params.schoolIdHash)
    const classrooms = await school.classrooms().with('tickets').fetch()
    return classrooms
  }

  /**
   * Create/save a new ticket.
   * POST tickets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, params, request, response }) {
    const {
      title,
      description,
    } = request.all()

    const photos = request.file('photo', {
      types: ['image']
    })

    const classroom = await Classroom.findByOrFail('slug', params.classroomSlug)

    const trx = await Database.beginTransaction()
    try {
      const ticket = await Ticket.create({
        classroom_id: classroom.id,
        user_id: auth.user.id,
        title,
        description
      }, trx)

      if (photos) {
        await photos.moveAll(Helpers.tmpPath('uploads'), file => ({
          name: `${Date.now()}-${file.clientName}`
        }))
  
        if (!photos.movedAll()) {
          return photos.errors()
        }
  
        await Promise.all(
          photos
            .movedList()
            .map(photo => ticket.photos().create({ path: photo.fileName }, trx))
        )
      }

      trx.commit()

      return response.json({
        success: true,
        data: { 
          ticket,
          photos
        },
        message: 'Ticket criado com sucesso.'
      })
    } catch(error) {
      trx.rollback()
      return response.badRequest(`Erro: ${error.name}\nMensagem: ${error.message}`)
    }
  }

  /**
   * Display a single ticket.
   * GET tickets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const ticket = await Ticket.query()
      .with('photos')
      .where('id', params.id)
      .fetch()

    return ticket
  }

  /**
   * Update ticket details.
   * PUT or PATCH tickets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const ticket = await Ticket.findOrFail(params.id)
    const data = request.only(['title', 'description'])

    ticket.merge(data)
    await ticket.save()
    
    return ticket
  }

  /**
   * Delete a ticket with id.
   * DELETE tickets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const ticket = await Ticket.findOrFail(params.id)

    await ticket.delete()
  }
}

module.exports = TicketController
