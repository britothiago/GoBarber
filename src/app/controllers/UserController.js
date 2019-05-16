const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    if (!req.body.name) {
      req.flash('error', 'Ops.. Preencha o nome')
      return res.redirect('/signup')
    } else if (!req.body.email) {
      req.flash('error', 'Ops.. Preencha o e-mail')
      return res.redirect('/signup')
    } else if (!req.body.password) {
      req.flash('error', 'Ops.. Preencha a senha')
      return res.redirect('/signup')
    }
    const { filename: avatar } = req.file
    await User.create({ ...req.body, avatar })
    req.flash('success', 'Parabéns. Conta criada com sucesso')
    return res.redirect('/')
  }
}

module.exports = new UserController()
