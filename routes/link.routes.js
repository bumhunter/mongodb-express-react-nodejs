const {Router} = require('express')
const router = Router()
const Link = require('../models/Link')
const config = require("config")
const auth = require("../middleware/auth.middleware")
const shortid = require("shortid")

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl') //  получение нашего доменного адреса
    const { from } = req.body  // ссылка для обработки
    const code = shortid.generate() // герерируем код для будущей ссылки

    const existing = await Link.findOne({ from }) // проверяем существование ссылки в базе
    if(existing) {
      return res.json({ link: existing })
    }

    const to = baseUrl + '/t/' + code  // наш адрес + код ссылки
    const link = new Link({
      code, to, from, owner: req.user.userId
    })

    await link.save() // возвращает промис
    res.status(201).json({ link })

  } catch (e) {
    res.status(500).json({message:'Что-то пошло не так. Попробуйте снова'}) // 500 серверная ошибка HTTP
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId }) //  найти все ссылки текущего пользователя
    res.json(links)
  } catch (e) {
    res.status(500).json({message:'Что-то пошло не так. Попробуйте снова'}) // 500 серверная ошибка HTTP
  }
})

router.get('/:id', auth, async (req, res) => {
  try {

    const link = await Link.findById( req.params.id) //  найти ссылку по id
    res.json(link)
  } catch (e) {
    res.status(500).json({message:'Что-то пошло не так. Попробуйте снова'}) // 500 серверная ошибка HTTP
  }
})

module.exports = router

