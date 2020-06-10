'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeSituationColumnToEnumHistoricsSchema extends Schema {
  up () {
    this.raw(`
      CREATE TYPE situation_type AS ENUM (
        'Aguardando aceitação', 
        'Aceito pela diretoria', 
        'Encaminhado para conserto',
        'Encerrado'
      );

      ALTER TABLE historics
        ALTER COLUMN situation TYPE situation_type USING situation::situation_type;
    `)
  }

  down() {
    this.table('historics', (table) => {
      table.string('situation')
        .notNullable()
        .alter()
    })
    this.raw('DROP TYPE situation_type')
  }
}

module.exports = ChangeSituationColumnToEnumHistoricsSchema
