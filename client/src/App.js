import React from "react"
import {BrowserRouter} from "react-router-dom"
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import 'materialize-css'
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";

function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if(!ready) {
    return <Loader />
  }

  return (
    // контекст должен быть еще и провайдером
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <BrowserRouter>
        { isAuthenticated && <Navbar/> }
        <div className="container">
         {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;