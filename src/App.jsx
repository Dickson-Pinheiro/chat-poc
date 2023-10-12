import { useEffect, useRef, useState } from "react"
import styled from 'styled-components'
import { GlobalStyle } from "./styles/Global"
import { socket } from "./socket"

function App() {
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.connect()
    console.log('Conectou')
    return () => socket.disconnect()
  }, [])

  useEffect(()=> {
    socket.on('receive_message', data => {
      setMessageList(messages => {
        const newMessageList = [...messages, data]
        return newMessageList
      })
    })
    return () => socket.off('receive_message')
  }, [socket])

  function submitMessage(e){
    e.preventDefault()
    if(!messageRef.current.value.trim()) return
    socket.emit('set_message', messageRef.current.value)
    messageRef.current.value = ''
  }

  return (
    <>
      <GlobalStyle />
      <ContainerChat>
        <Header></Header>
        <MessagesContainer>
          {messageList.map((m) => <Message mine={socket.id !== m.authorId} key={m.id}><p>{m.text}</p></Message>)}
        </MessagesContainer>
        <FormSendMessage onSubmit={submitMessage}>
          <input type="text" ref={messageRef} required />
          <button type="submit" >send</button>
        </FormSendMessage>
      </ContainerChat>
    </>
  )
}

export default App

const ContainerChat = styled.div`
  width: 100%;
  height: 100%;
`

const Header = styled.div`
  width: 100%;
  height: 60px;
  background-color: red;
`

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: calc(100vh - 120px);
  padding: 15px;
  overflow-y: auto;
  background-color: blue;
`
const Message = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${props => props.mine ? 'flex-start' : 'flex-end'};
p {
  word-wrap: break-word;
  color: white;
  padding: 8px;
  width: 80%;
  background-color:${props => props.mine ? 'green': 'gray'};
  border-radius: 8px;
}
  

`

const FormSendMessage = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  gap: 20px;
  width: 100%;
  display: flex;
  padding: 15px;
  background-color: black;
  input {
    width: 80%;
    height: 30px;
  }
  button {
    height: 30px;
    width: 40px;
  }

`
