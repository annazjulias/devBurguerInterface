import { useEffect, useState } from 'react';
import { Container, Banner, ProductsContainer, CategoryMenu, CategoryButton, ButtonVoltar } from './styled';
import { api } from '../../services/api';
import { formatPice } from '../../utils/FormatPrice';
import { CardProduct } from '../../components/CardProdut';
import { useLocation, useNavigate } from 'react-router-dom';

export function Menu() {

  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const [activeCategory, setActiveCategory] = useState(() => {
    const categoryId = +query.get('category');
    return isNaN(categoryId) ? 0 : categoryId;
  });



  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');
      const newCategories = [{ id: 0, name: 'Todas' }, ...data];
      setCategories(newCategories);
    }

    async function loadProducts() {
      const { data } = await api.get('/products');
      const newProducts = data.map(product => ({
        currencyValue: formatPice(product.price),
        ...product,
      }));
      setProducts(newProducts);
    }

    loadCategories();
    loadProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      activeCategory === 0
        ? products
        : products.filter(
          (product) => product.category_id === activeCategory
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
      <ButtonVoltar
        onClick={() => navigate('/')}
      >
        <h1>voltar</h1>
      </ButtonVoltar>
      <CategoryMenu>
        {categories.map(category => (
          <CategoryButton
            key={category.id}
            $isActiveCategory={category.id === activeCategory}
            onClick={() => {
              navigate(
                {
                  pathname: '/cardapio',
                  search: `?categoria=${category.id}`,
                },
                { replace: true }
              );
              setActiveCategory(category.id);
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryMenu>

      <ProductsContainer>
        {filteredProducts.map(product => (
          <CardProduct product={product} key={product.id} />
        ))}
      </ProductsContainer>
    </Container>
  );
}
