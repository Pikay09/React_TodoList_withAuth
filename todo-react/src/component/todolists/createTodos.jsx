import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CreateTodos (){
    const navi = useNavigate()

    const todoItem = {title:"", isCompleted:false, description: ""}
    
    const [todo, setTodo] = useState(todoItem)

    const backendUrl = "http://localhost:3003/api/v2/todos"

    const handleChange =(e)=>{
        const newTodoItem = {...todo, [e.target.name]:e.target.value}
        setTodo(newTodoItem)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        navi('/todos')
        const token = sessionStorage.getItem("token")
        try{
           const res = await axios.post(backendUrl, todo, {
            headers:{
                Authorization: `Bearer ${token}`
            }
           })
           if(res.statusText === "ok"){
            setTodo(res.data)
            navi('/todos')
           }
        }catch(err){
            console.log(err)
        }
    }

    return <div style={{width: "50vw", margin:"auto"}}>
        <form onSubmit={handleSubmit} className='row g-3 align-items-center'>
            <label className='form-label mb-3'>
                Title
                <input 
                className='form-control col-auto'
                type="text" 
                placeholder="title" 
                onChange={handleChange}
                name='title'
                />
            </label>
            <label className='form-label mb-3'>
                Description
                <input 
                className='form-control col-auto'
                type="text" 
                placeholder="description"
                onChange={handleChange}
                name='description'
                />
            </label>
            <label className='form-label mb-3'>
                Is Completed ?
                <input 
                className=' col-auto'
                type="checkbox" 
                placeholder="isCompleted"
                onClick={()=>setTodo({...todo, isCompleted: !todo.isCompleted})}
                name='isCompleted'
                />
            </label>
            <button type='submit' className='btn btn-primary'>Create</button>
        </form>
    </div>
}