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
  async index ({ request, response, view }) {
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
    const { user_id, school_id } = request.post()
    const user = await User.find(user_id)
    const school = await School.find(school_id)

    if (!user)
      return response.status(404).json({
        message: 'User not found!'
      })

    if (!school)
      return response.status(404).json({
        message: 'School not found!'
      })

    const registration = await UserSchool.create({ user_id, school_id })

    response.status(201).json({
      success: true,
      message: `Successfully registered user ${user.username} to ${school.social_reason}.`,
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
