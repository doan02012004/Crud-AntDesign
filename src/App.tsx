import { Route, Routes } from "react-router-dom"
import LayoutAdmin from "./pages/(dashboard)/LayoutAdmin"
import ListProductAdmin from "./pages/(dashboard)/product/ListProductAdmin"
import AddProductAdmin from "./pages/(dashboard)/product/AddProductAdmin"
import EditProductAdmin from "./pages/(dashboard)/product/EditProductAdmin"

function App() {
  return (
    <>
    <Routes>
      <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<ListProductAdmin />} />
          <Route path="add" element={<AddProductAdmin />} />
          <Route path="edit/:id" element={<EditProductAdmin />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
