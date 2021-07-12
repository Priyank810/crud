import { FunctionComponent, useEffect, useState } from "react"
import {Button, ButtonToolbar, Table} from 'react-bootstrap'
import { useHistory } from "react-router"
import DailyLog from "./DailyLog"
import { checkLogin } from "../../Services/checkLogin"
import Navigation from "../Navigation/Navigation"
import { get} from "../../Services/GetData"
import { deletedata } from "../../Services/DeleteData"
import { log } from "../../Types/logType"
import { getLogList } from "../../Services/user.services"


const TimeSheet:FunctionComponent = () => {

    const [logs, setlogdata] = useState<log[]>([])
    const [hour,setHour] = useState<number>()
    const [minute, setMinute] = useState<number>()
    const [logdateheading, setlogdateheading] = useState<string>("")
    const [fb, setfb] = useState<number>(1)
    const history = useHistory()

    useEffect(()=>{
        if(checkLogin()){
            history.push("/")
        }
    },[])

    const dateRange = (startDate:string, steps = 1) => {
        
        const dateArray = []
        const yesterday = new Date(startDate)
        yesterday.setDate(yesterday.getDate() - fb).toLocaleString()
        let currentDate = new Date(yesterday)
        let counter = 0

        while (counter < 7) {
            dateArray.push(new Date(currentDate))
            currentDate.setUTCDate(currentDate.getUTCDate() + steps)
            counter++
        }
        
        return dateArray
    }
    
    const dt = dateRange(new Date().toLocaleString())

    const showLog = async (showlogdate:string) => {
        
        const loglist = (await getLogList(showlogdate,JSON.parse(localStorage.getItem("data")||'{}').email))
        
        setlogdata(loglist.gettask)
        setHour(loglist.h)
        setMinute(loglist.m)
        setlogdateheading(showlogdate)
    }

    const deleteLog = (id:number) => {
        deletedata("worklog",id).then((result)=>{showLog(logdateheading)},(error)=>alert('Failed'))
    }

    return (
        <div>
            <Navigation/>
            <div style={{marginTop: "20px"}}>   
                <strong style={{fontSize:'25px'}}>Time Sheet</strong>
                <div style={{float:'right'}}>
                    <button onClick={()=>{
                        setfb(fb+1)}}>
                            &larr;
                    </button>
                    <button onClick={()=>{
                        setfb(fb-1)}}>
                            &rarr;
                    </button>
                </div>
                <Table className="mt-4" striped bordered>
                    <thead>
                        <tr>
                            {dt.map(d=>
                                <th>{d.toDateString()}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {dt.map(d=>
                                <td><DailyLog dldate={d.toDateString()} showlog={showLog}/></td>
                            )}
                        </tr>
                        <tr></tr>
                    </tbody>
                </Table>
            </div>
            <div style={{marginTop: "20px"}}>   
                <strong style={{fontSize:'25px'}}>{logdateheading} Log</strong>
                <div style={{fontSize:'20px'}}><strong>Work Hour:&nbsp;</strong>{hour}&nbsp;{hour?hour>1?"Hours":"Hour":""}&nbsp;{minute}&nbsp;{minute?minute>1?"Minutes":"Minute":""}</div>
                <Table className="mt-4" striped bordered>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Description</th>
                            <th>Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {logs.map(log=>  
                        <tr key={log.logid}>
                            <td>{log.tasktitle}</td>
                            <td>{log.logdescription}</td>
                            <td>{log.loghour}&nbsp;{log.loghour>1?"Hours":"Hour"}&nbsp;{log.logminute}&nbsp;{log.logminute>1?"Minutes":"Minute"}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button variant="danger" onClick={()=>{ if (window.confirm('Are you sure you wish to delete this item?')) deleteLog(log.logid)}}>
                                        Delete
                                    </Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default TimeSheet
