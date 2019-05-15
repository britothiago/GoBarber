const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.render('auth/nouser', {
        msg: 'Opa, este usuário digitado não existe em nosso banco'
      })
    }

    if (!(await user.checkPassword(password))) {
      return res.render('auth/nouser', {
        msg:
          'Opa, a senha que você digitou parece estar incorreta. Try again, please'
      })
    }
    req.session.user = user
    return res.redirect('/app/dashboard')
  }

  async login (req, res) {
    return res.render('dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()
