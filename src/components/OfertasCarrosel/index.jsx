import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css'
import { api } from '../../services/api'
import { useEffect, useState } from "react";
import { Container, Title } from "./style";
import { CardProduct } from "../CardProdut";
import { formatPice } from "../../utils/FormatPrice";

export function OfertasCarousel() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products');
      const onlyOffers = data.filter((product) => product.offer).map(product => (
        { currencyValue: formatPice(product.price), ...product, }
      ))
      setOffers(onlyOffers);

    }
    loadProducts();
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
      <Title>Ofertas Do dia</Title>
      <Carousel
        responsive={responsive}
        infinite={true}
        partialVisible={false}
        itemClass="carousel-item"
      >
        {offers.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </Carousel>

    </Container>
  );
}
