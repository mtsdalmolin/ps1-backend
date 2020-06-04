'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassroomSchema extends Schema {
  up () {
    this.create('classrooms', (table) => {
      table.increments()
      table.string('identifier').notNullable()
      table
        .integer('school_id')
        .unsigned()
        .index('classroom_school_id')
        .references('id')
        .inTable('schools')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('classrooms')
  }
}

module.exports = ClassroomSchema
