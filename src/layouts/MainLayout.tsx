import { Outlet } from 'react-router-dom'
import { Container } from '@mantine/core'
import { Header } from '../components/header/Header'

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Container size="lg" mt="md">
        <Outlet />
      </Container>
    </>
  )
}