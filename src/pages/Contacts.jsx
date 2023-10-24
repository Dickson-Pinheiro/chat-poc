import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import {MdOutlinePersonAdd} from 'react-icons/md'
import { userService } from "../services/userService"

export default function Contacts(){
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const { getUsers } = userService()

    useEffect(() => {
        async function findUsers(){
            const result = await getUsers()
            setUsers(result.data);
        }
        findUsers()
    }, [])

    function openChat(id, name){
        navigate(`/chat/${id}?name=${name}`)
    }

    return(
        <ContainerContacts>
            <Header><MdOutlinePersonAdd color="#ffffff" size={24} onClick={() => navigate('/add')}/></Header>
            <ListContacts>
                {users.map(user => <Contact onClick={() => openChat(user?.id, user?.name)} key={user?.id}><p>{user?.name}</p></Contact>)}
            </ListContacts>
        </ContainerContacts>
    )
}

const ContainerContacts = styled.div`
    width: 100%;
`

const Header = styled.div`
    width: 100%;
    height: 40px;
    background-color: #56bd56;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
`

const ListContacts = styled.div`
    width: 100%;
    height: calc(100vh - 40px);
    overflow-y: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Contact = styled.div`
    width: 100%;
    height: 40px;
    min-height: 40px;
    border-bottom: 1px solid #56bd56;
    display: flex;
    align-items: center;
    p {
        font-family: 'Lora', serif;
        color: #2b342b;
        font-size: 14px;
        font-weight: 700;
        margin-left: 6px;
    }
`