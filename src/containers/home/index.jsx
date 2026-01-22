import { CategoryCarousel } from "../../components/CategoryCarousel"
import { OfertasCarousel } from "../../components/OfertasCarrosel"
import { Banner, Container } from "./styles"
import { useUser } from "../../hooks/usercontext"

export function Home() {
  return (
    <main>
      <Banner>
        <h1>Bem-Vindo(a)!</h1>
      </Banner>
      <Container>
        <CategoryCarousel />
        <OfertasCarousel />
      </Container>
    </main>
  )
}