import { FunctionComponent, useState, useEffect } from 'react'
import {Modal, Button, Row, Col} from 'react-bootstrap'
import TextError from '../../Error/TextError'
import { Formik, Form, Field, ErrorMessage, FieldArray, FieldProps} from 'formik'
import * as yup from 'yup'
import { addLookUp, getLookUpName } from '../../../Services/lookup.services'

interface addLookupProps {
    show:boolean,
    onHide:()=>void,
    update:()=>void
}

type lt = {
    lookupname:string,
    lookupdescription:string
}

const AddLookUp:FunctionComponent<addLookupProps> = (props) => {

    const [Message, setMessage] = useState<string>('')

    const initialValues:lt = {
        lookupname:"",
        lookupdescription:""
    }

    const Exist = () => {
        if(Message === "Exist") {
            return true
        }
        return false
    }

    const checkLookUpName = (value:any) => {
        getLookUpName(value).then(data=>setMessage(data)) 
        if(Exist()) {
            return true
        }
        else {
            return false
        }
    }

    const validationSchema = yup.object({
        lookupname:yup.string().required('Required').test('checkLookUpName','Name already exist!',function(value){
            if(checkLookUpName(value)) {
                return false
            }
            else {
                return true
            }
        }),
        lookupdescription:yup.string().required('Required')
    })


    const handleSubmit = (values: {lookupname:any; lookupdescription:any; },onSubmitProps: { setSubmitting: (arg0: boolean) => void; resetForm: () => void }) => {
        
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()

        const data = JSON.stringify({
            lookupid:null,
            lookupname:values.lookupname,
            lookupdescription:values.lookupdescription,
            createdby:JSON.parse(localStorage.getItem("data")||'{}').email
        })
        addLookUp(data).then((result)=>{props.update()},(error)=>alert('Failed'))
    }

    return (
        <Modal 
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                    {formik=>{return(<Form>
                    <div className="container">
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <label htmlFor="lookupname" className="form-label">Name</label>
                                    <Field name="lookupname" type="text" placeholder="Enter name" className="form-control"></Field>
                                    <ErrorMessage component={TextError} name="lookupname"></ErrorMessage>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lookupdescription" className="form-label">Description</label>
                                    <Field as="textarea" name="lookupdescription" placeholder="Description..." className="form-control" />
                                    <ErrorMessage component={TextError} name="lookupdescription"></ErrorMessage>
                                </div>
                            </Col>
                        </Row>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>ADD</button>
                        </div>
                    </div>
                    </Form>)}}
                </Formik>  
            </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={()=>{props.update()}}>Close</button>
        </Modal.Footer>
      </Modal>
    )
}

export default AddLookUp
