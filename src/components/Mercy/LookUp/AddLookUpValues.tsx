import { FunctionComponent, useState, useEffect } from 'react'
import {Modal, Button, Row, Col} from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage, FieldArray, FieldProps} from 'formik'
import { addLookUpValues, editLookUpValues, getLookUpValues } from '../../../Services/lookup.services'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import * as yup from 'yup'
import TextError from '../../Error/TextError'

interface addLookupProps {
    show:boolean,
    onHide:()=>void,
    id:number,
    update:()=>void
    name:string
}

type lt = {
    lookupdata:string[]
}

const AddLookUpValues:FunctionComponent<addLookupProps> = (props) => {

    const [lookUpValues, setLookUpValues] = useState<string[]>([])

    const lookupvalues = async () => {
        setLookUpValues(await getLookUpValues(props.id.toString()))
    }

    useEffect(()=>{
        lookupvalues()
    },[])

    const initialValues:lt = {
        lookupdata:lookUpValues.length!==0?lookUpValues:['']
    }

    // const handleChange = (values: {lookupdata:string[];}) => {

    //     console.log(values)

    //     const data = JSON.stringify({
    //         lookupid:props.id,
    //         items:values.lookupdata
    //     })

    //     if(lookUpValues.length!==0){
    //         editLookUpValues(data).then((result)=>{props.update()},(error)=>alert('Failed'))
    //     }
    // }

    const validationSchema = yup.object({
        lookupdata: yup.array().test('','Duplicates Value Found!',function(value){
            if((new Set(value)).size !== value?.length) {
                return false
            }
            else {
                return true
            }
        })
    })

    const handleSubmit = (values: {lookupdata:string[]; },onSubmitProps: { setSubmitting: (arg0: boolean) => void; resetForm: () => void }) => {
        
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()

        const data = JSON.stringify({
            lookupid:props.id,
            items:values.lookupdata
        })

        if(lookUpValues.length!==0){
            editLookUpValues(data).then((result)=>{props.update()},(error)=>alert('Failed'))
        }
        else{
            addLookUpValues(data).then((result)=>{props.onHide()},(error)=>alert('Failed'))
        }
    }

    return (
        <Modal 
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header id="contained-modal-title-vcenter">
            <Modal.Title id="contained-modal-title-vcenter">
                {props.name}&nbsp;Items 
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                    {formik=>{return(<Form>
                    <div className="container">
                        <Row>
                            <Col>
                                <div className='form-group'>
                                    {/* <div>
                                        <label htmlFor="Addresses" className="form-label"></label>
                                    </div> */}
                                    <FieldArray name='lookupdata'>
                                        {fieldArrayProps => {
                                        const { push, remove, form, swap } = fieldArrayProps
                                        const { values } = form
                                        const { lookupdata } = values
                                        return (
                                            <div>
                                                <DragDropContext
                                                   onDragEnd={(param) => {
                                                    const src = param.source.index;
                                                    const des = param.destination?.index;
                                                    if (des || des===0) {
                                                        let temp
                                                        temp = lookupdata[src]
                                                        values.lookupdata.splice(src,1)
                                                        values.lookupdata.splice(des,0,temp)
                                                        setLookUpValues(values.lookupdata)
                                                    }
                                                  }}
                                                >
                                                    <Droppable droppableId="droppable-1">
                                                        {(provided, _) => (
                                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                                        {lookupdata.map((ld:any, index:any) => (
                                                            <>
                                                            {index === 0 && (
                                                                <>
                                                                    <button type='button' style={{marginBottom:'20px'}} onClick={() => push('')}>
                                                                        &nbsp;Add&nbsp;
                                                                    </button>
                                                                </>
                                                            )}
                                                            <Draggable
                                                                key={index}
                                                                draggableId={"draggable-" + index}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => (
                                                                <div ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    style={{
                                                                    ...provided.draggableProps.style,
                                                                    boxShadow: snapshot.isDragging
                                                                        ? "0 0 .4rem #666"
                                                                        : "none"
                                                                }}>
                                                                    <div style={{marginBottom:'10px'}}>
                                                                        <span {...provided.dragHandleProps} style={{marginRight:'10px'}}><i className="fas fa-star"></i></span>
                                                                        <Field name={`lookupdata[${index}]`} style={{marginRight:'10px'}}/>
                                                                        <button type='button' onClick={() => remove(index)}>
                                                                            &nbsp;Remove&nbsp;
                                                                        </button>
                                                                        {/* <ErrorMessage component={TextError} name="lookupdata"></ErrorMessage> */}
                                                                    </div>
                                                                </div>  
                                                                )}
                                                            </Draggable>
                                                            </>
                                                        ))}
                                                        <ErrorMessage component={TextError} name="lookupdata"></ErrorMessage>
                                                        {provided.placeholder}
                                                        </div>
                                                        )}
                                                    </Droppable>
                                                </DragDropContext>
                                            </div>
                                            )
                                        }}
                                    </FieldArray>
                                </div>
                            </Col>
                        </Row>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Submit</button>
                        </div>
                    </div>
                    </Form>)}}
                </Formik>  
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>{props.onHide()}}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AddLookUpValues
