import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css'
import { api } from '../../services/api'
import { useEffect, useState } from "react";
import { ContainerItens, Container, Title, CategoryButton } from "./style";
import { useNavigate } from "react-router-dom";
import img from "../../assets/category_1.png"
import img2 from "../../assets/category_2.png"
import img3 from "../../assets/category_3.png"
import img4 from "../../assets/category_4.png"

export function CategoryCarousel() {

  const [categories, setCategories] = useState([]);
  const categoryImages = {
    1: img,
    2: img2,
    3: img3,
    4: img4,
  };
  const navigate = useNavigate();



  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');
      setCategories(data);

    }

    loadCategories();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1280 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 690 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 690, min: 0 },
      items: 3

    }
  };

  return (
    <Container>
      <Title>Categorias</Title>
      <Carousel
        responsive={responsive}
        infinite={true}
        partialVisible={false}
        itemClass="carousel-item"
      >
        {categories.map((category) => (
          <ContainerItens key={category.id} $imageUrl={categoryImages[category.id]}>
            <CategoryButton
              onClick={() => navigate(`/cardapio?category=${category.id}`)}
            >
              <p>{category.name}</p>
            </CategoryButton>


          </ContainerItens>
        ))}
      </Carousel>
    </Container>
  );
}
