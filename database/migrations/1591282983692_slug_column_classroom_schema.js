'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SlugColumnClassroomSchema extends Schema {
  up () {
    this.table('classrooms', (table) => {
      // alter table
      table.string('slug').notNullable()
    })
  }

  down () {
    this.table('classrooms', (table) => {
      table.dropColumn('slug')
    })
  }
}

module.exports = SlugColumnClassroomSchema
