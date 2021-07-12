import React from 'react'
import {Modal, Button, Row, Col} from 'react-bootstrap'
import TextError from '../Error/TextError'
import { Formik, Form, Field, ErrorMessage, FieldProps} from 'formik'
import * as yup from 'yup'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import { put } from '../../Services/PutData'
import { radiooptions, taskdetailedit } from '../../Types/taskType'
import { editTask } from '../../Services/user.services'

interface editTaskProps {
    show:boolean,
    onHide:()=>void,
    updatelist:()=>void,
    taskid:number,
    tasktitle:string,
    taskdescription:string,
    sd:Date,
    ed:Date,
    isc:boolean
}

const EditTask: React.FunctionComponent<editTaskProps> = (props) => {

    const initialValues:taskdetailedit = {
        tasktitle:props.tasktitle,
        taskdescription:props.taskdescription,
        startdate:new Date(Date.parse(props.sd.toString())),
        enddate:new Date(Date.parse(props.ed.toString())),
        status:props.isc?"completed":"pending"
    }

    const validationSchema = yup.object({
        tasktitle: yup.string().required('Required'),
        taskdescription: yup.string().required('Required'),
        startdate: yup.date().required('Required').nullable(),
        enddate: yup.date().required('Required').nullable(),
        status: yup.string().required('Required')
    })

    const handleSubmit = (values: { tasktitle: any; taskdescription: any; startdate: any; enddate: any; status:any;},onSubmitProps: { setSubmitting: (arg0: boolean) => void; resetForm: () => void }) => {
        
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()

        const data = JSON.stringify({
            taskid:props.taskid,
            employeemail:JSON.parse(localStorage.getItem("data")||'{}').email,
            tasktitle:values.tasktitle,
            taskdescription:values.taskdescription,
            startdate:values.startdate,
            enddate:values.enddate,
            iscompleted:values.status==="completed"?true:false
        })

        editTask(data).then((result)=>{props.updatelist()},(error)=>alert('Failed'))
        
    }

    const close = () =>{
        props.onHide()
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
            Edit Task
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
                                <label htmlFor="tasktitle" className="form-label">Task Title</label>
                                <Field name="tasktitle" id="tasktitle" type="text" placeholder="Task title" className="form-control"></Field>
                                <ErrorMessage component={TextError} name="tasktitle"></ErrorMessage>
                            </div>

                            <div className="form-group">
                                <label htmlFor="taskdescription" className="form-label">Task Description</label>
                                <Field as="textarea" name="taskdescription" id="taskdescription" type="text" placeholder="Description..." className="form-control"></Field>
                                <ErrorMessage component={TextError} name="taskdescription"></ErrorMessage>
                            </div>
                            
                            <div className="form-group">
                                <div>
                                    <label htmlFor='startdate' className="form-label">Start Date</label>
                                </div>
                                <Field name="startdate">
                                    {
                                        ({form, field}:FieldProps) => {
                                            const { setFieldValue } = form
                                            const { value } = field
                                            return(
                                                <DatePicker 
                                                    id="startdate"
                                                    {...field}
                                                    selected = {value}
                                                    onChange = {val => setFieldValue('startdate', val)}
                                                    className="form-control"
                                                />
                                            )
                                        }
                                    }
                                </Field>
                                <ErrorMessage component={TextError} name='startdate'></ErrorMessage>
                            </div>
                            
                            <div className="form-group">
                                <div>
                                    <label htmlFor='enddate' className="form-label">End Date</label>
                                </div>
                                <Field name="enddate">
                                    {
                                        ({form, field}:FieldProps) => {
                                            const { setFieldValue } = form
                                            const { value } = field
                                            return(
                                                <DatePicker 
                                                    id="enddate"
                                                    {...field}
                                                    selected = {value}
                                                    onChange = {val => setFieldValue('enddate', val)}
                                                    className="form-control"
                                                />
                                            )
                                        }
                                    }
                                </Field>
                                <ErrorMessage component={TextError} name='enddate'></ErrorMessage>
                            </div> 

                            <div className="form-group">
                                <div>
                                    <label htmlFor="status" className="form-label">Status</label>
                                </div>
                                <Field name="status" id="status">
                                    {
                                        ({field}:FieldProps) => {
                                            return radiooptions.map(roption => {
                                                return(
                                                    <div key={roption.key} className="form-check form-check-inline">
                                                        <input type='radio' id={roption.value} {...field} value={roption.value} checked={field.value === roption.value} className="form-check-input" />
                                                        <label htmlFor={roption.key} className="form-check-label">{roption.value}</label>
                                                    </div>
                                                )
                                            })
                                        }
                                    }
                                </Field>
                                <ErrorMessage component={TextError} name="status"></ErrorMessage>
                            </div>  
                            </Col>
                        </Row>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Update</button>
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

export default EditTask
