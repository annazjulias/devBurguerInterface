import styled from "styled-components";

export const ProductImage = styled.img`
width: 80px;
border-radius: 16px;
height: 80px;
`
export const ButtonGrup = styled.div`
display: flex;
align-items: center;
gap: 12px;

button{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  color: #fff;
  border-radius: 4px;
  background-color: #9758a6;
  transition: all 0.4s;
  border: none;

  &:hover{
    background-color: #6f357c;
  }
}
`

export const FormatTotalprice = styled.p``
export const EmptCart = styled.p``
export const TrashImg = styled.img`
  cursor: pointer;
  height: 25px;
  width: 25px;
`