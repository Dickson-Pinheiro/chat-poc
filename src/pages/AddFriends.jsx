import { useState } from "react"
import styled from "styled-components"
import { friendsService } from "../services/friendsService"

export default function AddFriends(){
    const [contactId, setContactId] = useState('')
    const { addFriend } = friendsService()
    const [added, setAdded] = useState(false)

    async function submitForm(e){
        e.preventDefault()
        try {
            await addFriend(contactId)
            setAdded(true)
            setContactId('') 
            console.log("enviado")
        } catch (error) {
            console.log(error);
            console.log('deu errado');
            setAdded(false);
        }
    }

    return(
        <AddFriendsContainer>
            <Header>
                <h1>{localStorage.getItem('name')}</h1>
            </Header>
            <Identity>
                <p>Seu id: </p><span>{localStorage.getItem('id')}</span>
            </Identity>
            <FormAddFriends onSubmit={submitForm}>
                <input type="text" required value={contactId} onChange={(e) => setContactId(e.target.value)}/>
                <button type="submit" >Adicionar</button>
            </FormAddFriends>
            <AlertAdd>
            {added && <p>Adicionado com sucesso</p>}
            </AlertAdd>
        </AddFriendsContainer>
    )
}

const AddFriendsContainer = styled.div`
    min-height: 100vh;
    width: 100%;
`

const Header = styled.div`
    width: 100%;
    height: 40px;
    background-color: #56bd56;
    display: flex;
    align-items: center;
    padding: 10px;
    color: #ffffff;
    h1 {
        font-size: 18px;
        font-weight: 400;
        font-family: 'Rubik', serif;
    }
`

const FormAddFriends = styled.form`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    width: 100%;
    input[type="text"] {
        height: 40px;
        width: 220px;
        height: 40px;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding-left: 10px;
        font-family: 'Rubik', sans-serif;
        background-color: rgb(250, 251, 252);
        font-weight: 200;
    }
    button {
        height: 40px;
        color: #ffffff;
        font-weight: 400;
        padding: 6px;
        font-family: 'Rubik', sans-serif;
        background-color: #0052cc;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: 200ms;
        &:hover {
            background-color: #2066cf;
        }
    }
`

const Identity = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
    justify-content: center;
    align-items: center;
`
const AlertAdd = styled.div`
    p {
        width: 100%;
        text-align: center;
    }
`