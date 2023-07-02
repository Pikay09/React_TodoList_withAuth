import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/users"

export default function SecuredPage (){
    
    const {user} = useContext(UserContext)

    const navi = useNavigate()
    const logout = ()=>{
        sessionStorage.removeItem('token')
        navi("/login")
      }
    
    return <div className="container">
        <button onClick={logout}>logout</button>
        <h1>This is authenticated page safe to use</h1>

        <h1>user is: {user.username} </h1>

        {/* <button onClick={fetchData}>Fetch User Details</button> */}
    </div>
}