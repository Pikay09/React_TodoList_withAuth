import {Card, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap'
import ModalComponent from './modal'
import { UserContext } from '../../context/users'
import { useContext } from 'react'

export default function Cards ({title, description, iscompleted, updated, id}){
    const {isLoggedin} = useContext(UserContext)

    const theme = iscompleted === "false"? 'cardone': 'cardtwo'

    return <div className={`col ${theme}`} >
        <Card style={{width: '18rem', background:"#e8e8a4"}}>
        <CardBody>
            <CardTitle tag="h5">
            {title}
            </CardTitle>
            <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
            >
            Created: {updated}
            </CardSubtitle>
            <CardText>
            {description}
            </CardText>
            <CardText>
            {iscompleted === "false"? "Status: in progress": "Status: Completed"}
            </CardText>
            {isLoggedin? <ModalComponent
            title={title}
            description={description}
            iscompleted={iscompleted}
            id={id}
            />: ""}
            
        </CardBody>
        </Card>
    </div>
}