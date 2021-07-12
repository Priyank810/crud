import { FunctionComponent, useState, useEffect } from 'react'
import {Table} from 'react-bootstrap'
import {Button, ButtonToolbar} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import AddTask from './AddTask'
import EditTask from './EditTask'
import { checkLogin } from "../../Services/checkLogin"
import Navigation from "../Navigation/Navigation"
import { get} from "../../Services/GetData"
import { deletedata } from '../../Services/DeleteData'
import { taskinfo } from '../../Types/taskType'
import { getTaskList } from '../../Services/user.services'


const Dashboard:FunctionComponent = () => {

    const [task,setTask] = useState<taskinfo[]>([])
    const [addModalShow, setaddModalShow] = useState<boolean>(false)
    const [editModalShow, seteditModalShow] = useState<boolean>(false)
    const [taskId, setTaskId] = useState<any>()
    const [tasktitle, setTaskTitle] = useState<string>("")
    const [taskDescription, settaskDescription] = useState<string>("")
    const [sd, setsd] = useState<Date>(new Date())
    const [ed, seted] = useState<Date>(new Date())
    const [iscom, setiscom] = useState<boolean>(true) 

    const history = useHistory()

    useEffect(() =>{
        if(checkLogin()) {
            history.push("/")
        }
        else {
            taskList(JSON.parse(localStorage.getItem("data")||'{}').email)
        }
    },[])

    const taskList = async (email:string) => {
        setTask(await getTaskList(email))
    }

    const updateList = () => {
        setaddModalShow(false)
        seteditModalShow(false)
        taskList(JSON.parse(localStorage.getItem("data")||'{}').email)
    }

    const deleteTask = (id:number) => {
        deletedata("task",id).then((result)=>{updateList()},(error)=>alert('Failed'))
    }

    let addModalClose = () => setaddModalShow(false)
    let editModalClose = () => seteditModalShow(false)

    return (
        <div>
            <Navigation/>
            <div style={{marginTop: "20px"}}>
                <strong style={{fontSize:'25px'}}>My Task</strong>
                <Table className="mt-4" striped bordered>
                    <thead>
                        <tr>
                            <th>TaskID</th>
                            <th>TaskTitle</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {task.map(tk=>
                            <tr key={tk.taskid}>
                                <td>{tk.taskid}</td>
                                <td>{tk.tasktitle}</td>
                                <td>{tk.startdate.toString().slice(0,10)}</td>
                                <td>{tk.enddate.toString().slice(0,10)}</td>
                                <td>{tk.iscompleted?"Completed":"Pending"}</td>
                                <td>
                                <ButtonToolbar>
                                    <Button variant='info' onClick={()=>{
                                        seteditModalShow(true) 
                                        setTaskId(tk.taskid)
                                        setTaskTitle(tk.tasktitle)
                                        settaskDescription(tk.taskdescription)
                                        setsd(tk.startdate)
                                        seted(tk.enddate)
                                        setiscom(tk.iscompleted)
                                    }}>
                                        Edit
                                        <EditTask updatelist={updateList} show={editModalShow} onHide={editModalClose} taskid={taskId} tasktitle={tasktitle} taskdescription={taskDescription} sd={sd} ed={ed} isc={iscom}/>
                                    </Button>

                                </ButtonToolbar>
                                </td>
                                <td>
                                    <ButtonToolbar>
                                        <Button variant="danger" onClick={()=>{ if (window.confirm('Are you sure you wish to delete this item?')) deleteTask(tk.taskid)}}>
                                            Delete
                                        </Button>
                                    </ButtonToolbar>
                                </td>
                            </tr>    
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={()=>setaddModalShow(true)}>
                        Add Task
                    </Button>
                    <AddTask updatelist={updateList} show={addModalShow} onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        </div>
    )
}

export default Dashboard
