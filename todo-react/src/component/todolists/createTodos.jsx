import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loading from '../loading'

export default function CreateTodos (){
    const navi = useNavigate()

    const todoItem = {title:"", isCompleted:false, description: ""}
    
    const [todo, setTodo] = useState(todoItem)
    const [loading, setLoading] = useState(false)

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const handleChange =(e)=>{
        const newTodoItem = {...todo, [e.target.name]:e.target.value}
        setTodo(newTodoItem)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        navi('/todos')
        const token = sessionStorage.getItem("token")
        try{
           const res = await axios.post(`${backendUrl}/v2/todos`, todo, {
            headers:{
                Authorization: `Bearer ${token}`
            }
           })
           if(res.status === 201){
            setTodo(res.data)
            setLoading(false)
            navi('/todos')
           }
        }catch(err){
            alert(err)
            setLoading(false)
        }
    }

    return <div style={{width: "50vw", margin:"auto", height:"100vh"}}>
        {loading? <Loading/>: ''}
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