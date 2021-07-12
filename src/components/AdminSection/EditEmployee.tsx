import {Modal, Button, Row, Col} from 'react-bootstrap'
import React, { FunctionComponent, useState, useEffect } from 'react'
import TextError from '../Error/TextError'
import { Formik, Form, Field, ErrorMessage, FieldArray, FieldProps, getIn} from 'formik'
import * as yup from 'yup'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import { get } from '../../Services/GetData'
import { put } from '../../Services/PutData'
import { empObjedit, experiencedetail, hobbies, roptions } from '../../Types/employeeType'
import { obj } from '../../Types/departmentType'


interface editEmpProps{
    show:boolean,
    updatelist:()=>void,
    onHide:()=>void,
    empid:number|string,
    empname:string,
    empdept:string
    empmailid:string,
    empdoj:Date,
    gender:string,
    hobby:[],
    primaryaddress:string,
    secondaryaddress:string,
    imgFile:string,
    experience:experiencedetail[]
}

const EditEmployee: FunctionComponent<editEmpProps> = (props) => {

    const [departments,setDeps] = useState<obj[]>([])
    const [imgfile, setimgfile] = useState<any>("")
    
    const validationSchema = yup.object({
        EmployeeName: yup.string().required('Required'),
        Department: yup.string().required('Required'),
        DOJ: yup.date().required('Required').nullable(),
        gender: yup.string().required('Required'),
        addresses: yup.array().min(1).of(yup.string().trim().required('Required'))
    })


    const initialValues:empObjedit = {
        EmployeeID:props.empid,
        EmployeeName:props.empname,
        MailID:props.empmailid,
        Department:props.empdept,
        DOJ:new Date(Date.parse(props.empdoj.toString())),
        gender:props.gender,
        hobby:props.hobby,
        addresses:props.secondaryaddress!==null?[props.primaryaddress,props.secondaryaddress]:[props.primaryaddress],
        file:props.imgFile,
        experience:props.experience!==null?props.experience:[{technology:'',startdate:null,enddate:null}]
    }

    useEffect(() => {
        get("department","").then(
            data => setDeps(data)
        )
    },[])

    const handleSubmit = (values: { EmployeeName: any; Department: any; MailID: any; DOJ: any; gender:any; hobby:any; addresses:any; experience:any; },onSubmitProps: { setSubmitting: (arg0: boolean) => void; resetForm: () => void }) => {

        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()

        const data = JSON.stringify({
            EmployeeID:props.empid,
            EmployeeName:values.EmployeeName,
            Department:values.Department,
            MailID:values.MailID,
            DOJ:values.DOJ,
            gender:values.gender,
            hobby:values.hobby,
            primaryaddress:values.addresses[0],
            secondaryaddress:values.addresses[1],
            imgFile:imgfile!==""?imgfile:props.imgFile,
            experience:values.experience
        })

        put("employee",data).then((result)=>{props.updatelist()},(error)=>alert('Failed'))
        
    }

    const handleFile = (event:React.ChangeEvent<HTMLInputElement>)=>{
          
        const files:any = event.target.files;
        const file:any = files[0]
        const reader = new FileReader();
        
        reader.addEventListener("load", function () {
            setimgfile(reader.result)
        }, false);
        
        if (file) {
            reader.readAsDataURL(file)
        }
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
        Add Employee
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
                                <label htmlFor="text" className="form-label">Employee Name</label>
                                <Field name="EmployeeName" id="EmployeeName" type="text" placeholder="Enter Name" className="form-control"></Field>
                                <ErrorMessage component={TextError} name="EmployeeName"></ErrorMessage>
                            </div>

                            <div className="form-group">
                                <label htmlFor="MailID" className="form-label">Email</label>
                                <Field name="MailID" id="MailID" type="text" placeholder="Enter Email" className="form-control" readOnly></Field>
                                <ErrorMessage component={TextError} name="MailID"></ErrorMessage>
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="Department" className="form-label">Select Department</label>
                                <Field as='select' name="Department" className="form-control">
                                <option>Select Department</option>
                                    {
                                        departments.map(option => {
                                            return(
                                                <option key={option.DeparmentID} value={option.DepartmentName}>{option.DepartmentName}</option>
                                            )
                                        })
                                    }
                                </Field>
                                <ErrorMessage component={TextError} name="Department"></ErrorMessage>
                            </div>

                            <div className="form-group">
                                <div>
                                    <label htmlFor='DOJ' className="form-label">Date OF Joining</label>
                                </div>
                                <Field name="DOJ" className="form-control">
                                {
                                    ({form, field}:FieldProps) => {
                                        const { setFieldValue } = form
                                        const { value } = field
                                        return(
                                            <DatePicker 
                                                id="DOJ"
                                                {...field}
                                                selected = {value}
                                                onChange = {val => setFieldValue('DOJ', val)}
                                                className="form-control"
                                            />
                                        )
                                    }
                                }
                                </Field>
                            </div>   

                            <div className="form-group">
                                <div>
                                    <label htmlFor="" className="form-label">Select Gender</label>
                                </div>
                                <Field  name="gender">
                                    {
                                        ({field}:FieldProps) => {
                                            return roptions.map(roption => {
                                                return(
                                                    <div key={roption.key} className="form-check form-check-inline">
                                                        <input type='radio' id={roption.value} {...field} value={roption.value} checked={field.value === roption.value}  className="form-check-input" />
                                                        <label htmlFor={roption.key} className="form-check-label">{roption.value}</label>
                                                    </div>
                                                )
                                            })
                                        }
                                    }
                                </Field>
                                <ErrorMessage component={TextError} name="gender"></ErrorMessage>
                            </div> 

                            <div className="form-group">
                                <div>
                                    <label htmlFor="hobby" className="form-label">Select Hobbies</label>
                                </div>
                                <Field name="hobby" id="hobby">
                                    {
                                        ({field,form}:FieldProps) => {
                                            return hobbies.map(sk => {
                                                return(
                                                    <div key={sk.key} className="form-check form-check-inline">
                                                        <input type='checkbox' {...field} value={sk.value} checked={field.value.includes(sk.value)} 
                                                            className="form-check-input" />
                                                        <label htmlFor={sk.key} className="form-check-label">{sk.value}</label>
                                                    </div>
                                                )
                                            })
                                        }
                                    }
                                </Field> 
                                <ErrorMessage component={TextError} name="hobby"></ErrorMessage>
                            </div> 

                        </Col>
                        <Col sm={6}>
                            <div className='form-group'>
                                <div>
                                    <label htmlFor="Addresses" className="form-label">Addresses</label>
                                </div>
                                <FieldArray name='addresses'>
                                    {fieldArrayProps => {
                                    const { push, remove, form } = fieldArrayProps
                                    const { values } = form
                                    const { addresses } = values
                                    return (
                                        <>
                                        {addresses.map((address:string, index:any) => (
                                            <div key={index}>
                                                <Field as="textarea" name={`addresses[${index}]`} className="form-control" />
                                                {index > 0 && (
                                                    <div>
                                                        <button type='button' onClick={() => remove(index)}>
                                                            &nbsp;-&nbsp;
                                                        </button>
                                                    </div>
                                                )}
                                                {index === 0 && (
                                                    <div>
                                                        <button type='button' onClick={() => push('')}>
                                                            &nbsp;+&nbsp;
                                                        </button>
                                                    </div>
                                                )}
                                                <ErrorMessage component={TextError} name="addresses"></ErrorMessage>
                                            </div>
                                        ))}
                                        </>
                                        )
                                    }}
                                </FieldArray>
                            </div>

                            <div className='form-group'>
                                <div>
                                    <label htmlFor="experience" className="form-label">Experience</label>
                                </div>
                                <FieldArray name='experience'>
                                    {fieldArrayProps => {
                                    const { push, remove, form } = fieldArrayProps
                                    const { values } = form
                                    const { experience } = values
                                    return (
                                        <>
                                        {experience.map((ex:any,index:number) => (
                                            <div key={index}>
                                                <div>
                                                    <label className="form-label">Technology</label>    
                                                </div>
                                                <Field name={`experience[${index}].technology`} className="form-control" placeholder="Technology" />
                                                <div>
                                                    <label className="form-label">Start Date</label>    
                                                </div>
                                                <Field name={`experience[${index}].startdate`} className="form-control">
                                                    {
                                                        ({form, field}:FieldProps) => {
                                                            const { setFieldValue } = form
                                                            const { value } = field
                                                            return(
                                                                <DatePicker 
                                                                    {...field}
                                                                    selected = {value!==null?new Date(Date.parse(value.toString())):null}
                                                                    onChange = {val => setFieldValue(`experience[${index}].startdate`, val)}
                                                                    className="form-control"
                                                                />
                                                            )
                                                        }
                                                    }
                                                </Field>
                                                <div>
                                                    <label className="form-label">End Date</label>    
                                                </div>
                                                <Field name={`experience[${index}].enddate`} className="form-control" placeholder="End Date">
                                                    {
                                                        ({form, field}:FieldProps) => {
                                                            const { setFieldValue } = form
                                                            const { value } = field
                                                            return(
                                                                <DatePicker 
                                                                {...field}
                                                                selected = {value!==null?new Date(Date.parse(value.toString())):null}
                                                                onChange = {val => setFieldValue(`experience[${index}].enddate`, val)}
                                                                className="form-control"
                                                            />
                                                            )
                                                        }
                                                    }
                                                </Field>
                                                {index > 0 && (
                                                    <>
                                                        <button type='button' onClick={() => remove(index)}>
                                                            &nbsp;-&nbsp;
                                                        </button>
                                                    </>
                                                )}
                                                {index === 0 && (
                                                    <>
                                                        <button type='button' onClick={() => push({technology:'',startdate:null,enddate:null})}>
                                                            &nbsp;+&nbsp;
                                                        </button>
                                                    </>
                                                )}
                                                <ErrorMessage component={TextError} name="experience"></ErrorMessage>
                                            </div>
                                        ))}
                                        </>
                                        )
                                    }}
                                </FieldArray>
                            </div>
                                
                            <div className="form-group">
                                <label className="form-label">Profile Picture</label>
                                <div className="wrapper">
                                    <div className="fakeuploadbutton">Change Picture</div>
                                    <input type="file" id="file" name="file" className="form-control" onChange={(e)=>handleFile(e)}/>
                                </div>
                            </div>
                            <div>
                                <img style={{width:"40px",height:"40px"}} src={imgfile!==""?imgfile:props.imgFile}/>
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
        <Button variant="danger" onClick={props.onHide}>Close</Button>
    </Modal.Footer>
    </Modal>
    )
}

export default EditEmployee

