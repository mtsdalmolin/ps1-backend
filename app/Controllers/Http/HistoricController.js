'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Classroom = use('App/Models/Classroom')
const Historic = use('App/Models/Historic')
const Ticket = use('App/Models/Ticket')
const Database = use('Database')

/**
 * Resourceful controller for interacting with historics
 */
class HistoricController {
  /**
   * Show a list of all historics.
   * GET historics
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params, request, response, view }) {
    const ticket = await Ticket.findOrFail(params.ticketId)

    return await ticket.historics().fetch()
  }
  
  /**
   * Create/save a new historic.
   * POST historics
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, params, response }) {
    const { description, situation } = request.post()
    
    const ticket = await Ticket.findOrFail(params.ticketId)
 
    try {
      const historic = await ticket.historics().create({ description, situation })

      return response.json({
        success: true,
        data: { 
          historic
        },
        message: 'Historico criado com sucesso'
      })
    } catch(error) {
      return response.badRequest(`Erro: ${error.name}\nMensagem: ${error.message}`)
    }
  }

  /**
   * Display a single historic.
   * GET historics/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update historic details.
   * PUT or PATCH historics/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const historic = await Historic.findOrFail(params.id)
    const data = request.only(["description", "situation"])

    try {
      historic.merge(data)
      await historic.save()
    } catch (error) {
      return response.badRequest(`Erro: ${error.name}\nMensagem: ${error.message}`)
    }
    
    return historic
  }

  /**
   * Delete a historic with id.
   * DELETE historics/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const historic = await Historic.findOrFail(params.id)
    await historic.delete()
  }
}

module.exports = HistoricController
