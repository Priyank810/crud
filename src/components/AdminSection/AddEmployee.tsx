import React,{ FunctionComponent, useState, useEffect } from 'react'
import {Modal, Button, Row, Col} from 'react-bootstrap'
import TextError from '../Error/TextError'
import { Formik, Form, Field, ErrorMessage, FieldArray, FieldProps} from 'formik'
import * as yup from 'yup'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import { get } from '../../Services/GetData'
import { post } from '../../Services/PostData'
import { obj } from '../../Types/departmentType'
import { empObjadd, experiencedetail, expoptions, hobbies, roptions } from '../../Types/employeeType'


interface addEmpProps {
    show:boolean,
    onHide:()=>void,
    updatelist:()=>void
}

const AddEmployee : FunctionComponent<addEmpProps> = (props) => {

    const [departments,setDeps] = useState<obj[]>([])
    const [er,seter]=useState<string>("")
    const [imgfile, setimgfile] = useState<any>("")
    const [fileerror, setfileerror] = useState<string>("")
    const [isvalid, setisvalid] = useState<boolean>(false)

    const ext = (em:any) : boolean => {

        const parameters = new URLSearchParams({
            em:em
        })
    
        get("employee",parameters).then(
            data => seter(data)
        )
        
        if(checkEmail()) {
            return true
        }
        else {
            return false
        }
    }

    const checkEmail = () => {
        if(er==="Email Already Exist") {
            return true
        }
        return false
    }
    
    const validationSchema = yup.object({
        MailID: yup.string().email('Enter Valid Email').required('Required').test('checkemail','Email alrady exist!',function(value){
            if(ext(value)) {
                return false
            }
            else {
                return true
            }
        }),
        EmployeeName: yup.string().required('Required'),
        Department: yup.string().required('Required'),
        DOJ: yup.date().required('Required').nullable(),
        addresses: yup.array().min(1,"Minimum 1").of(yup.string().trim().required('Required')),
        gender: yup.string().required('Required'),
        exptype: yup.string().required('Required'),
        password: yup.string().required('Required'),
        experience: yup.array().when('exptype',{
            is:"experience",
            then:yup.array().of(yup.object().shape({
            technology: yup.string().required('Required'),
            startdate: yup.date().required('Required').nullable(),
            enddate: yup.date().required('Required').nullable()
        }))})
    })

    var initialValues:empObjadd = {
        EmployeeID:null,
        EmployeeName:'',
        MailID:'',
        Department:'',
        DOJ:null,
        gender:'',
        hobby:[],
        addresses:[''],
        file:"",
        experience:[{technology:'',startdate:null,enddate:null}],
        exptype:'',
        password:''
    }

    useEffect(() => {

        get("department","").then(
            data => setDeps(data)
        )

        setfileerror("")

    },[])

    const handleSubmit = (values: { EmployeeName: any; Department: any; MailID: any; DOJ: any; gender:any; hobby:any; addresses:any; experience:any; password:any;},onSubmitProps: { setSubmitting: (arg0: boolean) => void; resetForm: () => void }) => {

        if(isvalid === true)
        {
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()

            const data = JSON.stringify({
                EmployeeID:null,
                EmployeeName:values.EmployeeName,
                Department:values.Department,
                MailID:values.MailID,
                DOJ:values.DOJ,
                gender:values.gender,
                hobby:values.hobby,
                primaryaddress:values.addresses[0],
                secondaryaddress:values.addresses[1],
                imgFile:imgfile,
                experience:values.experience,
                password:values.password
            })

            post("employee",data).then((result)=>{props.updatelist()},(error)=>alert('Failed'))

        }
        else
        {
            if(fileerror==="")
            {
                setfileerror("Image Required")
            }
        }
    }
    
    const handleFile = (event:React.ChangeEvent<HTMLInputElement>)=>{
          
        const files:any = event.target.files;
        try
        {
            setimgfile("")
            setisvalid(false)
            const file:any = files[0]
            
            if (files.length === 0)
            {
                setfileerror("Image Required")
            }

            if(file.type==="image/jpeg" && files.length!==0)
            {
                setfileerror("")
                const reader = new FileReader();
            
                reader.addEventListener("load", function () {
                    setisvalid(true)
                    setimgfile(reader.result)
                }, false);
                
                if (file) {
                    reader.readAsDataURL(file)
                }   
            }
            else
            {
                setimgfile("")
                setisvalid(false)
                setfileerror("Only Image Allowed")
            }
        }
        catch{
        }
    }

    const hClose = () => {
        setimgfile("")
        setfileerror("")
        setisvalid(false)
        props.onHide()
    }

    return(
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
                                <label htmlFor="password" className="form-label">Password</label>
                                <Field name="password" type="text" placeholder="Enter Password" className="form-control"></Field>
                                <ErrorMessage component={TextError} name="password"></ErrorMessage>
                            </div>

                            <div className="form-group">
                                <label htmlFor="MailID" className="form-label">Email</label>
                                <Field name="MailID" id="MailID" type="text" placeholder="Enter Email" className="form-control"></Field>
                                <ErrorMessage component={TextError} name="MailID"></ErrorMessage>
                            </div>
                            
                            <div className="form-group">
                            <label htmlFor="Department" className="form-label">Select Department</label>
                            <Field as='select' name="Department" id="Department" className="form-control">
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
                                <Field name="DOJ">
                                    {
                                        ({form, field}:FieldProps) => {
                                            const { setFieldValue } = form
                                            const { value } = field
                                            return(
                                                <DatePicker 
                                                    id="dob"
                                                    {...field}
                                                    selected = {value}
                                                    onChange = {val => setFieldValue('DOJ', val)}
                                                    className="form-control"
                                                />
                                            )
                                        }
                                    }
                                </Field>
                                <ErrorMessage component={TextError} name='DOJ'></ErrorMessage>
                            </div>  
                            <div className="form-group">
                                <div>
                                    <label htmlFor="" className="form-label">Select Gender</label>
                                </div>
                                <Field name="gender" id="gender">
                                    {
                                        ({field}:FieldProps) => {
                                            return roptions.map(roption => {
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
                                            {addresses.map((address:any, index:any) => (
                                                <div key={index}>
                                                    <Field as="textarea" name={`addresses[${index}]`} className="form-control" />
                                                    {index > 0 && (
                                                        <>
                                                            <button type='button' onClick={() => remove(index)}>
                                                                &nbsp;-&nbsp;
                                                            </button>
                                                        </>
                                                    )}
                                                    {index === 0 && (
                                                        <>
                                                            <button type='button' onClick={() => push('')}>
                                                                &nbsp;+&nbsp;
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                            <ErrorMessage component={TextError} name="addresses"></ErrorMessage>
                                            </>
                                            )
                                        }}
                                    </FieldArray>
                                </div>
                                
                                <div className="form-group">
                                    <Field name="exptype" id="exp">
                                        {
                                            ({field}:FieldProps) => {
                                                return expoptions.map(expoption => {
                                                    return(
                                                        <div key={expoption.key} className="form-check form-check-inline">
                                                            <input type='radio' id={expoption.value} {...field} value={expoption.value} checked={field.value === expoption.value} className="form-check-input" />
                                                            <label htmlFor={expoption.key} className="form-check-label">{expoption.value}</label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        }
                                    </Field>
                                    <ErrorMessage component={TextError} name="exptype"></ErrorMessage>
                                </div>
                                
                                {formik.values.exptype === "experience"?<div className='form-group'>
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
                                            {experience.map((exp:any, index:any) => (
                                                <div key={index}>
                                                    <div>
                                                        <label className="form-label">Technology</label>    
                                                    </div>
                                                    <Field name={`experience[${index}].technology`} className="form-control" placeholder="Technology" />
                                                    <ErrorMessage component={TextError} name={`experience[${index}].technology`}></ErrorMessage>
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
                                                                         id = {`startdate[${index}]`}
                                                                        {...field}
                                                                        selected = {value}
                                                                        onChange = {val => setFieldValue(`experience[${index}].startdate`, val)}
                                                                        className="form-control"
                                                                    />
                                                                )
                                                            }
                                                        }
                                                    </Field>
                                                    <ErrorMessage component={TextError} name={`experience[${index}].startdate`}></ErrorMessage>
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
                                                                        id={`enddate[${index}]`}
                                                                        {...field}
                                                                        selected = {value}
                                                                        onChange = {val => setFieldValue(`experience[${index}].enddate`, val)}
                                                                        className="form-control"
                                                                    />
                                                                )
                                                            }
                                                        }
                                                    </Field>
                                                    <ErrorMessage component={TextError} name={`experience[${index}].enddate`}></ErrorMessage>
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
                                                </div>
                                            ))}
                                            </>
                                            )
                                        }}
                                    </FieldArray>
                                </div>:null}

                                <div className="form-group">
                                    <label className="form-label">Image</label>
                                    <input type="file" name="file" className="form-control" onChange={(e)=>handleFile(e)}/>
                                    <span style={{color:"red"}}>{fileerror}</span>
                                </div>
                                <div>
                                    <img style={{width:"40px",height:"40px"}} src={imgfile}/>
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
          <Button variant="danger" onClick={hClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AddEmployee



