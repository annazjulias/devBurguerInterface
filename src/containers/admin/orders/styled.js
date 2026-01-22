import styled from "styled-components";
import Select from "react-select";

export const ProductImg = styled.img`
height: 80px;
padding: 12px;
border-radius: 16px;
`

export const SelectStats = styled(Select)`
width: 240px;
`
export const Filter = styled.div`
display: flex;
justify-content:center;
margin: 28px 0;
gap: 50px;
`
export const FilterOpitions = styled.button`
  position: relative;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 18px;
  line-height: 20px;
  padding-bottom: 8px;
  color: ${({ $isActive }) => ($isActive ? '#9758a6' : '#625e5e')};

  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    height: 2px;
    width: ${({ $isActive }) => ($isActive ? '100%' : '0%')};
    background-color: #9758a6;

    transform: translateX(-50%);
    transition: width 0.35s ease;
  }
`;

