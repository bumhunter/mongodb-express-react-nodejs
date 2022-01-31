const express = require('express') // подключаем библиотеку express
const config = require('config')
const mongoose = require('mongoose')
const app = express() // запуск сервера функцией express
const path = require('path')

// зарегистрировать роуты, которые будут по разному обрабатывать API-запросы с frontend
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))  // router является middleware
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') { // если NOVE_ENV из package.json имеет значение production
  app.use|('/', express.static(path.join(__dirname, 'client', 'build'))) // если запрос на корень, то указываем статическую папку
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })  // будет работать backend и frontend одновременно
}

//


const PORT = config.get('port') || 5000

async function start() {  // подключение к MongoDB через асинхронную функцию async/await
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT} ...`))
  } catch (e) {
    console.log('Server error', e.message)  // сообщение об ошибке
    process.exit(1)   // выход из глобального объекта node.js с помощью глобального объекта process
  }
}

start()

