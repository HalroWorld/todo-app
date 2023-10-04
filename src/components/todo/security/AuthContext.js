import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

//1: create a Context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


//2:share the created context with other components

export default function AuthProvider({ children }){

  const [isAuthenticated, setAuthenticated] = useState(false)

  const [username, setUsername] = useState(null)

  const [token, setToken] = useState(null)


  async function login(username, password){

    try{
      const reponse = await  executeJwtAuthenticationService(username, password)


      if (reponse.status == 200) {
        const jwtToken = 'bearer ' + reponse.data.token
        setAuthenticated(true)
        setUsername(username)
        setToken(jwtToken)

        apiClient.interceptors.request.use(
          (config) =>{
            console.log('test')
            config.headers.Authorization = jwtToken
            return config
          }
        )

        return true
      } else {
        logout()
        return false
    }
    }catch(error){
      logout()
      return false
    }
  }

  function logout(){
    setAuthenticated(false)
    setToken(null)
    setUsername(null)
  }

  return(
      <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token} }>
        {children}
      </AuthContext.Provider>
  )
}

//<A