import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { Field, Formik, Form, ErrorMessage } from "formik"
import moment from "moment/moment"

export default function TodoComponent() {
  const { id } = useParams()

  const [description, setDescripion] = useState('')

  const [targetDate, setTargetDate] = useState('')

  const authContext = useAuth()

  const username = authContext.username

  const navigate = useNavigate()

  useEffect(
    () => retrieveTodos(),
    [id]
  )

  function retrieveTodos() {

    if (id !== -1) {
      retrieveTodoApi(username, id)
        .then(response => {
          setDescripion(response.data.description)
          setTargetDate(response.data.targetDate)
        })
        .catch(error => console.log(error))
    }

  }

  function onSubmit(values) {
    
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false
    }

    if (id === -1) {
      createTodoApi(username, todo)
        .then(response => {
          navigate('/todos')

        })
        .catch(error => console.log(error))
    } else {
      updateTodoApi(username, id, todo)
        .then(response => {
          navigate('/todos')

        })
        .catch(error => console.log(error))
    }

  }

  function validate(values) {
    let errors = {
      // description: '유효한 설명을 입력하세요',
      // targetDate: '유효한 목표 날짜를 설정하세요'
    }

    if (values.description.length < 5) {
      errors.description = '5글자 이상 입력하세요'
    }

    if (values.targetDate === null || values.targetDate === '' || !moment(values.targetDate).isValid()) {
      errors.targetDate = '원하는 날짜를 입력하세요'
    }

    return errors
  }

  return (
    <div className="container">
      <h1>Enter Todo details</h1>
      <div>
        <Formik initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {
            (props) => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />

                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                />

                <fieldset className="form-group">
                  <label>Descriotion</label>
                  <Field type="text" className="form-control" name="description" />
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field type="date" className="form-control" name="targetDate" />
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