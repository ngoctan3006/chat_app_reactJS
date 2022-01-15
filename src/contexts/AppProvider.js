import { createContext, useContext, useMemo, useState } from 'react';
import useFireStore from '../hooks/useFireStore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');

    const {
        user: { uid }
    } = useContext(AuthContext);

    const roomsCondition = useMemo(
        () => ({
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }),
        [uid]
    );

    const rooms = useFireStore('rooms', roomsCondition);

    const selectedRoom = useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId]
    );

    const usersCondition = useMemo(
        () => ({
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members
        }),
        [selectedRoom.members]
    );

    const members = useFireStore('users', usersCondition);

    return (
        <AppContext.Provider
            value={{
                rooms,
                members,
                isAddRoomVisible,
                setIsAddRoomVisible,
                selectedRoomId,
                setSelectedRoomId,
                selectedRoom,
                isInviteMemberVisible,
                setIsInviteMemberVisible
            }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
