import styled from "styled-components";

export const Container = styled.div`
.carrousel-item {
  margin: 0 auto;

}
overflow-x: hidden;
.react-multi-carousel-list{
  overflow: visible;
margin-top: 40px;

}


padding-bottom:40px;


`

export const Title = styled.div`
font-size: 40px;
font-weight: 800;
color: #61a120;
padding-bottom: 12px;
position: relative;
text-align: center;
text-transform: uppercase;
margin-bottom: 80px;
margin-top: 100px;


&::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 70px;
  height: 4px;
  background-color: #61a120;
  left: calc(50% - 35px);
}
`
