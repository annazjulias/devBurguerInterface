import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { api } from '../../../services/api';
import { formateDate } from '../../../utils/formatDate';
import { ProductImg, SelectStats } from './styled';
import { orderStatus } from './orderStatus';


export function Row({ row, setOrders, orders }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function newStatus(id, status) {

    try {
      setLoading(true);
      await api.put(`orders/${id}`, { status });
      const newOrders = orders.map(order => order._id === id ? { ...order, status } : order);
      setOrders(newOrders);
    } catch (error) {
      console.error('Error updating status:', error);
      return;
    }
    finally {
      setLoading(false);
    }

  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.orderId}
        </TableCell>

        <TableCell>{row.name}</TableCell>

        <TableCell>{formateDate(row.date)}</TableCell>

        <TableCell>
          <SelectStats
            options={orderStatus.filter((status) => status.id !== 0)}
            placeholder="Status"
            defaultValue={orderStatus.find(
              (status) => status.value === row.status || null,
            )}
            onChange={status => newStatus(row.orderId, status.value)}
            isLoading={loading}
            menuPortalTarget={document.body}
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={5} sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom>
                Pedido
              </Typography>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Produto</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Imagem</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <ProductImg
                          src={product.url}
                          alt={product.name}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  order: PropTypes.array.isRequired,
  setOrders: PropTypes.func.isRequired,
  row: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
