import styled from "styled-components";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const {login} = authService()

    async function loginSubmit(e){
        e.preventDefault()
        try {
            const result = await login(email, password);
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('name', result.data.name);
            localStorage.setItem('id', result.data.id);
            setEmail('')
            setPassword('')
            navigate('/contacts')
        } catch (error) {
            console.log(error)
        }
    }   
    return(
        <ContainerLogin>
            <Container>
                <h1>Chat</h1>
            <Form onSubmit={loginSubmit}>
                <p>Entre para continuar</p>
                <ContainerInput>
                    <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Insira o seu e-mail'/>
                </ContainerInput>
                <ContainerInput>
                    <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Insira a sua senha'/>
                </ContainerInput>
                <button type='submit'>Continuar</button>
            </Form>
            <ContainerSignupLink>
                <p>Ainda não possui uma conta? <Link to="/signup">Cadastre-se aqui</Link></p>
            </ContainerSignupLink>
            </Container>
        </ContainerLogin>
    )
}

const ContainerLogin = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 200px;
    background-color: rgb(250, 251, 252);
`

const ContainerSignupLink = styled.div`
    margin-top: 20px;
    p {
        font-family: 'Rubik', sans-serif;
        font-size: 14px;
        a {
            color: #0052cc;
        }
    }
`

const Container = styled.div`
    min-height: calc(100vh - 100px);
    margin: 50px 0;
    width: 400px;
    padding: 32px 40px 32px 40px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
    background-color: #ffffff;
    box-sizing: border-box;
    h1 {
        font-size: 30px;
        font-family: 'Rubik', sans-serif;
        font-weight: 600;
        cursor: pointer;
        text-align: center;
        padding: 10px;
    }
`

const ContainerInput = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    padding: 4px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    width: 100%;
    gap: 5px;

    p {
        font-family: 'Rubik', sans-serif;
        color: rgb(23, 43, 77);
        font-weight: 600;
        margin-bottom: 10px;
    }

    input {
        width: 100%;
        height: 40px;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding-left: 10px;
        font-family: 'Rubik', sans-serif;
        background-color: rgb(250, 251, 252);
        font-weight: 200;
    }

    button {
        width: 100%;
        height: 40px;
        color: #ffffff;
        font-weight: 400;
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