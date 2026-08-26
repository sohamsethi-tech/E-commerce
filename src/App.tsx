import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CollectionsPage from './pages/CollectionsPage'
import CollectionDetailPage from './pages/CollectionDetailPage'
import CarpetsPage from './pages/CarpetsPage'
import ProductPage from './pages/ProductPage'
import ProjectsPage from './pages/ProjectsPage'
import CustomMadePage from './pages/CustomMadePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="collections/:slug" element={<CollectionDetailPage />} />
          <Route path="carpets" element={<CarpetsPage />} />
          <Route path="carpets/:slug" element={<ProductPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="custom-made" element={<CustomMadePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-confirmation/:orderId" element={<OrderConfirmationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}