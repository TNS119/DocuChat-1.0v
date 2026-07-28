import styled from "styled-components"

export const SideBarContainer = styled.div`
  height: 100vh;
  width: 25%;
  background-image: linear-gradient(to right, #1cbdd60a,#36dbf414);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0px;
  overflow-y: auto;

  transition: transform 0.4s ease-in-out;
  transform: ${props => (!props.getSidebar ? 'translateX(0)' : 'translateX(-100%)')};
  

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 270px;
    height: 100vh;
    z-index: 999; 
    box-shadow: 4px 0 12px rgba(0, 0, 0, 0.15);
    background-image: linear-gradient(to right, #080d0e, #171b1c);

    transition: transform 0.4s ease-in-out;
    transform: ${props => (props.getSidebar ? 'translateX(0)' : 'translateX(-100%)')};
    
  }


  &::-webkit-scrollbar {
    display: none;
  }
`

export const HeadingContianer = styled.div`
    margin: 0 0 18px;
    text-align: center;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width:100%;

    -webkit-tap-highlight-color: transparent;
    user-select: none;
`

export const MenuToggleButton = styled.button`
    background-color: transparent;
    outline: none;
    border:0px;
    color: #ffffff;
    cursor: pointer;
    width: 30px;
    margin: 12px 0px 0px;
`

export const Heading = styled.h1`
  font-family: roboto;
  color: rgb(16, 189, 242);
  font-size: 26px;
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
  height: 70%;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  padding-left: 12px;

  &:hover {
    scrollbar-width: thin;
    scrollbar-color:  #656c6e  #062c30 ; 
    direction: rtl; 
    * {
      direction: ltr;
    }
  }
`

export const SessionItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center !important;
  padding-right: 8px;
  @media(max-width: 768px){
    width: auto;
  }
`

export const SessionMain = styled.button`
  flex: 1;
  border: 0;
  border-radius: ${({$visible}) => ($visible ? '8px 0px 0px 8px': '8px')};
  padding: 10px 12px;
  text-align: left;
  display:flex;
  justify-content: space-between;
  cursor: pointer;
  color: #ffffff;
  background: ${({ $active }) => ($active ? 'rgba(0, 192, 251, 0.3)' : 'rgba(255,255,255,0.08)')};
  ${SessionItemWrapper}:hover &{
    border-radius: 8px 0px 0px 8px;
  }
`

export const SessionText = styled.span`
  display: block;
  font-size: 14px;
`

export const SessionActionsButton = styled.a`
  border: 0;
  background: ${({ $active }) => ($active ? 'rgba(0, 192, 251, 0.3)' : 'rgba(255,255,255,0.08)')};  
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  font-size: 28px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({$visible}) => ($visible ? '4': '0')};
  transition: opacity 0.2s ease;
  border-radius: 0 180% 180% 0;
  padding: 18px 18px 19px 18px;
  margin-right: 6px;
  clip-path:  ${({$visible}) => ($visible ? 'polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%)': 'polygon(0 0, 70% 0, 120% 50%, 70% 100%, 0 100%)')};

  ${SessionItemWrapper}:hover &{
    opacity: 4;
    background: ${({ $active }) => ($active ? 'rgba(0, 192, 251, 0.3)' : 'rgba(255,255,255,0.08)')};    
  }
`

export const SessionActionMenu = styled.div`
  position: relative;
  top: 0;
  right: 0;
  background-image: linear-gradient(to right, #1cbdd60a,#36dbf414);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  margin-top: 8px;
  min-width: 30px;
  z-index: 999;
`

export const SessionActionItem = styled.button`
  width: 100%;
  border: 0;
  background: transparent;
  border-radius: 12px;
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
  flex-direction: column;
  align-items: center;
`
export const SubFooter = styled.div`
  border-top: 1px solid rgba(255,255,255,0.15);
  width: 100%;
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

