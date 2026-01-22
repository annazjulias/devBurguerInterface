import styled from "styled-components";
import { Link } from "react-router-dom";
export const Container = styled.div`

.carrousel-item {
  padding-right: 20px;
}
.react-multi-carousel-list{
  margin-top: 15px;
}

`

export const Title = styled.div`
font-size: 40px;
font-weight: 800;
color: #9758a6;
padding-bottom: 12px;
position: relative;
text-align: center;
text-transform: uppercase;
margin-bottom: 20px;
padding-top: 3px;

&::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 70px;
  height: 4px;
  background-color: #9758a6;
  left: calc(50% - 35px);
}
`

export const ContainerItens = styled.div`

margin-left: 28px ;
  background-image: url(${props => props.$imageUrl});
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  padding: 20px 10px;
  width: 88%;
  height: 250px;
  border-radius: 14px;
`


export const CategoryButton = styled.button`
  color: white;
  background-color: rgba(0,0,0, 0.5);
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 22.5px;
  margin-top: 100px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #9758a6;
  }
`;
