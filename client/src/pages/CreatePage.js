import React, {useContext, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
// если нужно изменять локальный state

export const CreatePage = () => { // для подтверждения авторизации нужен контекст auth
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const {request} = useHttp()  // хук, работающий с http
  const [link, setLink] = useState('')
  const pressHandler = async event => {  // событие при нажатии enter
    if (event.key === 'Enter') {
      try {
        // data - поле где хранится ссылка
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}` // обратные кавычки
        })
        navigate(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            placeholder=""
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  )
}