import { Navigate, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import ItemPage from "./pages/ItemsPage"
import EventPage from "./pages/EventPage"
import AccueilPage from "./pages/AccueilPage"

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/accueil" replace />} />
        <Route path="/accueil" element={<AccueilPage />} />
        <Route path="/item" element={<ItemPage />} />
        <Route path="/event" element={<EventPage />} />
      </Route>
    </Routes>
  )
}

export default App
