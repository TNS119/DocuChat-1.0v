import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SideBarContainer, Heading, SessionList, SessionItemWrapper, SessionMain, SessionText, SessionActionsButton, SessionActionMenu, SessionActionItem, EmptyState, Footer, ProfileContinaer, ProfileAvatar, ProfileName, LogoutButton, NewChatButton, SectionTitle } from './styledComponents'

const SideNavBar = ({ sessions = [], activeSessionId, onSelectSession, onDeleteSession, onPinSession, username = 'User', onLogout }) => {
    const navigate = useNavigate();
    const [openSessionMenu, setOpenSessionMenu] = useState(null);

    const handleMenuToggle = (sessionId) => {
        setOpenSessionMenu((current) => (current === sessionId ? null : sessionId));
    };

    const handleDelete = (sessionId) => {
        setOpenSessionMenu(null);
        onDeleteSession?.(sessionId);
    };

    const handlePin = (sessionId) => {
        setOpenSessionMenu(null);
        onPinSession?.(sessionId);
    };

    return (
        <SideBarContainer>
            <div>
                <Heading>DOCUCHART</Heading>
                <NewChatButton onClick={() => navigate('/chat', { state: { session_id: '', title: 'New Chat' } })}>+ New Chat</NewChatButton>
                <SectionTitle>Recent sessions</SectionTitle>
                <SessionList>
                    {sessions.length === 0 ? (
                        <EmptyState>No saved sessions yet.</EmptyState>
                    ) : (
                        sessions.map((session) => (
                            <SessionItemWrapper key={session.session_id}>
                                <SessionMain
                                    $active={activeSessionId === session.session_id}
                                    onClick={() => onSelectSession(session.session_id, session.topic)}
                                >
                                    <SessionText>
                                        {session.pinned && <span>📌 </span>}
                                        {session.topic}
                                    </SessionText>
                                    <SessionActionsButton onClick={() => handleMenuToggle(session.session_id)}>
                                        ⋮
                                    </SessionActionsButton>
                                </SessionMain>
                                
                                {openSessionMenu === session.session_id && (
                                    <SessionActionMenu>
                                        <SessionActionItem onClick={() => handlePin(session.session_id)}>Pin</SessionActionItem>
                                        <SessionActionItem onClick={() => handleDelete(session.session_id)}>Delete</SessionActionItem>
                                    </SessionActionMenu>
                                )}
                            </SessionItemWrapper>
                        ))
                    )}
                </SessionList>
            </div>

            <Footer>
                <ProfileContinaer>
                    <ProfileAvatar>{username?.charAt(0)?.toUpperCase() || 'U'}</ProfileAvatar>
                    <ProfileName>{username}</ProfileName>
                </ProfileContinaer>
                <LogoutButton onClick={onLogout}>Logout</LogoutButton>
            </Footer>
        </SideBarContainer>
    )
}

export default SideNavBar

