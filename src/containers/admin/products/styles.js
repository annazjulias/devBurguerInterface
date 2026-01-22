import styled from "styled-components";

export const Container = styled.div``
export const ProductImage = styled.img`
height: 100px;
padding: 12px;
border-radius:16px;
background-color: #f0f0f0;
`
export const EditButton = styled.button`
border:none;
background-color: #f4f4f4;
width: 32px;
border-radius: 8px;
height: 32px;
margin: 0 auto;

display: flex;
align-items: center;
justify-content: center;
svg{
  width: 20px;
  height: 20px;
}
&:hover {
  background-color: #9758a6;
  cursor: pointer;
  svg {
    color: #fff;
  }
}

`