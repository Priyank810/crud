import { FunctionComponent, useState, useEffect } from 'react'
import {Modal, Button, Row, Col} from 'react-bootstrap'
import TextError from '../Error/TextError'
import { Formik, Form, Field, ErrorMessage, FieldArray, FieldProps} from 'formik'
import * as yup from 'yup'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import { LogDetail, task } from '../../Types/logType'
import { addLog, getPendingTaskList } from '../../Services/user.services'

interface addLogProps {
    show:boolean,
    onHide:()=>void,
    updatelist:()=>void,
    logdate:string
}

const AddLog:FunctionComponent<addLogProps> = (props) => {

    const [pendingtask, setpendingtask] = useState<task[]>([])

    const close = () => {
        props.onHide()
    }

    const initialValues:LogDetail = {
        tasktitle:"",
        logdescription:"",
        logdate:new Date(props.logdate),
        loghours:null,
        logminutes:null
    }

    const validationSchema = yup.object({
        tasktitle: yup.string().required('Required'),
        logdescription: yup.string().required('Required'),
        logdate: yup.date().required('Required').nullable(),
        loghours: yup.number().required('Required'),
        logminutes: yup.number().required('Required')
    })

    const pendingTaskList = async () => {
         setpendingtask(await getPendingTaskList(JSON.parse(localStorage.getItem("data")||'{}').email,""))
    }

   useEffect(() => {
        pendingTaskList()
   },[])

    const handleSubmit = (values: { tasktitle: any; logdescription: any; logdate: any; loghours: any; logminutes:any;},onSubmitProps: { setSubmitting: (arg0: boolean) => void; resetForm: () => void }) => {
        
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()

        const a = [values.logdate.getDate(), values.logdate.getMonth()+1, values.logdate.getFullYear()]
        .map(n => n < 10 ? `0${n}` : `${n}`).join('/')

        const data = JSON.stringify ({
            employeemail:JSON.parse(localStorage.getItem("data")||'{}').email,
            tasktitle:values.tasktitle,
            logdescription:values.logdescription,
            logdate:a,
            loghour:values.loghours,
            logminute:values.logminutes,
        })
        addLog(data).then((result)=>{props.updatelist()},(error)=>alert('Failed'))
        // post("worklog",data).then((result)=>{props.updatelist()},(error)=>alert('Failed'))
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
            Add Log
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                    {formik=>{return(<Form>
                    <div className="container">
                        <Row>
                            <Col sm={6}>
                                <div className="form-group">
                                    <label htmlFor="tasktitle" className="form-label">Select Task</label>
                                    <Field as='select' name="tasktitle" id="tasktitle" className="form-control">
                                    <option>Select Task</option>
                                        {   
                                            pendingtask.map((option) => {
                                                return(
                                                    <option key={option.toString()} value={option.toString()}>{option.toString()}</option>
                                                )
                                            })
                                        }
                                    </Field>
                                    <ErrorMessage component={TextError} name="tasktitle"></ErrorMessage>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="logdescription" className="form-label">Description</label>
                                    <Field as="textarea" name="logdescription" id="logdescription" type="text" placeholder="Description..." className="form-control"></Field>
                                    <ErrorMessage component={TextError} name="logdescription"></ErrorMessage>
                                </div>
                            
                                <div className="form-group">
                                    <div>
                                        <label htmlFor='logdate' className="form-label">Date</label>
                                    </div>
                                    <Field name="logdate">
                                        {
                                            ({form, field}:FieldProps) => {
                                                const { setFieldValue } = form
                                                const { value } = field
                                                return(
                                                    <DatePicker 
                                                        id="logdate"
                                                        {...field}
                                                        selected = {value}
                                                        onChange = {val => setFieldValue('logdate', val)}
                                                        className="form-control"
                                                        readOnly
                                                    />
                                                )
                                            }
                                        }
                                    </Field>
                                    <ErrorMessage component={TextError} name='logdate'></ErrorMessage>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="loghours" className="form-label">Hours</label>
                                    <Field name="loghours" id="loghours" type="number" className="form-control"></Field>
                                    <ErrorMessage component={TextError} name="loghours"></ErrorMessage>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="logminutes" className="form-label">Minutes</label>
                                    <Field name="logminutes" id="logminutes" type="number" className="form-control"></Field>
                                    <ErrorMessage component={TextError} name="logminutes"></ErrorMessage>
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
          <Button variant="danger" onClick={close}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AddLog
