'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DropColumnSituationSchema extends Schema {
  up () {
    this.alter('tickets', (table) => {
      table.dropColumn('situation')
    })
  }

}

module.exports = DropColumnSituationSchema