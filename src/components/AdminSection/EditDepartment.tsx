import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import React, { FunctionComponent, useState } from 'react'
import { put } from '../../Services/PutData'
import { obj } from '../../Types/departmentType'

interface eddepProps {
    depId : number | string ,
    depName: string,
    onHide: ()=>void,
    updatelist: ()=>void,
    show:boolean,
    deps:obj[]
}

const EditDepartment:FunctionComponent<eddepProps> = (props) => {

    const [error, setError] = useState("")
    const [isFormValid, setIsFormValid] = useState(true)

    const handleSubmit=(event:React.SyntheticEvent)=>{
        event.preventDefault()

        if(isFormValid === true)
        {
            const target = event.target as typeof event.target & {
                DeparmentID: { value: number };
                DepartmentName: { value: string };
            };

            const data = JSON.stringify({
                DeparmentID:target.DeparmentID.value,
                DepartmentName:target.DepartmentName.value,
            })

            put("department",data).then((result)=>{props.updatelist()},(error)=>alert('Failed'))

        }
    }

    
    const ext = (department:any) : boolean => {
        let check = props.deps.filter(x=>x.DepartmentName === department)
        if(check.length !== 0 && department!==props.depName)
        {
            return true
        }
        else
        {
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
    
    const hClose = () =>
    {
        props.onHide()
        setError("")
    }

    return (
    <Modal 
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
              <Row>
                  <Col sm={6}>
                      <Form onSubmit={handleSubmit}>
                      <Form.Group>
                            <Form.Label>DepartmentID</Form.Label>
                            <Form.Control 
                                type="text"
                                name="DeparmentID"
                                required
                                disabled
                                defaultValue={props.depId}
                                placeholder="Department ID"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>DepartmentName</Form.Label>
                            <Form.Control 
                                type="text"
                                name="DepartmentName"
                                required
                                onChange={checkDepartment}
                                defaultValue={props.depName}
                                placeholder="Department Name"
                            />
                        </Form.Group>
                        <p style={{color:"red"}}>{error}</p>
                        <Form.Group>
                            <Button variant="primary" type="submit" disabled={!isFormValid}>
                                Update
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

export default EditDepartment