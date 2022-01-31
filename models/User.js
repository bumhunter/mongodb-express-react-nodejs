const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true }, // типа поля Строка, обязательная, уникальная
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: 'Link' }]  // для вывода массива ссылок конкретного пользователя.
                                      // связка модели пользователей с записями в БД
                                      // привязка к будущей модели Link
})

module.exports = model('User', schema)