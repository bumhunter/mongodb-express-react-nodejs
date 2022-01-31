import {createContext} from "react"

function noop() {}

export const AuthContext = createContext({
  // базовые составляющий контекста
  // пустая функция noop служит заглушкой
  // AuthContect передает параметры не по древовидной структуре, а по всему приложению
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
})