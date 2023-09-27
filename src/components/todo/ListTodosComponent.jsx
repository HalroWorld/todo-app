import { useEffect, useState } from "react";
import { deleteTodoApi, retrieveAllTodosForUsername } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodosComponent() {
  const today = new Date();

  const authContext = useAuth()

  const username = authContext.username

  const navigate = useNavigate();

  const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())

  const [todos, setTodos] = useState([])

  const [message, setMessage] = useState(null)

  useEffect(
    () => refreshTodos(), []
  )

  function refreshTodos() {
    retrieveAllTodosForUsername(username)
      .then(response => {
          setTodos(response.data)
      }
      )
      .catch(error => console.log(error))
  }

  function deleteTodo(id){
    deleteTodoApi(username, id)
      .then(
        () =>{
          //1:Display message
          setMessage(`${id} 삭제 성공`)
          //2:Update TodosList
          refreshTodos()
        }
          
      )
      .catch(error => console.log(error))
  }

  function updateTodo(id){
    navigate(`/Todo/${id}`)
  }

  return (
    <div className="container">
      <h1>할 일</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Index</th>
              <th>Description</th>
              <th>Is Done?</th>
              <th>TargetDate</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {
              todos.map(
                todo => (
                  <tr key={todo.id}>
                    <td>{todo.id}</td>
                    <td>{todo.description}</td>
                    <td>{todo.done.toString()}</td>
                    {/* <td>{todo.targetDate.toDateString()}</td> */}
                    <td>{todo.targetDate.toString()}</td>
                    <td><button className="btn btn-warning" 
                                  onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                    <td><button className="btn btn-success" 
                                  onClick={() => updateTodo(todo.id)}>Update</button></td>
                                  
                  </tr>
                )
              )
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}