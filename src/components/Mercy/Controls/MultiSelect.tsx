import { ErrorMessage, Field } from 'formik'
import { ISourceFieldProps } from '../../../Types/formType'
import TextError from '../../Error/TextError'

function MultiSelect(props:ISourceFieldProps) {
    return (
        <div className="form-group col-md-4">
            <label htmlFor={props.sc.fieldname} className="form-label">{props.sc.label}{ props.sc.isRequired && <span style={{color:'red'}}>&#42;</span>}</label>
            <Field as='select' name={props.sc.fieldname} readOnly={props.sc.isReadOnly} className="form-control" multiple>
            {props.source.length!==0?<>
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

export default MultiSelect
