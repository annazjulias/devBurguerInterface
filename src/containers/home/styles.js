import styled from "styled-components";
import BannerHome from '../../assets/baner.svg'
import Back2 from '../../assets/back2.svg'

export const Banner = styled.div`

background: 
url('${BannerHome}');
background-size: cover;
background-position: center;
height: 480px;

h1{
  font-family: 'Road Rage', sans-serif;
  font-size: 80px;
  color: #f4f4f4;
  position: absolute;
  right: 20%;
  top: 10%;
  margin-top: 9px;
}
`


export const Container = styled.section`

background: linear-gradient( rgba(255, 255, 252, 0.4),
 rgba(255, 255, 255, 0.7)
 ), 
  url('${Back2}');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: auto;
div{
margin: 0 auto;
padding-top: 15px;


max-width: 1400px;

}

`



