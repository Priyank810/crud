import {Modal, Button, Row, Col} from 'react-bootstrap'
import TextError from '../Error/TextError'
import { Formik, Form, Field, ErrorMessage, FieldProps} from 'formik'
import * as yup from 'yup'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import { FunctionComponent } from 'react'
import { radiooptions, taskdetail } from '../../Types/taskType'
import { addTask } from '../../Services/user.services'

interface addTaskProps {
    show:boolean,
    onHide:()=>void,
    updatelist:()=>void
}

const AddTask:FunctionComponent<addTaskProps> = (props) => {

    const close = () =>{
        props.onHide()
    }

    const initialValues:taskdetail = {
        tasktitle:'',
        taskdescription:'',
        startdate:null,
        enddate:null,
        status:''
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
            taskid:null,
            employeemail:JSON.parse(localStorage.getItem("data")||'{}').email,
            tasktitle:values.tasktitle,
            taskdescription:values.taskdescription,
            startdate:values.startdate,
            enddate:values.enddate,
            iscompleted:values.status==="completed"?true:false
        })

        addTask(data).then((result)=>{props.updatelist()},(error)=>alert('Failed'))
        //post("task",data).then((result)=>{props.updatelist()},(error)=>alert('Failed'))

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
            Add Task
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

export default AddTask
