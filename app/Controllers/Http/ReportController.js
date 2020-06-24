'use strict'

const Ticket = use('App/Models/Ticket')
const Historic = use('App/Models/Historic')
const Database = use('Database')

class ReportController {
  async reportedTickets ({ request, response }) {
    const { mode } = request.get()

    switch(mode) {
      case 'dates':
        const dateExtraction = "CONCAT(EXTRACT(DAY FROM tickets.created_at), '/', EXTRACT(MONTH FROM tickets.created_at), '/', EXTRACT(YEAR FROM tickets.created_at))"
        return await Ticket.query()
          .groupBy(Database.raw('date'))
          .select(Database.raw(`
            COUNT(*) AS total,
            ${dateExtraction} as date
          `))
          .fetch()
      case 'weeks':
        const weekExtraction = 'EXTRACT(WEEK FROM tickets.created_at)'
        return await Ticket.query()
          .groupBy(Database.raw('EXTRACT(WEEK FROM tickets.created_at)'))
          .select(Database.raw(`
            COUNT(*) AS total,
            ${weekExtraction} as week
          `))
          .fetch()
      case 'months':
        const monthExtraction = 'EXTRACT(MONTH FROM tickets.created_at)'
        return await Ticket.query()
          .groupBy(Database.raw('EXTRACT(MONTH FROM tickets.created_at)'))
          .select(Database.raw(`
            COUNT(*) AS total,
            ${monthExtraction} as month
          `))
          .fetch()
      case 'years':
        const yearExtraction = 'EXTRACT(YEAR FROM tickets.created_at)'
        return await Ticket.query()
          .groupBy(Database.raw('EXTRACT(YEAR FROM tickets.created_at)'))
          .select(Database.raw(`
            COUNT(*) AS total,
            ${yearExtraction} as year
          `))
          .fetch()
      default: return []
    }
  }

  async reportedTicketsBySituation () {
    return await Database
      .select([Database.raw('COUNT(*) AS total'), 'historics.situation'])
      .from('tickets')
      .join('historics', 'historics.id', builder => (
        builder
          .select(['id'])
          .from('historics')
          .where('historics.ticket_id', Database.raw('tickets.id'))
          .orderBy('historics.created_at', 'DESC')
          .limit(1)
      ))
      .groupBy('historics.situation')
  }

  async reportedTicketsByUser() {
    return await Ticket.query()
      .select(Database.raw('COUNT(*) as total, users.username'))
      .join('users', 'users.id', 'user_id')
      .groupBy('users.username')
      .fetch()
  }
}

module.exports = ReportController
