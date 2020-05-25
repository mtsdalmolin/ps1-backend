'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Classroom = use('App/Models/Classroom')
const Photo = use('App/Models/Photo')
const User = use('App/Models/User')
const Ticket = use('App/Models/Ticket')

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
  async index ({ request, response, view }) {
    const tickets = Property.all()

    return tickets
  }

  /**
   * Create/save a new ticket.
   * POST tickets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { id, classroom_id, user_id, path, title, description } = request.post()
    const classroom = await Classroom.find(classroom_id)
    const user = await User.find(user_id)

    if (!classroom)
      return response.status(404).json({
        message: 'Classroom not found!'
      })
    if (!user)
      return response.status(404).json({
        message: 'User not found!'
      })

    try {
      const photo = await Photo.create({ id, path })
      const ticket = await Ticket.create({ id, classroom_id, user_id, photo_id: photo.id, title, description })

      return response.json({
        success: true,
        data: { 
          photo: { 
            ...photo.$attributes 
          },
          ticket: {
            ...ticket.$attributes
          }
        },
        message: 'Ticket criado com sucesso.'
      })

    } catch(e) {
      return response.badRequest('Ocorreu um erro ao registrar o Ticket.')
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
    const ticket = await Ticket.findOrFail(params.id)

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
    const data = request.only (['classroom_id', 'title', 'description'])
    
    const classroom = await Classroom.find(data.classroom_id)

    if (!classroom)
      return response.status(404).json({
        message: 'Classroom not found!'
      })

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
