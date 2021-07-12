import { Field, Formik, Form, ErrorMessage, FieldProps } from 'formik'
import React, { useEffect, useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import * as yup from 'yup'
import { getLookUpValues } from '../../../Services/lookup.services'
import { operators, RenderType } from '../../../Types/formType'
import TextError from '../../Error/TextError'

const ConditionalRendering:React.FunctionComponent<any> = (props) => {

    const [InitialRender, setInitialRender] = useState<RenderType>()
    const [LookUpValues, setLookUpValues] = useState<string[]>([])
    const [Control, setControl] = useState<string>()

    const initialValues = {
        controlid:InitialRender?.controlid,
        value:InitialRender?.value,
        operator:InitialRender?.operator
    }

    const check = (value:string) => {
        let flag = true
        props.conditionalrenders.map((item:any)=> {
            if(item.condition.dependentcontrolid===value) {
                if(item.condition.controlid===props.controlid) {
                    flag = false
                }
            }
        })
        return flag
    }

    useEffect(() => {
        props.conditionalrenders.map((item:any)=> {
            if(item.condition.dependentcontrolid===props.controlid) {
                setInitialRender({controlid:item.condition.controlid,
                fieldname:item.condition.fieldname,
                value:item.condition.value,
                operator:item.condition.operator,
                dependentfieldname:item.condition.dependentfieldname,  
                dependentcontrolid:item.condition.dependentcontrolid})
            }
        })
    }, [])

    const validationSchema = yup.object({
        controlid: yup.string().required('Field Name is Required'),
        operator:yup.string().required('Operator is Required'),
        value:yup.string().required('Value is Required')
    })

    const lookupvalues = async (id:string) => {
        setLookUpValues(await getLookUpValues(id))
    }

    const handleChange = (e:any) => {
        let flag = 0
        if(e) {
            let index = props.allControls.findIndex(((obj:any) => obj.controlid == e))
            if(index!==-1) {
                if(props.allControls[index].sourceid) {
                    flag=1
                    lookupvalues(props.allControls[index].sourceid)
                }
            }
        }
        if(flag===0) {
            setControl(e.substring(0,e.length-1))
            setLookUpValues([])
        }
    }

    const handleSubmit = (values:any) => {
        props.addControlRender(values)
    }
    
    return (<Modal 
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                {formik=>{return(<Form>
                <div className="container">
                    <div className="row">
                    <div className="form-group col-md-5">
                        <label htmlFor="controlid" className="form-label">Field Name</label>
                        <Field as="select" name="controlid" className="form-control" onChange={(e:any)=>{formik.setFieldValue("controlid",e.target.value)
                           formik.setFieldValue("value","")
                           handleChange(e.target.value)
                        }}>
                            <option value="">Select Field</option>
                            {   
                                props.allControls.map((option:any) => {
                                    return(
                                        <>
                                            {(option.controlid !== props.controlid) && check(option.controlid) && <option key={option.controlid} value={option.controlid}>{option.fieldname}</option>}
                                        </>
                                    )
                                })
                            }
                        </Field>
                        <ErrorMessage component={TextError} name="controlid"></ErrorMessage>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="form-label">Operator</label>
                        <Field as="select" name="operator" className="form-control">
                            <option value="">Select</option>
                            {   
                                operators.map((option:any) => {
                                    return(
                                        <>
                                            <option key={option.key} value={option.key}>{option.value}</option>
                                        </>
                                    )

                                })
                            }
                        </Field>
                        <ErrorMessage component={TextError} name="operator"></ErrorMessage>
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="value" className="form-label">Value</label>
                        {LookUpValues.length!==0? <Field as="select" name="value" className="form-control">
                            <option value="">Select</option>
                            {   
                                LookUpValues.map((option:any) => {
                                    return(
                                        <>
                                            <option key={option} value={option}>{option}</option>
                                        </>
                                    )

                                })
                            }
                        </Field>:Control==="Number"?
                        <Field name="value">
                            {
                                ({field}:FieldProps) => {
                                    return(
                                        <input type='text' {...field} value={formik.values.value} pattern="^-?[0-9]\d*\.?\d*$" onChange={(e:any)=>{
                                            const val = e.target.value
                                            if (e.target.validity.valid) formik.setFieldValue("value",e.target.value)
                                            else if (val === '' || val === '-') formik.setFieldValue("value",val)
                                        }} placeholder="Enter Value" className="form-control"/>      
                                    )
                                }
                            }
                        </Field>:
                        <Field name="value" type="text" placeholder="Enter Value" className="form-control"/>}
                        <ErrorMessage component={TextError} name="value"></ErrorMessage>
                    </div>
                    <div className="form-group col-md-6">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    </div>
                </div>
                </Form>)}}
            </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.hide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default ConditionalRendering
