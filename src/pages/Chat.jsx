import styled from 'styled-components'
import { socket } from "../socket"
import { LiaTelegramPlane } from 'react-icons/lia'
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '../hooks/useQuery';
import { useParams } from 'react-router-dom';

export default function Chat() {
    const messageRef = useRef(null);
    const chatRef = useRef(null);
    const [messageList, setMessageList] = useState([]);
    const query = useQuery()
    const {id} = useParams()

    const handleScroll = (ref) => {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    };

  useEffect(() => {
    socket.auth = {
      token: `Bearer ${localStorage.getItem('token')}`
  }
    socket.connect()
    socket.emit('request_messages', id)
    socket.on('load_messages', (data) => {
        setMessageList(messages => {
            const newMessageList = [...data]
            return newMessageList
          })
    })
    return () => {
        socket.disconnect()
        socket.off('load_messages')
    }
  }, [])

  useEffect(()=> {
    socket.on('receive_message', data => {
        if((data.from === id && data.to === localStorage.getItem('id')) || (data.from === localStorage.getItem('id') && id)){
            setMessageList(messages => {
                const newMessageList = [...messages, data]
                return newMessageList
              })
        }
    })
    return () => socket.off('receive_message')
  }, [socket])

  useEffect(() => {
    handleScroll()
  }, [messageList])

  function submitMessage(e){
    e.preventDefault()
    if(!messageRef.current.value.trim()) return
    const refCopy = JSON.parse(JSON.stringify(messageRef.current.value))
    socket.emit('set_message', {text: messageRef.current.value, to: id})
    setMessageList(m => [...m, {from: localStorage.getItem('id'), to: id, text: refCopy, id: Date.now().toString()}])
    messageRef.current.value = ''
  }

    return (
        <>
            <ContainerChat >
                <Header><p>{query.get('name')}</p></Header>
                <MessagesContainer ref={chatRef}>
                    {messageList.map((m) => <Message mine={localStorage.getItem('id') !== m.from.toString()} key={m.id}><p>{m.text}</p></Message>)}
                </MessagesContainer>
                <FormSendMessage onSubmit={submitMessage}>
                    <input type="text" ref={messageRef} required />
                    <button type="submit" ><LiaTelegramPlane color='#ffffff' size={24}/></button>
                </FormSendMessage>
            </ContainerChat>
        </>
    )
}

const ContainerChat = styled.div`
  width: 100%;
  height: 100%;
`

const Header = styled.div`
  width: 100%;
  height: 60px;
  background-color: #56bd56;
  display: flex;
  align-items: center;
  padding: 10px;
  p {
    color: #ffffff;
    font-family: 'Lora', serif;
  }
`

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: calc(100vh - 120px);
  padding: 15px;
  overflow-y: auto;
`
const Message = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${props => props.mine ? 'flex-start' : 'flex-end'};
p {
  word-wrap: break-word;
  color: white;
  padding: 8px;
  max-width: 220px;
  width: fit-content;
  background-color:${props => props.mine ? 'green': 'gray'};
  border-radius: 8px;
}
`

const FormSendMessage = styled.form`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  gap: 10px;
  width: 100%;
  display: flex;
  padding: 15px;
  input {
    width: 80%;
    height: 30px;
    border-radius: 12px;
    padding-left: 6px;
    border: 1px solid #56bd56;
  }
  button {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #56bd56;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`