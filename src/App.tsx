import { Route, Routes } from "react-router-dom"
import LayoutWeb from "./pages/LayoutWeb"
import List from "./pages/List"
import Add from "./pages/Add"
import Edit from "./pages/Edit"
function App() {
  return (
  <>
    <Routes>
      <Route path="/" element={<LayoutWeb />}>
          <Route index element={<List />} />
          <Route path="add" element={<Add />} />
          <Route path="edit/:id" element={<Edit />} />
      </Route>
    </Routes>
  </>
  )
}

export default App