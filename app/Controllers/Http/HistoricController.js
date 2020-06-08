'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

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
  async index ({ request, response, view }) {
    const historics = await Historic.all()
    
    return historics;
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
    const {
      description,
      situation,
    } = request.all()
    
    const ticket = await Ticket.findByOrFail('id', params.ticket_id)

    const trx = await Database.beginTransaction()
    
    try {
      const historic = await Historic.create({
        description,
        situation,
        ticket_id: ticket.id
      }, trx)
  
      trx.commit()

      return response.json({
        success: true,
        data: { 
          historic
        },
        message: 'Historico criado com sucesso.'
      })
    } catch(error) {
      trx.rollback()
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
    const historic = await Historic.findOrFail(params.id)

    return historic
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
    const historic = await Historic.findOrFail(params.id);
    const data = request.only(["description", "situation"]);
    
    historic.merge(data);
    await historic.save();
    
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
    const historic = await Historic.findOrFail(params.id);
    await historic.delete();
  }
}

module.exports = HistoricController
