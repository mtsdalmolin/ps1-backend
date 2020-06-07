'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')
const School = use('App/Models/School')
const UserSchool = use('App/Models/UserSchool')

/**
 * Resourceful controller for interacting with userschools
 */
class UserSchoolController {
  /**
   * Show a list of all userschools.
   * GET userschools
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, request, response, view }) {
    const relationship = await UserSchool.findBy('user_id', auth.user.id)

    if (relationship)
      return await School.find(relationship.school_id)
    
    return response.status(204).json()
  }

  /**
   * Render a form to be used for creating a new userschool.
   * GET userschools/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new userschool.
   * POST userschools
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { user_id, school_id_hash } = request.post()
    const user = await User.findOrFail(user_id)
    const school = await School.findByOrFail('id_hash', school_id_hash)

    const registration = await UserSchool.create({ user_id, school_id: school.id })

    return response.status(201).json({
      success: true,
      message: `Vínculo de ${user.username} em ${school.social_reason} processado com sucesso.`,
      data: registration
    })
  }

  /**
   * Display a single userschool.
   * GET userschools/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const school = await School.findByOrFail('id_hash', params.schoolIdHash)

    let relationships = await UserSchool
      .query('user_id')
      .where('school_id', school.id)
      .fetch()

    const users = await Promise.all(relationships.rows.map(async relation => {
      let usr = await User.findOrFail(relation.user_id)
      let roles = await usr.getRoles()
      return { ...usr.$attributes, type: roles.length ? roles[0] && roles[0] : 'guest' }
    }))

    return users
  }

  /**
   * Render a form to update an existing userschool.
   * GET userschools/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update userschool details.
   * PUT or PATCH userschools/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a userschool with id.
   * DELETE userschools/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserSchoolController
