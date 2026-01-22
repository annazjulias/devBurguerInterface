import { ListIcon, ListPlusIcon, Receipt, ReceiptIcon } from "@phosphor-icons/react";

export const navLinksAdmin = [
  {
    id: 1,
    label: 'pedidos',
    path: '/admin/pedidos',
    icon: <ReceiptIcon />,
  },
  {
    id: 2,
    label: 'produtos',
    path: '/admin/produtos',
    icon: <ListIcon/>,
  },
  {
    id: 3,
    label: 'Adicionar Produtos',
    path: '/admin/novo-produto',
    icon: <ListPlusIcon />,
  },
]