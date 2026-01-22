import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Container, ProductImage, EditButton } from "./styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CheckCircleIcon, PencilIcon, XCircleIcon } from "@phosphor-icons/react";
import { formatPice } from "../../../utils/FormatPrice";
import { useNavigate } from "react-router-dom";

export function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products');
      setProducts(data);
      console.log(data);
    }
    loadProducts();
  }, []);
function isOffer(offer){
  if(offer){
    return <CheckCircleIcon color="#61a120" size="28"/>
  }else{
    return <XCircleIcon color="#ff3205" size="28"/>
  }
}

function editeProduct(products){
  navigate('/admin/editar-produto', {state: {product: products}});
}

  return (
    <Container>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell >Nome</TableCell>
            <TableCell align="center">Preço</TableCell>
            <TableCell align="center">Produto em Oferta</TableCell>
            <TableCell align="center">Imagem do Produto</TableCell>
            <TableCell align="center">Editar Produto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((products) => (
            <TableRow
              key={products.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {products.name}
              </TableCell>
              <TableCell align="center">{formatPice(products.price)}</TableCell>
              <TableCell align="center">{isOffer(products.offer)}</TableCell>
              <TableCell align="center">
                <ProductImage src={products.url} />
              </TableCell>
              <TableCell align="center">
                <EditButton onClick={() => editeProduct(products)}>
                  <PencilIcon />
                </EditButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}