import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/users';
import axios from 'axios';

function ModalComponent (props) {
    const [modal, setModal] = useState(false);
    const [update, setUpdate] = useState(props.iscompleted)
    const {todos, setTodos, user} = useContext(UserContext)
    const backendUrl = process.env.REACT_APP_BACKEND_URL
  
    const toggle = () => setModal(!modal);
  
      useEffect(()=>{
        if(props.iscompleted === "true"){
          setUpdate(false)
        }else{
          setUpdate(true)
        }
      },[props.iscompleted])
      
    const handleDelete = async()=>{
      if(user._id === props.user){
        await axios.delete(`${backendUrl}/v2/todos/${props.id}`)
        toggle()
      }else{
        alert("OOPS can't delete")
      }
    }
  
    const handleUpdate= async()=>{
      setUpdate(!update)
      setTodos(todos)
      // console.log("user",user._id,"props",props.user)
  
      if(user._id === props.user){
        try{
          await axios.patch(`${backendUrl}/v2/todos/${props.id}`, {isCompleted: update})
           .then(data=>console.log(data.data))
         }catch(err){
           console.log(err)
         }
      }else{
        alert("OOPS can't update")
      }
      
    }
    
  
    return (
      <div>
        <Button color="secondary" onClick={toggle}>
          Update
        </Button>
        <Modal isOpen={modal} toggle={toggle} {...props}>
          <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
          <ModalBody>
           {props.description}
          </ModalBody>
          <ModalFooter>
              {props.iscompleted === 'false' ? <Button color="primary" onClick={handleUpdate}>Mark as complete</Button>: 
              <Button color="warning" onClick={handleUpdate}>Continue the work</Button>}
            <Button color="danger" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  export default ModalComponent