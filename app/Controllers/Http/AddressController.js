'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Address = use('App/Models/Address')

/**
 * Resourceful controller for interacting with addresses
 */
class AddressController {
  /**
   * Show a list of all addresses.
   * GET addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new address.
   * GET addresses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new address.
   * POST addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['street', 'number', 'complement'])

    try {
      const address = await Address.create({ ...data, school_id: school.id })
      
      return response.json({
        success: true,
        data: {
          address
        },
        message: 'Endereço criado com sucesso.'
      })
    } catch (error) {
      return response.badRequest('Ocorreu um erro ao cadastrar um endereço.')
    }
  }

  /**
   * Display a single address.
   * GET addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing address.
   * GET addresses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update address details.
   * PUT or PATCH addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const address = await Address.findOrFail(params.id)
    const data = request.only(['street', 'number', 'complement'])
    address.merge(data)
    await address.save()
    return response.json({
      success: true,
      data: address,
      message: 'Endereço atualizado com sucesso.'
    })
  }

  /**
   * Delete a address with id.
   * DELETE addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const address = await Address.findOrFail(params.id)
    try {
      await address.delete()
      return response.json({
        message: 'Endereço removido com sucesso.'
      })
    } catch (e) {
      return response.badRequest('Ocorreu um erro ao deletar o endereço.')
    }
  }
}

module.exports = AddressController
