'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DropColumnSituationSchema extends Schema {
  up () {
    this.alter('tickets', (table) => {
      table.dropColumn('situation')
    })
  }

  down () {
    this.table('tickets', (table) => {
      table.string('situation').notNullable()
    })
  }
}

module.exports = DropColumnSituationSchema