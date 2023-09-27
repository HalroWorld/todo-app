import { useParams } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { retrieveTodoApi } from "./api/TodoApiService"
import { Field, Formik, Form, ErrorMessage } from "formik"

export default function TodoComponent(){
  const { id } = useParams()

  const [description, setDescripion] = useState('')

  const [targetDate, setTargetDate] = useState('')
  
  const authContext = useAuth()

  const username = authContext.username

  useEffect(
    () => retrieveTodos(),
    [id]
  )

  function retrieveTodos(){
    retrieveTodoApi(username, id)
    .then(response => {
      setDescripion(response.data.description)
      setTargetDate(response.data.targetDate)
    })
    .catch(error => console.log(error))
  }

  function onSubmit(values){
    console.log(values)
  }

  function validate(values){
    let errors = {
      // description: '유효한 설명을 입력하세요',
      // targetDate: '유효한 목표 날짜를 설정하세요'
     }

    if(values.description.length<5){
      errors.description = '5글자 이상 입력하세요'
    }

    if(values.targetDate == null){
      errors.targetDate = '원하는 날짜를 입력하세요'
    }
     
    return errors
  }

  return(
    <div className="container">
      <h1>Enter Todo details</h1>
      <div>
        <Formik initialValues={ { description, targetDate } }
          enableReinitialize = {true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {
            (props) =>(
              <Form>
                <ErrorMessage 
                  name = "description"
                  component="div"
                  className="alert alert-warning"
                />

                <ErrorMessage 
                  name = "targetDate"
                  component="div"
                  className="alert alert-warning"
                />
              
                <fieldset className="form-group">
                  <label>Descriotion</label>
                  <Field type="text" className ="form-control" name="description"/>
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field type="date" className ="form-control" name="targetDate"/>
                </fieldset>
                <div>
                  <button className="btn btn-success m-5" type="submit"> save </button>
                </div>
              </Form>
            )
          }
        </Formik>  

      </div>
    </div>
  )
}