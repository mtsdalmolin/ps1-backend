'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const School = use('App/Models/School')
const Classroom = use('App/Models/Classroom')

/**
 * Resourceful controller for interacting with classrooms
 */
class ClassroomController {
  /**
   * Show a list of all classrooms.
   * GET classrooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const classrooms = Classroom.all()

    return classrooms
  }

  /**
   * Create/save a new classroom.
   * POST classrooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { id, identifier, school_id } = request.post()
    const school = await School.find(school_id)

    if (!school)
      return response.status(404).json({
        message: 'School not found!'
      })

    const registration = await Classroom.create({ id, identifier, school_id })

    response.status(201).json({
      success: true,
      message: `Successfully registered classroom ${identifier} to ${school.social_reason}.`,
      data: registration
    })

  }

  /**
   * Display a single classroom.
   * GET classrooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const classroom = await Classroom.findOrFail(params.id)
  
    return classroom
  }

  /**
   * Update classroom details.
   * PUT or PATCH classrooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const classroom = await Classroom.findOrFail(params.id);
    const data = request.only(["identifier"]);
    
    classroom.merge(data);
    await classroom.save();
    
    return classroom
  }

  /**
   * Delete a classroom with id.
   * DELETE classrooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const classroom = await Classroom.findOrFail(params.id)

    await classroom.delete()
  }
}

module.exports = ClassroomController
