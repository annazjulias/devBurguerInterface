import styled from "styled-components";
import Texture from "../../assets/carrinho.svg";
import Back2 from '../../assets/back2.svg'


export const Container = styled.div`
  width: 100%;
 background: linear-gradient( rgba(255, 255, 252, 0.4),
  rgba(255, 255, 255, 0.7)
  ), 
   url('${Back2}');
  min-height: 100%;
  `
export const Banner = styled.div`
background: url('${Texture}');
background-size: cover;
background-color: #1f1f1f;
background-position: center;
display: flex;
align-items: center;
justify-content: center;
position: relative;
height: 180px;

img{
  height: 130px;
}
`

export const Title = styled.h1`
font-size: 32px;
font-weight: 800;
padding-bottom: 12px;
color: #61a120;
text-align: center;
position: relative;

&::after{
  position: absolute;
  left: calc(50% + -28px);
  bottom: 0;
  content: '';
  width: 56px;
  height: 4px;
  background-color:#9758A6;
}
`
export const Content = styled.div`
display: grid;
grid-template-columns: 1fr 30%;
gap: 40px;
width: 100%;
max-width: 1280px;
padding: 40px;
margin: 0 auto;
`

