import { useState } from 'react'
import'./TodoApp.css'
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom'

export default function TodoApp(){
  return(
    <div className="TodoApp">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginComponent />}></Route>
          <Route path='login' element={<LoginComponent />}></Route>
          <Route path='welcome/:username' element={<WelcomeComponent />}></Route>
          <Route path='*' element={<ErrorComponent />}></Route>
        </Routes>
      </BrowserRouter>
      
      
    </div>
  )
}

function LoginComponent(){

  const[username, setUsername] = useState("in28minutes")

  const[password, setPassword] = useState()

  const[showSuccessMessage, setShowSuccessMessage] = useState(false)

  const[showErrorMessage, setShowErrorMessage] = useState(false)

  const navigate = useNavigate();

  function handleUsernameChange(event){
    setUsername(event.target.value)
  }

  function handlePasswordChange(event){
    setPassword(event.target.value)
  }

  function handelSumit(){
    if(username==='in28minutes2' && password==='dummy'){
      setShowSuccessMessage(true)
      setShowErrorMessage(false)
      navigate(`/welcome/${username}`)
    }else{
      setShowSuccessMessage(false)
      setShowErrorMessage(true)
    }
  }

  return(
    <div className="Login">
      {showSuccessMessage && <div className='successMessage'> 로그인 성공</div>}
      {showErrorMessage && <div className='errorMessage'>로그인 실패</div>}
      
      <div className="LoginForm">
        <div>
          <label>User Name</label>
          <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
        </div>  
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
        </div>  
        <div>
          <button type="button" name="login" onClick={handelSumit}> login </button>
        </div>  
      </div>
    </div>
  )
}



function WelcomeComponent(){

  const {username} = useParams()

  
  return(
    <div className="Welcome">
      <h1> {username}님 환영합니다 </h1>
      <div >
        Welcome Component
      </div>
    </div>
    
  )
}

function ErrorComponent(){
  return(
    <div className="Welcome">
     <h1>We Are working really hard!</h1>
     <div>
        404오류
     </div>
    </div>
  )
}

function ListTodosComponent(){
  return(
    <div className="ListTodosComponent">
     <h1>해야 할 일을 생각하세요</h1>
     <div>
        Todo details
     </div>
    </div>
  )
}