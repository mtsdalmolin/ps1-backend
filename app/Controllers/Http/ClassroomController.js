'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const School = use('App/Models/School')
const Classroom = use('App/Models/Classroom')
const Slugify = use('slugify')

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
  async index ({ params, request, response, view }) {
    const school = await School.findByOrFail('id_hash', params.schoolIdHash)

    return await Classroom
      .query()
      .where('school_id', school.id)
      .fetch()
  }

  /**
   * Create/save a new classroom.
   * POST classrooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response }) {
    const { identifier } = request.post()
    const school = await School.findByOrFail('id_hash', params.schoolIdHash)

    const slug = Slugify(identifier, { lower: true })

    const classroom = await Classroom.create({ identifier, slug, school_id: school.id })

    return response.status(201).json({
      success: true,
      message: `Sala de aula ${identifier} registrada em ${school.social_reason}.`,
      data: classroom
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
    return await Classroom.findByOrFail('slug', params.id)
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
    const classroom = await Classroom.findByOrFail('slug', params.id);
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
    const classroom = await Classroom.findByOrFail('slug', params.id)

    await classroom.delete()
  }
}

module.exports = ClassroomController
