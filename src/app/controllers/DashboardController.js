const { User } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')
const { Appointment } = require('../models')
class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({ where: { provider: true } })
    return res.render('dashboard', { providers })
  }

  async provider (req, res) {
    const customers = await Appointment.findAll({
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      }
    })
    let allCustomers = []
    for (var customer in customers) {
      const a = await User.findOne({
        where: {
          id: customers[customer].user_id
        }
      })
      allCustomers.push({
        id: customers[customer].id,
        name: a.name,
        email: a.email,
        avatar: a.avatar,
        day: customers[customer].date.getDate(),
        month: customers[customer].date.getMonth(),
        hour: customers[customer].date.toLocaleTimeString()
      })
    }
    // console.log(allCustomers)
    return res.render('provider', { allCustomers })
  }
}

module.exports = new DashboardController()
