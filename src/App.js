import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';
import AuthProvider from './contexts/AuthProvider';
import './App.css';
import AppProvider from './contexts/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppProvider>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path='/' component={ChatRoom} />
                    </Switch>
                    <AddRoomModal />
                </AppProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
