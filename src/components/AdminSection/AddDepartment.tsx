import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import React, { FunctionComponent, useState } from 'react'
import { post } from '../../Services/PostData'
import { obj } from '../../Types/departmentType'

interface adddepProps {
    onHide: ()=>void,
    updatelist: ()=>void,
    show:boolean,
    deps:obj[]
}

const AddDepartment:FunctionComponent<adddepProps> = (props) => {

  const [error, setError] = useState("")
  const [isFormValid, setIsFormValid] = useState(true)

  const handleSubmit = (event:React.SyntheticEvent) => {
    event.preventDefault()
    if(isFormValid)
    {
      const target = event.target as typeof event.target & {
          DepartmentName: { value: string };
      };

      const data = JSON.stringify({
        DeparmentID:null,
        DepartmentName:target.DepartmentName.value,
      })

      post("department",data).then((result)=>{props.updatelist()},(error)=>alert('Failed'))

    }
  }

  const ext = (department:any) : boolean => {
    let check = props.deps.filter(x=>x.DepartmentName === department)
    if(check.length !== 0) {
      return true
    }
    else {
      return false
    }
  }

  const checkDepartment = (event:React.ChangeEvent<HTMLInputElement>) => {
    if(ext(event.target.value))
    {
      setError("Department Already Exist")
      setIsFormValid(false)
    }
    else
    {
      setError("")
      setIsFormValid(true)
    }
  }
  
  const hClose = () => {
      props.onHide()
      setError("")
  }

  return (<Modal 
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Department
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
            <Row>
                <Col sm={6}>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group>
                          <Form.Label>DepartmentName</Form.Label>
                          <Form.Control 
                              type="text"
                              name="DepartmentName"
                              onChange={checkDepartment}
                              required
                              placeholder="Department Name"
                          />
                      </Form.Group>
                      <p style={{color:"red"}}>{error}</p>
                      <Form.Group>
                          <Button variant="primary" type="submit" disabled={!isFormValid}>
                              Add
                          </Button>
                      </Form.Group>
                    </Form>
                </Col>
            </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={hClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddDepartment
