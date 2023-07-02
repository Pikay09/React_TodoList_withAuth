
import { useContext } from "react"
import { UserContext } from "../../context/users"
import Cards from "./cards"

export default function Todos (){
    const {todos} = useContext(UserContext)

    return <div className="container">
        <h1>Here is my Todos</h1>
        <div className="row justify-content-around gap-5 p-3">
            {todos? todos.map((todo)=>{
                    const date = new Date(todo.updatedAt)
                    return <Cards
                        key={todo._id}
                        title={todo.title}
                        id={todo._id}
                        iscompleted={todo.isCompleted.toString()}
                        description={todo.description}
                        updated={date.getDate()}
                        user_id={todo.user}
                        />
                }): <h1>fetching...</h1>}
        </div>
    </div>
}