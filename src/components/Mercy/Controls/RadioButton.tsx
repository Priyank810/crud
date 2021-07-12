import { ErrorMessage, Field, FieldProps } from 'formik'
import { ISourceFieldProps } from '../../../Types/formType'
import TextError from '../../Error/TextError'

function RadioButton(props:ISourceFieldProps) {
    return (
        <div className="col-md-4">
            <label>
                {props.sc.label}
                {props.sc.isRequired && <span style={{color:'red'}}>&#42;</span>}
            </label>
                <div> 
                <Field name={props.sc.fieldname} >
                {
                    ({field}:FieldProps) => {
                        return props.source.length!==0?props.source.map(roption => {
                            return(
                                <div key={roption} className="form-check form-check-inline">
                                    <input type='radio' {...field} value={roption} checked={field.value === roption} onChange={(e:any)=>{
                                        const val = e.target.value
                                        props.setValue(props.sc.fieldname,val)
                                        props.allcontrols.map((item:any)=>{  
                                            if(item.condition.fieldname === props.sc.fieldname) {
                                                if(val!==item.value) {
                                                    props.setValue(item.condition.dependentcontrolid,"")
                                                }
                                            }
                                        })
                                    }} readOnly={props.sc.isReadOnly} className="form-check-input" />
                                    <label htmlFor={roption} className="form-check-label">{roption}</label>
                                </div>
                            )
                        }):"No Source Selected"
                    }
                }
                </Field>
                <ErrorMessage component={TextError} name={props.sc.fieldname}></ErrorMessage>
            </div>
        </div>
    )
}

export default RadioButton
