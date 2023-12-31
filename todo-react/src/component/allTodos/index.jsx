import { UserContext } from "../../context/users"
import { useContext } from "react"
import Cards from "../todolists/cards"
import FethingComp from "../loading/fetchingGrow"

function AllNotes (){

    const {allTodos} = useContext(UserContext)

    const TodoComp =()=>{
        return <div className="container">
        <h1>All Notes</h1>
            <div className="row justify-content-around gap-5 p-3">
                {allTodos? allTodos.map((todo)=>{
                        const date = new Date(todo.updatedAt)
                        return <Cards
                            key={todo._id}
                            title={todo.title}
                            id={todo._id}
                            iscompleted={todo.isCompleted.toString()}
                            description={todo.description}
                            updated={date}
                            user_id={todo.user}
                            />
                    }): <h1>fetching...</h1>}
            </div>
        </div>
    }

    return <div>
        {allTodos !== null ? <TodoComp/> : <FethingComp/>}
    </div>

    
}

export default AllNotes