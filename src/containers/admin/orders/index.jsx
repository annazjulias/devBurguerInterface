import { api } from '../../../services/api'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Row } from './row';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { orderStatus } from './orderStatus';
import { Filter, FilterOpitions } from './styled';
import { set } from 'react-hook-form';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState([]);
  const [activeStatus, setActiveStatus] = useState(0);
  useEffect(() => {

    async function loadOrders() {
      const { data } = await api.get('orders');

      setOrders(data);
      setFilteredStatus(data);
    }
    loadOrders();
  },

    []);


  function createData(order) {
    return {
      name: order.user.name,
      orderId: order._id,
      date: order.createdAt,
      status: order.status,
      products: order.products,
    };
  }

  function handleStatus(status) {
    if (status.id === 0) {
      setFilteredStatus(orders);
    } else {
      const newOrders = orders.filter((order) => order.status === status.value);
      setFilteredStatus(newOrders);
    }

    setActiveStatus(status.id);
  }
  useEffect(() => {
    if (activeStatus === 0) {
      setFilteredStatus(orders);
    } else {
      const statusIndex = orderStatus.find(
        (status) => status.id === activeStatus
      );

      if (!statusIndex) return;

      const newOrders = orders.filter(
        (order) => order.status === statusIndex.value
      );

      setFilteredStatus(newOrders);
    }
  }, [orders, activeStatus]);


  return (
    <>
      <Filter>
        {orderStatus.map((status) => (
          <FilterOpitions
            key={status.id}
            onClick={() => handleStatus(status)}
            $isActive={activeStatus === status.id}
          >
            {status.label}

          </FilterOpitions>))
        }
      </Filter>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Pedido </TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell >Data do pedido</TableCell>
              <TableCell>Status</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStatus.map(order => {
              const row = createData(order);
              return (
                <Row
                  key={row.orderId}
                  row={row}
                  orders={orders}
                  setOrders={setOrders}
                />
              );
            })}
          </TableBody>

        </Table>
      </TableContainer>
    </>
  );
}
