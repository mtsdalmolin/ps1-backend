'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const CRC32 = require('crc-32')
const Database = use('Database')
const School = use('App/Models/School')
const Address = use('App/Models/Address')

/**
 * Resourceful controller for interacting with schools
 */
class SchoolController {
  /**
   * Show a list of all schools.
   * GET schools
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const schools = await School.all()

      return Promise.all(schools.rows.map(async school => {
        const address = await Address.findBy('school_id', school.$attributes.id)
        
        return {
          school: { ...school.$attributes },
          address: { ...address.$attributes }
        }
      }))
    } catch (e) {
      return response.badRequest('Ocorreu um erro inesperado.')
    }
  }

  /**
   * Render a form to be used for creating a new school.
   * GET schools/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new school.
   * POST schools
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const schoolData = request.only(['social_reason'])
    const addressData = request.only(['street', 'number', 'complement'])
    const id_hash = Math.abs(CRC32.bstr(schoolData.social_reason))

    const trx = await Database.beginTransaction()
    try {
      const school = await School.create({ ...schoolData, id_hash }, trx)
      const address = await Address.create({ ...addressData, school_id: school.id }, trx)

      await trx.commit()

      return response.json({
        success: true,
        data: { 
          school: { 
            ...school.$attributes 
          },
          address: {
            ...address.$attributes
          }
        },
        message: 'Cadastro criado com sucesso.'
      })
    } catch(e) {
      return response.badRequest('Ocorreu um erro ao registrar sua conta.')
    }
  }

  /**
   * Display a single school.
   * GET schools/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const school = await School.findByOrFail('id_hash', params.id)
    const address = await Address.findByOrFail('school_id', school.id)

    return response.json({
      school: {
        ...school.$attributes
      },
      address: {
        ...address.$attributes
      }
    })
  }

  /**
   * Render a form to update an existing school.
   * GET schools/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update school details.
   * PUT or PATCH schools/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const school = await School.findByOrFail('id_hash', params.id)
    const schoolData = request.only(['social_reason'])
    const address = await Address.findByOrFail('school_id', school.id)
    const addressData = request.only(['street', 'number', 'complement'])

    const trx = await Database.beginTransaction()
    
    try {
      school.merge(schoolData)
      await school.save(trx)

      address.merge(addressData)
      await address.save(trx)

      trx.commit()

      return response.json({
        success: true,
        data: { 
          school: { 
            ...school.$attributes 
          },
          address: {
            ...address.$attributes
          }
        },
        message: 'Registro atualizado com sucesso.'
      })
    } catch(e) {
      return response.badRequest('Aconteceu um erro ao atualizar os dados.')
    }
  }

  /**
   * Delete a school with id.
   * DELETE schools/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const school = await School.findByOrFail('id_hash', params.id)
    try {
      await school.delete()
      return response.json({
        message: 'Cadastro removido com sucesso.'
      })
    } catch (e) {
      return response.badRequest('Ocorreu um erro ao deletar o seu cadastro.')
    }
  }
}

module.exports = SchoolController
