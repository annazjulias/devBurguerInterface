import styled from "styled-components";

export const Container = styled.div`
background-color: #fff;
border-radius: 20px;
display: flex;
justify-content: space-between;
margin-bottom: 20px;
flex-direction: column;
*{
  color: #484848;
  font-weight: 500;
}

.container-top{
  display: grid;
  grid-gap: 10px 30%;
  grid-template-areas:
  'resumo resumo'
  'itens valor'
  'taxa valortaxa';

  .resumo{
    grid-area: resumo;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 20px;
    background-color: #484848;
    color: #fff;
    padding: 15px;  
    text-align: center;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
  }

  .itens{
    grid-area: itens;
    padding-left: 20px;
  }

  .valor{
    grid-area: valor; 
    padding-right: 20px;
   }

   .taxa{
    grid-area: taxa;
    padding-left: 20px;
   }

    .valortaxa{
      grid-area: valortaxa;
      padding-right: 20px;

    }
  }
    .container-bottom{
     display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-weight: 700;
      padding: 20px;
        *{
          font-weight: 700;
        }
    }



`