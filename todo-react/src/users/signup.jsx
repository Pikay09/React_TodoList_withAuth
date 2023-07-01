import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Signup (){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const backendUrl = `http://localhost:3003/api/v1/register`
    const navi = useNavigate()


    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
           const response = await axios.post(backendUrl, {username:username ,password:password})
           console.log(response)
           if(response.status === 200){
                alert(`Succesfully Created user: ${username}`)
                navi('/login')
           }
        }catch(e){
            console.log(e)
            alert(`Oops something went wrong.. 
            Please try again`)
            navi('/')
        }

    }

    return <div>
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