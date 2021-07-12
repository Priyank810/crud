import Control from './Control'
import { Formik, Form} from 'formik'
import * as yup from 'yup'
import { createYupSchema } from '../../../Services/validation.services'
import { IPreviewFormProps } from '../../../Types/formType'

const PreviewForm = (props:IPreviewFormProps) => {

    const schema = props.SelectedControls.reduce(createYupSchema, {})
    const validateSchema = yup.object().shape(schema)

    const initialValues = () => {
        let obj:any = {}
        props.SelectedControls.map((item) => {
            obj[item.fieldname] = item.iValue
        })
        return obj
    }

    const handleSubmit = (values:any) => {
        alert(JSON.stringify(values))
    }
    
    return (
        <div style={{marginLeft:'10px'}}>
            <div style={{marginTop:'20px'}}>
                 <strong style={{fontSize:'30px'}}>Preview</strong>
            </div>
            <div>
                {props.SelectedControls.length!==0?<Formik initialValues={initialValues()} validationSchema={validateSchema} onSubmit={handleSubmit} enableReinitialize>
                    {formik=>{return(<Form>
                    <div className="row">
                        {
                            props.SelectedControls.map((sc) => {
                                return(
                                    <>
                                        <Control sc={sc} setFieldValue={formik.setFieldValue} fieldValue={formik.values} selected={props.SelectedControls}/>
                                    </>

                                )
                            })
                        }
                    </div>
                    <div style={{marginTop:'20px'}}>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Submit</button>
                            <button style={{marginLeft:'20px'}} className="btn btn-danger" onClick={props.hide}>Close</button>
                        </div>
                    </div>
                    </Form>)}}
                </Formik>:<>
                <strong>No Form Created</strong>
                <div>
                    <button style={{marginTop:'20px'}} className="btn btn-danger" onClick={props.hide}>Close</button>
                </div>
                </>}
            </div>
        </div>
    )
}

export default PreviewForm


