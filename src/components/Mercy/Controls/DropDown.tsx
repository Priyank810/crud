import { ErrorMessage, Field } from 'formik'
import { ISourceFieldProps } from '../../../Types/formType'
import TextError from '../../Error/TextError'

function DropDown(props:ISourceFieldProps) {
    return (
        <div className="form-group col-md-4">
            <label htmlFor={props.sc.fieldname} className="form-label">{props.sc.label}{ props.sc.isRequired && <span style={{color:'red'}}>&#42;</span>}</label>
            <Field as='select' name={props.sc.fieldname} readOnly={props.sc.isReadOnly} onChange={(e:any)=>{
                const val = e.target.value
                props.setValue(props.sc.fieldname,val)
                props.allcontrols.map((item:any)=>{  
                    if(item.condition.fieldname === props.sc.fieldname) {
                        if(val!==item.value) {
                            props.setValue(item.condition.dependentcontrolid,"")
                        }
                    }
                })
            }} className="form-control">
                {props.source.length!==0?<><option value="">Select {props.sc.label}</option>
                    {
                        props.source.map(option => {
                            return(
                                <option key={option} value={option}>{option}</option>
                            )
                        })
                    }
                    </>:"NO Source Selected"
                }  
            </Field>
            <ErrorMessage component={TextError} name={props.sc.fieldname}></ErrorMessage>
        </div>
    )
}

export default DropDown
