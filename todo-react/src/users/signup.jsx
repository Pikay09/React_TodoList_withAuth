import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Loading from "../component/loading"

export default function Signup (){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)


    const backendUrl = process.env.REACT_APP_BACKEND_URL
    const navi = useNavigate()


    const handleSubmit = async(e) =>{
        e.preventDefault()
        setLoading(true)
        try{
           const response = await axios.post(`${backendUrl}/v1/register`, {username:username ,password:password})
           console.log(response)
           if(response.status === 200){
                alert(`Succesfully Created user: ${username}`)
                setLoading(false)
                navi('/login')
           }
        }catch(e){
            console.log(e)
            alert(`Oops something went wrong.. 
            Please try again`)
            setLoading(false)
            navi('/')
        }

    }

    return <div className="container">
        {loading? <Loading/>: ""}
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} required/>
            </label>
            <label>
                Password
                <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} required/>
            </label>
            <button type="submit">Signup</button>
        </form>
    </div>
}