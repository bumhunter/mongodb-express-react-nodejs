// файл для того, чтобы при работе о ссылками перехватывать jwt токен пользователя

const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {  // next позволяет продолжить выполнение запроса
  if (req.method === 'OPTIONS') { // метод REST-api, проверяющий доступность сервера
    return next() // если это OPTIONS, то ничего делать не нужно и продолжаем делать запрос
  }
  // если это GET или пост POST
  try {
    const token = req.headers.authorization  // строка, получаемая с Frontend'а
    .split(' ')[1] // строку надо разбить на две части по пробелу и токеном
                              // будет являться элемент массива 1
    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }
    // если токен есть, мы должны его раскодировать

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded
    next()
  } catch (e) {
    return res.status(401).json({ message: 'Нет авторизации' })
  }

}

