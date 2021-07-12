import React, { useState } from 'react'
import { conditionValue, ControlCounterType, ControlDetailType, controlValue} from '../../../Types/formType'
import Navigation from '../../Navigation/Navigation'
import DataSource from './DataSource'
import PreviewForm from './PreviewForm'

const FormControls:React.FunctionComponent = () => {

    const [SelectedControl, setSelectedControl] = useState<ControlDetailType[]>([])
    const [CurrentControl,setCurrentControl] = useState<ControlDetailType>(controlValue)
    const [ShowSelectSource,setShowSelectSource] = useState<boolean>(false)
    const [ShowPreview,setShowPreview] = useState<boolean>(false)
    const [ControlCounter, setControlCounter] = useState<ControlCounterType[]>([])

    const addControls = (value:string) => {
        let index =  ControlCounter.findIndex((obj => obj.name == value))
        let i = 0
        if(index!==-1) {
            i = ControlCounter[index].count+1
            ControlCounter[index].count=i
            setControlCounter(ControlCounter)
        }
        else {
            setControlCounter([...ControlCounter,{name:value,count:0}])
        }
        let id = value+i.toString()
        let iValue:string|[] = value==="CheckBox"?[]:""
        setSelectedControl([...SelectedControl,{sourceid:"",label:id,controlid:id,fieldname:id,controlname:value,isRequired:false,iValue:iValue,isReadOnly:false,multipleSelect:false,condition:conditionValue}])
    }

    const deleteControl = (id:string) => {
        if(id===CurrentControl.controlid) {
            setShowSelectSource(false)
        }
        SelectedControl.map((item,ix)=> {
            if(item.condition.controlid === id) {
                SelectedControl[ix].condition=conditionValue
            }
        })
        setSelectedControl(SelectedControl.filter((item) => item.controlid !== id))
    }

    const checkFieldName = (controlid:string,value:string) => {
        let flag = false
        SelectedControl.map((item) => {
            if(item.controlid!==controlid && !flag) {
                if(value===item.fieldname) {
                    flag=true
                }
                else {
                    flag=false
                }
            }
        })
        return flag
    }

    const addRenderValues = (values:any,controlid:string,fieldname:string) => {
        let index = SelectedControl.findIndex((obj => obj.controlid === controlid))
        SelectedControl[index].condition.controlid = values.controlid
        SelectedControl[index].condition.value = values.value
        SelectedControl[index].condition.operator = values.operator
        SelectedControl[index].condition.dependentfieldname = fieldname
        SelectedControl[index].condition.dependentcontrolid = controlid
        setSelectedControl(SelectedControl)
    }

    const submit = (values:any,id:string) => {
        let index = SelectedControl.findIndex((obj => obj.controlid === id))
        SelectedControl[index].fieldname=values.fieldname
        SelectedControl[index].sourceid=values.source
        SelectedControl[index].label=values.label
        SelectedControl[index].isRequired=values.required
        SelectedControl[index].isReadOnly=values.readonly
        SelectedControl[index].multipleSelect=values.multipleselect
        SelectedControl[index].condition.dependentfieldname = values.fieldname
        values.multipleselect?SelectedControl[index].iValue=[]:SelectedControl[index].iValue=""
        SelectedControl.map((item,ix)=> {
            if(item.condition.controlid) {
                let i = SelectedControl.findIndex((obj => obj.controlid == item.condition.controlid))
                SelectedControl[ix].condition.fieldname = SelectedControl[i].fieldname
            }
        })
        setSelectedControl(SelectedControl)
        setShowSelectSource(false)
    }

    const hide = () => {
        setShowPreview(false)
        setShowSelectSource(false)
    }

    return (
        <div>
            <Navigation/>
            <div style={{margin:'10px'}}>
            {!ShowPreview &&<>
            <div style={{marginTop:'20px'}}>
                <strong style={{fontSize:'30px'}}>Mercy</strong>
                <span style={{marginLeft:'90%'}} onClick={()=>setShowPreview(true)}><img style={{width:'30px',height:'30px',cursor:'pointer'}} src="../eye.png"/></span>
            </div>
            <div className="row" style={{marginTop:'20px'}}>
                <div className="col-md-2">
                    <div>
                        <div style={{marginBottom:'20px',fontSize:'25px'}}><strong>Controls</strong></div>
                        <hr style={{border:'1px solid black', marginTop:'10px'}}/>
                        <div className="row">
                            <div className="col-md-6">
                                <div onDoubleClick={()=>addControls("DropDown")} style={{cursor:'pointer',marginBottom:'20px'}}>
                                    <img style={{width:'60px',height:'60px'}} src="../dropdown.png"/>
                                    <div>DropDown</div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div onDoubleClick={()=>addControls("RadioButton")} style={{cursor:'pointer'}}>
                                    <img style={{width:'60px',height:'60px'}} src="../radiobutton.png"/>
                                    <div>RadioButton</div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div onDoubleClick={()=>addControls("CheckBox")} style={{cursor:'pointer'}}>
                                    <img style={{width:'60px',height:'60px'}} src="../checkbox.png"/>
                                    <div>CheckBox</div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div onDoubleClick={()=>addControls("TextBox")} style={{cursor:'pointer'}}>
                                    <img style={{width:'60px',height:'60px'}} src="../textbox.png"/>
                                    <div>TextBox</div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div onDoubleClick={()=>addControls("Email")} style={{cursor:'pointer'}}>
                                    <img style={{width:'60px',height:'60px'}} src="../email.png"/>
                                    <div>Email</div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div onDoubleClick={()=>addControls("Number")} style={{cursor:'pointer'}}>
                                    <img style={{width:'60px',height:'60px'}} src="../number.png"/>
                                    <div>Number</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-6">
                    <div>
                        <div style={{marginBottom:'20px',fontSize:'25px'}}><strong>Selected Controls</strong></div>
                        <hr style={{border:'1px solid black', marginTop:'10px'}}/>
                        <div className="row">
                        {
                            SelectedControl?SelectedControl.map((sc) => {
                                return (
                                    <div key={sc.controlid} className="col-md-4" style={{marginBottom:'20px'}}>
                                        <div style={{marginBottom:'10px'}}>{sc.label?sc.label:sc.controlname}</div>
                                        <span style={{cursor:'pointer'}} onClick={()=>{
                                                setCurrentControl(sc)
                                                setShowSelectSource(true)
                                            }
                                        }><img style={{width:'60px',height:'60px'}} src={`../${sc.controlname.toLowerCase()}.png`}/></span>
                                         &nbsp; <button onClick={()=>{deleteControl(sc.controlid)}}>Delete</button>
                                    </div>
                                )
                            }):null
                        }
                        </div>
                    </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-2">
                    <div>
                        <div style={{marginBottom:'20px',fontSize:'25px'}}><strong>Properties</strong></div>
                        <hr style={{border:'1px solid black', marginTop:'10px'}}/>
                        {ShowSelectSource && <DataSource addRenderValues={addRenderValues} checkFieldName={checkFieldName} submit={submit} hide={hide} data={CurrentControl} allControls={SelectedControl}/>}
                    </div>
                </div>
            </div></>}
            {ShowPreview &&<PreviewForm SelectedControls={SelectedControl} hide={hide}/>}
            </div>
        </div>
    )
}

export default FormControls
