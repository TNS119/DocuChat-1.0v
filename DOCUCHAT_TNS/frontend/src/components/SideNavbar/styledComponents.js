import styled from "styled-components"

export const SideBarContainer = styled.div`
  height: 100vh;
  width: 25%;
  min-width: 240px;
  background-image: linear-gradient(to right, #1cbdd60a,#36dbf414);
  padding: 24px;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  font-size: 38%;
  overflow-y: auto;
`

export const Heading = styled.h1`
    font-family: roboto;
    color: rgb(16, 189, 242);
    margin: 0 0 10px;
    font-size: 24px;
    text-align: center;
`

export const NewChatButton = styled.button`
  width: 100%;
  border: 1px solid rgb(16, 189, 242);
  border-radius: 20px;
  padding: 8px 10px;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  margin-bottom: 12px;
`

export const SectionTitle = styled.p`
  color: rgba(255,255,255,0.85);
  margin: 0 0 6px;
  font-size: 14px;
`

export const SessionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const SessionItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 8px;
`

export const SessionMain = styled.button`
  flex: 1;
  border: 0;
  border-radius: 8px;
  padding: 10px 12px;
  text-align: left;
  display:flex;
  justify-content: space-between;
  cursor: pointer;
  color: #ffffff;
  background: ${({ active }) => (active ? 'rgba(0, 192, 251, 0.3)' : 'rgba(255,255,255,0.08)')};
`

export const SessionText = styled.span`
  display: block;
  font-size: 14px;
`

export const SessionActionsButton = styled.a`
  border: 0;
  background: transparent;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  font-size: 18px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${SessionItemWrapper}:hover & {
    opacity: 1;
    background: rgba(255,255,255,0.08);
  }
`

export const SessionActionMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-image: linear-gradient(to right, #1cbdd60a,#36dbf414);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 8px 0;
  margin-top: 8px;
  min-width: 100px;
  z-index: 70;
`

export const SessionActionItem = styled.button`
  width: 100%;
  border: 0;
  background: transparent;
  color: #ffffff;
  padding: 8px 12px;
  text-align: left;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`

export const SessionPinBadge = styled.span`
  background: rgba(16, 189, 242, 0.25);
  color: #a5f3fc;
  border-radius: 999px;
  padding: 2px 6px;
  font-size: 11px;
  margin-left: 8px;
  white-space: nowrap;
`

export const EmptyState = styled.p`
  color: rgba(255,255,255,0.75);
  font-size: 16px;
  margin: 0;
`
export const ProfileContinaer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`
export const Footer = styled.div`
  border-top: 1px solid rgba(255,255,255,0.15);
  padding-top: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-between;
`

export const ProfileAvatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 189, 242, 0.3);
  color: #fff;
  font-weight: bold;
  font-size: 22px;
`

export const ProfileName = styled.p`
  color: #ffffff;
  margin: 0;
  font-size: 24px;
`

export const LogoutButton = styled.button`
  border: 2px solid rgba(0, 192, 251, 0.3);
  border-radius: 6px;
  background: transparent;
  color: #1286a3;
  cursor: pointer;
  padding: 8px;
`

