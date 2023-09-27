import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext'
export default function LoginComponent() {
  
  const [username, setUsername] = useState(useAuth.username)

  const [password, setPassword] = useState()

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const navigate = useNavigate();

  const authContext = useAuth()
  function handleUsernameChange(event) {
    setUsername(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  function handelSumit() {
    if (authContext.login(username, password)) {
      navigate(`/welcome/${username}`)
    } else {
      setShowSuccessMessage(false)
      setShowErrorMessage(true)
    }
  }

  return (
    <div className="Login">
      
      {showErrorMessage && <div className='errorMessage'>로그인 실패</div>}

      <div className="LoginForm">
        <div>
          <label>User Name</label>
          <input type="text" name="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <button type="button" name="login" onClick={handelSumit}> login </button>
        </div>
      </div>
    </div>
  )
}