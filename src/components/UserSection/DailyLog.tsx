import React, { useState } from 'react'
import AddLog from './AddLog'

interface dlprops {
    dldate:string,
    showlog:(showlogdate:string)=>void
}

const DailyLog:React.FunctionComponent<dlprops> = (props) => {

    const [addModalShow, setaddModalShow] = useState<boolean>(false)
    const [show,setShow] = useState<boolean>(false)
    const [currendate, setcurrentdate] = useState<string>("")

    const updateList = () => {
        setaddModalShow(false)
    }

    const handleShow = () => {
        setShow(false)
        props.showlog(new Date(currendate).getDate().toString()+"/0"+(new Date(currendate).getMonth()+1).toString()+"/"+new Date(currendate).getFullYear().toString())
    }
    
    let addModalClose = () => setaddModalShow(false)

    return (
        <>
          {props.dldate===new Date().toDateString()&&(props.dldate.slice(0,3)!=="Sat"&&props.dldate.slice(0,3)!=="Sun")?
              <>
                <button style={{margin:'10px'}} onClick={()=>{setaddModalShow(true)
                    setcurrentdate(props.dldate)
                }}>
                    Add Log
                </button>
                {addModalShow && <AddLog updatelist={updateList} show={addModalShow} onHide={addModalClose} logdate={currendate}/>}

                <button onClick={()=>{
                    props.showlog(new Date().getDate().toString()+"/0"+(new Date().getMonth()+1).toString()+"/"+new Date().getFullYear().toString())
                }}>
                    Show
                </button>
            </>
            :new Date(props.dldate)<=new Date()&&(props.dldate.slice(0,3)!=="Sat"&&props.dldate.slice(0,3)!=="Sun")?
            <>  
                <button style={{margin:'10px'}} onClick={()=>{
                    setShow(true)
                    setcurrentdate(props.dldate)
                    }}>
                        Show
                </button>
                {show && handleShow()}
                </>
            :(props.dldate.slice(0,3)!=="Sat"&&props.dldate.slice(0,3)!=="Sun")?"":"Rest"}  
        </>
    )
}

export default DailyLog
