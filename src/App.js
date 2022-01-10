import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ChatRoom from './components/ChatRoom'
import Login from './components/Login'
import AuthProvider from './contexts/AuthProvider'
import './App.css'

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/' component={ChatRoom} />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
