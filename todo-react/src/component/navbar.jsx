import { NavLink } from "react-router-dom"
import { UserContext } from "../context/users"
import { useContext } from "react"

const style = {backgroundColor: "black", height:"100%"}

export default function Navbar (){

  const {isLoggedin} = useContext(UserContext)

    return <div className="navbar navbar-expand-lg" >
        <div className="container-fluid" style={style}>
          {!isLoggedin?
          <NavLink
          to="/login">
          Login
        </NavLink> 
        : ''}
        <NavLink
          to="/signup">
          Signup
        </NavLink>
        <NavLink
          to="/">
          <img src="../ga_cog.png" alt="fetching..."/>
        </NavLink>
        <NavLink
          to="/create">
          Create Todo
        </NavLink>
        <NavLink
          to="/todos">
          My Todos
        </NavLink>
        <NavLink onClick={()=> sessionStorage.removeItem('token')} to={"/login"}>
          Logout
        </NavLink>
      </div>
    </div>
}