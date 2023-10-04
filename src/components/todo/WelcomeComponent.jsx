import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

export default function WelcomeComponent() {

  const { username } = useParams()

  const [message, setMessage] = useState(null);

  const authContext = useAuth()
  function callHelloRestApi(){

    retrieveHelloWorldPathVariable('Ranga', authContext.token)
    .then( (response) => successfulResponse(response) )
    .catch( (error) => errorResponse(error) )
    .finally( ()=> console.log('cleanup'))
  }

  function successfulResponse(response){
    console.log(response)
    setMessage(response.data.message)
  }

  function errorResponse(error){
    console.log(error)
  }

  return (
    <div className="Welcome">
      <h1> {username}님 환영합니다 </h1>
      <div>
        your todos. <Link to='/todos'>GO here </Link>
      </div>
      <div>
        <button className='btn btn-success m-5' onClick={callHelloRestApi}>
          Call hello World
        </button>
      </div>
      {message}
    </div>
  )
}