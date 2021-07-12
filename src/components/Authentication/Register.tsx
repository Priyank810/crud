import React, {useState, useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import { checkLogin } from '../../Services/checkLogin'
import { post } from '../../Services/PostData'


const Register:React.FunctionComponent = () => {

    const [error,setError] = useState<string>() 
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const history = useHistory()

    useEffect(()=>{
        if(!checkLogin()) {
            history.push("/employee")
        }
    },[])

    const submit = async (e: React.SyntheticEvent) => {
        
        e.preventDefault();

        const data = JSON.stringify({
            name,
            email,
            password
        })

        const message = await post("user",data).then(data=>data)

        if(message === "User Added Successfully") {
            history.push("/")
        }

        else if(message === "Email Already Exist") {
            setError(message)
        }
    }

    return (
        <div className="container">
            <h3>Register</h3>
            <form onSubmit={submit}>
                <div className="form-group">
                    <input type="text" name={name} onChange={e=>setName(e.target.value)} className="form-control" placeholder="Enter Name" required/>
                </div>
                <div className="form-group">
                    <input type="email" name={email} onChange={e=>setEmail(e.target.value)} className="form-control" placeholder="Enter email" required/>
                    <p style={{color:"red"}}>{error}</p>
                </div>
                <div className="form-group">
                    <input type="password" name={password} onChange={e=>setPassword(e.target.value)} className="form-control" placeholder="Password" required/>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <div>
            <p className="center"><Link to="/">Login</Link></p>
            </div>
        </div>
    )
}

export default Register
