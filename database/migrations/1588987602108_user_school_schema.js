'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchoolSchema extends Schema {
  up () {
    this.create('user_schools', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .index('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('school_id')
        .unsigned()
        .index('school_id')
        .references('id')
        .inTable('schools')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_schools')
  }
}

module.exports = UserSchoolSchema
