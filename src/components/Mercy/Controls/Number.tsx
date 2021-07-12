import { ErrorMessage, Field, FieldProps } from 'formik'
import { IFieldProps } from '../../../Types/formType'
import TextError from '../../Error/TextError'

function Number(props:IFieldProps) {
    return (
        <div className="col-md-4">
           <label>
                {props.sc.label}
                { props.sc.isRequired && <span style={{color:'red'}}>&#42;</span>}
            </label>
            <Field name={props.sc.fieldname}>
                {
                    ({field}:FieldProps) => {
                        return(
                            <input type='text' {...field} value={field.value} pattern="^-?[0-9]\d*\.?\d*$" onChange={(e:any)=>{
                                const val = e.target.value
                                if (e.target.validity.valid) props.setValue(props.sc.fieldname,e.target.value)
                                else if (val === '' || val === '-') props.setValue(props.sc.fieldname,val)
                                props.allcontrols.map((item:any)=>{  
                                    if(item.condition.fieldname === props.sc.fieldname) {
                                        if(val!==item.value) {
                                            props.setValue(item.condition.dependentcontrolid,"")
                                        }
                                    }
                                })
                            }} placeholder={props.sc.label} readOnly={props.sc.isReadOnly} className="form-control"/>      
                        )
                    }
                }
                </Field>
                <ErrorMessage component={TextError} name={props.sc.fieldname}></ErrorMessage> 
        </div>
    )
}

export default Number
