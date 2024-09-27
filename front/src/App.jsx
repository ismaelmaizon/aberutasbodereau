//import clases from './App.modules.css'
import { Route, Routes } from 'react-router-dom'
//context
import CartProvider from './components/context/context.jsx'
//component
import SignInSide from './components/login/SignInSide.jsx'
import Inicio from './components/inicio/inicio.jsx'
import AddProducto from './components/addproduct/addproducto.jsx'
import clases from './App.module.css'
import AddProductLug from './components/addproductLug/addproductLug.jsx'
import UpdateProductLug from './components/updateproductLug/updateproductLug.jsx'
import Preview from './components/preview/preview.jsx'
import Dashboard from './components/dashboard/dashboard.jsx'
import PorductDetail from './components/productDetail/productDetail.jsx'
import AddTipo from './components/addtipo/addtipo.jsx'
import AddLugar from './components/addlugar/addlugar.jsx'
import UpdateVenta from './components/updateVentas/updateVenta.jsx'


function App() {

  return (
    <>
      <div className={clases.class} >
        <CartProvider>
          <div>
              <Routes>
                <Route element={<SignInSide/>} path='/' ></Route>
                <Route element={<Inicio/>} path='/inicio' ></Route>
                <Route element={<AddProducto/>} path='/addproducto' ></Route>
                <Route element={<AddTipo/>} path='/addtipo' ></Route>
                <Route element={<AddLugar/>} path='/addlugar' ></Route>
                <Route element={<AddProductLug/>} path='/addproductLug' ></Route>
                <Route element={<UpdateProductLug/>} path='/updateproductLug' ></Route>
                <Route element={<Preview/>} path='/preview' ></Route>
                <Route element={<Dashboard/>} path='/dashboard' ></Route>
                <Route element={<PorductDetail/>} path='/detalle' ></Route>
                <Route element={<UpdateVenta/>} path='/updateVenta' ></Route>
              </Routes>
            </div>
        </CartProvider>
      </div>
    </>
  )
}

export default App