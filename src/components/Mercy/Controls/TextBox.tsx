import { ErrorMessage, Field } from 'formik'
import { IFieldProps } from '../../../Types/formType'
import TextError from '../../Error/TextError'

function TextBox(props:IFieldProps) {
    return (
        <div className="col-md-4">
          <label>
                {props.sc.label}
                { props.sc.isRequired && <span style={{color:'red'}}>&#42;</span>}
            </label>
            <div className="form-group">
                <Field name={props.sc.fieldname}onChange={(e:any)=>{
                    const val = e.target.value
                    props.setValue(props.sc.fieldname,e.target.value)
                    props.allcontrols.map((item:any)=>{  
                        if(item.condition.fieldname === props.sc.fieldname) {
                            if(val!==item.value) {
                                console.log(item.condition.dependentcontrolid)
                                props.setValue(item.condition.dependentcontrolid,"")
                            }
                        }
                    })
                }} type="text" placeholder={props.sc.label} readOnly={props.sc.isReadOnly} className="form-control"/>
                <ErrorMessage component={TextError} name={props.sc.fieldname}></ErrorMessage>
            </div>  
        </div>
    )
}

export default TextBox
