import React, {useState, useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { loginUser } from '../../redux/userlogin/userAction'
import { checkLogin } from '../../Services/checkLogin'

const Login:React.FunctionComponent<any> = ({userData,loginUser}) => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const history = useHistory()

    useEffect(()=>{
        if(checkLogin()) {
            history.push("/")
        }
    },[])

    const submit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        loginUser(email,password)
    }

    return (
        <div className="container">
            <h3>Login</h3>
            <form onSubmit={submit}>
                <div className="form-group">
                    <input type="email" name={email} onChange={e=>setEmail(e.target.value)} className="form-control" placeholder="Enter email" required/>
                </div>
                <div className="form-group">
                    <input type="password" name={password} onChange={e=>setPassword(e.target.value)} className="form-control" placeholder="Password" required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p style={{color:"red"}}>{userData.error}</p>
            <div>
                <p className="center"><Link to="/signup">Register</Link></p>
            </div>
        </div>
    )
}

const mapStateToProps = (state:any) => {
    return {    
        userData : state
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        loginUser : (email:any,password:any) => dispatch(loginUser(email,password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)








// const submit = async (e: React.SyntheticEvent) => {

//     e.preventDefault();

//     var data = new URLSearchParams()
//     data.append('username', email)
//     data.append('password', password)
//     data.append('grant_type', 'password')

//     const response = await fetch('https://localhost:44358/token', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//         body: data.toString()
//     })
//     const result = await response.json()
   
//     if(result.error_description==="Username or password is incorrect")
//     {
//         setError(result.error_description)
//     }
//     else
//     {
//         Login(result)
//     }
// }

// const Login = (result: any) => {
    // localStorage.setItem("user-info",JSON.stringify(result))
    // history.push("/department")
// }