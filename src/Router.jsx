import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Chat from './pages/Chat'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Contacts from './pages/Contacts'
import AddFriends from './pages/AddFriends'

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/chat/:id' element={<Chat />} />
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/contacts' element={<Contacts />} />
                <Route path='/add' element={<AddFriends />} />
            </Routes>
        </BrowserRouter>
    )
}