import styled from "styled-components";

export const Container = styled.div`
margin-left: 28px;
display: flex;
flex-direction:column;
align-items: center;
gap: 25px;
padding: 20px;
border-radius: 5px;
background-color: #ffff;
cursor: grab;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
max-width: 390px; 
position: relative;

div{
  width: 100%;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  p{
    font-size: 20px;
    color: #ff8c05;
    line-height: 20px;
    font-weight: 700;
    margin-top: 55px;
  }

  strong{
    font-size: 25px;
    color: #363636;
    font-weight: 800;
    line-height: 20px;
  }
}
`

export const CardImg = styled.img`
height: 150px;
position: absolute;
top: -88px;
`
