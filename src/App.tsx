import { Route, Routes } from "react-router-dom"
import LayoutWeb from "./pages/LayoutWeb"
import ProductAdmin from "./pages/ProductAdmin"


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWeb />}>
            <Route index element={<ProductAdmin />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
