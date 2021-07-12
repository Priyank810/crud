import { ErrorMessage, Field, FieldProps } from 'formik'
import { ISourceFieldProps } from '../../../Types/formType'
import TextError from '../../Error/TextError'

function CheckBox(props:ISourceFieldProps) {
    return (
        <div className="col-md-4">
          <label>
                {props.sc.label}
                { props.sc.isRequired && <span style={{color:'red'}}>&#42;</span>}
            </label>
            <div>
                <Field name={props.sc.fieldname}>
                    {
                        ({field,form}:FieldProps) => {
                            return props.source.length!==0?props.source.map(sk => {
                                return(
                                    <div key={sk} className="form-check form-check-inline">
                                        <input type='checkbox' {...field} value={sk} 
                                            readOnly={props.sc.isReadOnly} className="form-check-input" />
                                        <label htmlFor={sk} className="form-check-label">{sk}</label>
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

export default CheckBox
