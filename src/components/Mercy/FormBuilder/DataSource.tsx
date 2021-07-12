import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, FieldProps, ErrorMessage} from 'formik'
import { getLookUps } from '../../../Services/lookup.services'
import { IDataSourceProps, LookupType } from '../../../Types/formType'
import * as yup from 'yup'
import TextError from '../../Error/TextError'
import ConditionalRendering from './ConditionalRendering'

const SelectSource:React.FunctionComponent<IDataSourceProps> = (props) => {

    const [Lookup, setLookup] = useState<LookupType>([])
    const [ShowConditionalRendering, setShowConditionalRendering] = useState<boolean>(false)

    const getActiveLookups = async () => {
        setLookup(await getLookUps("true"))
    }

    const addCondition = (values:any) => {
        props.addRenderValues(values,props.data.controlid,props.data.fieldname)
        setShowConditionalRendering(false)
    }

    const initialValues = {
        fieldname:props.data.fieldname?props.data.fieldname:"",
        label:props.data.label?props.data.label:"",
        source:props.data.sourceid?parseInt(props.data.sourceid):null,
        required:props.data.isRequired,
        readonly:props.data.isReadOnly
    }

    const handleSubmit = (values:any) => {
        props.submit(values,props.data.controlid?props.data.controlid:"")
    }

    const validationSchema = yup.object({
        fieldname: yup.string().test('','Name Already Exist!',function(value){
            return !props.checkFieldName(props.data.controlid,value)
        })
    })

    const hide = () => {
        setShowConditionalRendering(false)
    }

    useEffect(()=>{
        getActiveLookups()
    },[])

    return (
        <div>
            {/* <strong>{props.data.controlid.toUpperCase()}</strong> */}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                {formik=>{return(<Form>
                <div className="container">
                    <div className="form-group">
                        <label htmlFor="fieldname" className="form-label">Name</label>
                        <Field name="fieldname" type="text" placeholder="Enter FieldName" className="form-control"></Field>
                        <ErrorMessage component={TextError} name="fieldname"></ErrorMessage>
                    </div>
                    <div className="form-group">
                        <label htmlFor="label" className="form-label">Label</label>
                        <Field name="label" type="text" placeholder="Enter Label" className="form-control"></Field>
                        <ErrorMessage name="label"></ErrorMessage>
                    </div>
                    {props.data.controlname!=="TextBox" && props.data.controlname!=="Number" && props.data.controlname!=="Email" && <div className="form-group">
                        <label htmlFor="source" className="form-label">Data Source</label>
                        <Field as="select"  name="source" id="source" className="form-control">
                            <option>Select Source</option>
                            {   
                                Lookup.map((option) => {
                                    return(
                                        <option key={option.id} value={option.id}>{option.name}</option>
                                    )
                                })
                            }
                        </Field>
                        <ErrorMessage name="source"></ErrorMessage>
                    </div>}
                    <div className="form-group">
                        <Field name="required">
                            {
                                ({field,form}:FieldProps) => {
                                    return(
                                        <div className="form-check">
                                            <input type='checkbox' {...field}  checked={field.value} 
                                                className="form-check-input" />
                                            <label htmlFor="required" className="form-label">Require</label>
                                        </div>
                                    )
                                }
                            }
                        </Field>
                        <ErrorMessage name="required"></ErrorMessage>
                    </div>
                    {(props.data.controlname==="TextBox" || props.data.controlname==="Number" || props.data.controlname==="Email") && <div className="form-group">
                        <Field name="readonly">
                            {
                                ({field,form}:FieldProps) => {
                                    return(
                                        <div className="form-check">
                                            <input type='checkbox' {...field}  checked={field.value} 
                                                className="form-check-input" />
                                            <label htmlFor="readonly" className="form-label">ReadOnly</label>
                                        </div>
                                    )
                                }
                            }
                        </Field>
                        <ErrorMessage name="readonly"></ErrorMessage>
                    </div>}
                    {(props.data.controlname==="DropDown") && <div className="form-group">
                        <Field name="multipleselect">
                            {
                                ({field,form}:FieldProps) => {
                                    return(
                                        <div className="form-check">
                                            <input type='checkbox' {...field}  checked={field.value} 
                                                className="form-check-input" />
                                            <label htmlFor="multipleselect" className="form-label">Multiple Select</label>
                                        </div>
                                    )
                                }
                            }
                        </Field>
                        <ErrorMessage name="readonly"></ErrorMessage>
                    </div>}

                    <div className="form-group">
                        <span className="btn btn-dark" onClick={()=>setShowConditionalRendering(true)}>Conditional Rendering</span>
                    </div>
                    
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Submit</button>
                        <button  className="btn btn-danger" onClick={props.hide} style={{marginLeft:'10px'}}>Close</button>
                    </div>
                </div>
                </Form>)}}
            </Formik> 
            {ShowConditionalRendering && <ConditionalRendering conditionalrenders={props.allControls} addControlRender={addCondition} show={ShowConditionalRendering} controlid={props.data.controlid} allControls={props.allControls} hide={hide}/>}
        </div>
    )
}

export default SelectSource
