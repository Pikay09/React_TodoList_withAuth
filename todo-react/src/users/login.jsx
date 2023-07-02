import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Loading from "../component/loading"

export default function Login (){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    // const [user, setUser] = useState(null)

    const backendUrl = process.env.REACT_APP_BACKEND_URL
    const navi = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        setLoading(true)

        try{
            const response = await axios.post(`${backendUrl}/v1/login`, {username, password})

            if(response.status === 200){
                console.log(response.data.token)
                const token = response.data.token
                sessionStorage.setItem('token', token )
                alert(`Succesfully Logged is as: ${username}!`)
                setLoading(false)
                navi('/secured')
                
            }

        }catch(e){
            console.log(e)
            alert('Wrong Username or Password')
            setLoading(false)
            navi('/login')
        }
    }

    return <div className="container">
        {loading? <Loading/>: ""}
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
            </label>
            <label>
                Password
                <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            <button type="submit">Login</button>
        </form>
    </div>
}