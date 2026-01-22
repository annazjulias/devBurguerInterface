import styled from "styled-components";
import BannerHamburguer from '../../assets/bannerHamburguer.svg'
import Back2 from '../../assets/back2.svg'
import { Link } from "react-router-dom";


export const Container = styled.div`

background: linear-gradient( rgba(255, 255, 252, 0.4),
 rgba(255, 255, 255, 0.7)
 ), 
  url('${Back2}');

width: 100%;
min-height: 100vh;
background-color: #f0f0f0;

`
export const Banner = styled.div`
display: flex; 
justify-content: center;
align-items: center;
height: 480px;
width: 100%;
background: url('${BannerHamburguer}') no-repeat;
background-color: #1f1f1f;
background-position: center;
background-size: cover;
position: relative;

h1{
  font-family: 'Road Rage', sans-serif;
  font-size: 80px;
  line-height: 65px;
  color: #fff;
  position: absolute;
  right: 20%;
  top: 20%;

  span{
    display: block;
    color: #fff;
    font-weight: 400;
    font-size: 20px;
  }
}

`
export const CategoryMenu = styled.div`
display: flex;
justify-content: center;
gap: 50px;
margin-top: 30px;
`
export const CategoryButton = styled(Link)`
text-decoration: none;
cursor: pointer;
background: none;
color: ${(props) => (props.$isActiveCategory ? '#9758a6' : '#9758a6')};
font-size: 24px;
font-weight: 500;
padding-bottom: 5px;
line-height: 20px;
border: none;
border-bottom: ${(props) => props.$isActiveCategory && '4px solid #9758a6'};

`

export const ProductsContainer = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
padding: 50px;
gap: 75px;
justify-content: center;
max-width: 1450px;
margin: 100px auto;

`

export const ButtonVoltar = styled(Link) `
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  font-size: 16px;
  color: #9758a6;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }`
