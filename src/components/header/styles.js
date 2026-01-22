import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
background-color:${props => props.theme.mainBlack};
width: 100%;
height: 75px;
`
export const Navigation = styled.nav`
display: flex;
align-items: center;
justify-content: center;
height: 72px;

img{
 width: 75px;
 margin-left: 45px;
margin-top: 10px;}

div{
  margin-left: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  hr{
    height:24px;
    border: 1px solid #625E5E;
  }
}
`
export const HederLink = styled(Link)`
color:${props => props.$isActive ? '#9758a6' : '#FFFFFF'}; 

text-decoration: none;
font-size: 16px;
transition: color 0.3s;
&:hover{
  color: #9758a6;
}
`
export const Options = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 48px;
`
export const Profile = styled.div`
display: flex;
align-items: center;
gap: 12px;
font-size: 14px;

img{
  width: 25px;
}

p{
  color: #FFFFFF;
  line-height:90%;
  font-weight: 300;
  span{
    font-weight: 700;
    color: #9758a6;
  }
}
`
export const LinkContainer = styled.div`
display: flex;
align-items: center;
gap: 10px;
margin-right: 150px;

img{
  width: 25px;
}
`
export const Logout = styled.button`
color: #ff3205;
text-decoration: none;
font-weight: 700;
background: none;
border: none;
`
export const Content = styled.div`
display: flex;
align-items: center;
justify-content: space-between;

`