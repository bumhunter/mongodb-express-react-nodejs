const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  from: {type: String, required: true}, // входящая ссылка, обязательна, уникальность не обязательна
  to: {type: String, required: true, unique: true}, // короткая ссылка
  code: {type: String, required: true, unique: true}, // код, с которым нужно взаимодействовать
  date: {type: Date, default: Date.now}, // дата создания
  clicks: {type: Number, default: 0}, // количество кликов
  owner: {type: Types.ObjectId, ref: 'User'} // для привязки ссылок к пользователю
  // ref - модель пользователя User
})

module.exports = model('Link', schema)