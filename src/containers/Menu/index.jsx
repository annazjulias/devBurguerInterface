import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Container,
  Banner,
  ProductsContainer,
  CategoryMenu,
  CategoryButton
} from './styled';

import { api } from '../../services/api';
import { formatPice } from '../../utils/FormatPrice';
import { CardProduct } from '../../components/CardProdut';

export function Menu() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(search);

  const [activeCategory, setActiveCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // 🔹 Sincroniza categoria com a URL
  useEffect(() => {
    const categoryId = Number(query.get('category')) || 0;
    setActiveCategory(categoryId);
  }, [search]);

  // 🔹 Carrega categorias e produtos
  useEffect(() => {
    async function loadData() {
      const [{ data: categoriesData }, { data: productsData }] =
        await Promise.all([
          api.get('/categories'),
          api.get('/products'),
        ]);

      setCategories([{ id: 0, name: 'Todas' }, ...categoriesData]);

      const formattedProducts = productsData.map(product => ({
        ...product,
        currencyValue: formatPice(product.price),
      }));

      setProducts(formattedProducts);
    }

    loadData();
  }, []);

  // 🔹 Filtra produtos pela categoria ativa
  useEffect(() => {
    setFilteredProducts(
      activeCategory === 0
        ? products
        : products.filter(
            product => product.category_id === activeCategory
          )
    );
  }, [products, activeCategory]);

  return (
    <Container>
      <Banner>
        <h1>
          O MELHOR
          <br />
          HAMBURGUER
          <br />
          ESTÁ AQUI!
          <span>Esse cardápio está irresistível!</span>
        </h1>
      </Banner>

      <CategoryMenu>
        {categories.map(category => (
     <CategoryButton
     $isActiveCategory={category.id === activeCategory}
     onClick={() =>
       navigate(`/cardapio?category=${category.id}`, { replace: true })
     }
   >
     {category.name}
   </CategoryButton>
   
        ))}
      </CategoryMenu>

      <ProductsContainer>
        {filteredProducts.map(product => (
          <CardProduct
            key={product.id}
            product={product}
          />
        ))}
      </ProductsContainer>
    </Container>
  );
}
