import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const UserContext = createContext({})

function TodoProvider ({children}){

    const [user, setUser] = useState('')
    const [todos, setTodos] = useState([])
    const [allTodos, setAllTodos] = useState([])
    const [isLoggedin, setIsLoggedin] = useState(null)
    const navi = useNavigate()

    const backendUrl = process.env.REACT_APP_BACKEND_URL

      useEffect(()=>{
        const fetchData = async()=>{
            try{
                const token = await sessionStorage.getItem('token')
                const response = await axios.get(`${backendUrl}/v1/user`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200){
                    setIsLoggedin(true)
                    setUser(response.data)
                }
            }catch(e){
                //console.log(e)
                //navi('/login')

            }
        }
        fetchData()
      }, [navi,user, backendUrl])
    
      useEffect(()=>{
        const fetchTodos = async()=>{
            const token = sessionStorage.getItem("token")
            try{
                const todo = await axios.get(`${backendUrl}/v2/todos`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                   })
                if (todo.status === 200){
                  setTodos(todo.data.todos)  
                }
            }catch(err){
               // console.log(err)
            }
        }
        fetchTodos()
    },[navi,user, backendUrl])

    useEffect(()=>{
        const fetchTodos=async()=>{
            try{
               const res = await axios.get(`${backendUrl}/v2/all/todos`)
               setAllTodos(res.data.todos)
            }catch(err){
                console.log(err)
            }
        }
        fetchTodos()
    },[navi,user, backendUrl])


      const value = {
        user,
        setUser,
        backendUrl,
        todos,
        setTodos,
        isLoggedin,
        allTodos,
        setAllTodos
      }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default TodoProvider