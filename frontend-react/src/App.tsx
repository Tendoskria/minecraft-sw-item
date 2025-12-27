import { Navigate, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import ItemPage from "./pages/ItemPage"
import EventPage from "./pages/EventPage"
import EventItemsPage from "./pages/EventItemPages"

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/event" replace />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/items" element={<EventItemsPage />} />
        <Route path="/items/:itemId" element={<ItemPage />} />
      </Route>
    </Routes>
  )
}

export default App
