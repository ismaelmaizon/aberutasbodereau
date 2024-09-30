/* eslint-disable no-mixed-spaces-and-tabs */
// contexto

import { useEffect, useState } from "react";
import { createContext } from "react";
//alert
import Swal from 'sweetalert2'

export const MiContexto = createContext([])

const URL = import.meta.env.VITE_BACKEND_URL



const CartProvider = ( { children } ) => {
  //vista
  const [vprod, setVprod] = useState(false)
  const [vent, setVent] = useState(false)
  
  //get cookie
  const [view, setview] = useState('')
  const getLocal = (name) => {
    const value = localStorage.getItem(name)
    console.log(value);
    
    if (value != null) {  
      return value
    }
    return null;
  }
  //obtener estados
  const [estados, setEstados] = useState([])
  const getEstados = async () =>{
    try {
        const response = await fetch(`http://${URL}/api/estados/getEstados`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        // Manejo de respuestas no autorizadas
        if (response.status === 401) {
          console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
          // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
          return { status: 401, message: 'No autorizado' };
        }
        if (!response.ok) {
          throw new Error('problemas al consultar en la navegacion');
        }
        const data = await response.json();
        setEstados(data.response)        
      } catch (error) {
        let response = { status: 500 }
        console.error('problemas al obtener estados:', error);
        return response          
      }
  }

  //crear tipo
  //const [prodCreado, setPructoCreado] = useState(false)
  const createTipo = async ( data ) =>{
      let tipo = {
        Tipo: data.Tipo,
        Descripcion: data.Descripcion 
      }
      try {
        const response = await fetch( `http://${URL}/api/tipos/createTipo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tipo),
          credentials: 'include'
        });
        // Manejo de respuestas no autorizadas
        if (response.status === 401) {
          console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
          // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
          return { status: 401, message: 'No autorizado' };
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response
      } catch (error) {
        let response = { status: 500 }
        console.error('problemas al crear tipo:', error);
        return response          
    }
  }

  //obtener tipos
  const [tipos, setTipos] = useState([])
  const getTipos = async () =>{
    try {
        const response = await fetch(`http://${URL}/api/tipos/getTipos`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        // Manejo de respuestas no autorizadas
        if (response.status === 401) {
          console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
          // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
          return { status: 401, message: 'No autorizado' };
        }
        if (!response.ok) {
          throw new Error('problemas al consultar en la navegacion');
        }
        const data = await response.json();
        setTipos(data.response)        
      } catch (error) {
        let response = { status: 500 }
        console.error('problemas al obtener tipos:', error);
        return response          
      }
  }
  //crear nuevo lugar
  const createLugar = async (data) =>{
    let lugar = {
      fullname: data.fullname
    }
    try {
      const response = await fetch(`http://${URL}/api/lugares/lugares`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lugar),credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas al crear lugar:', error);
      return response    
    } 
  }
  //obtener lugares
  const [lugares, setLugares] = useState([])
  const getLugares = async () =>{
      try {
          const response = await fetch(`http://${URL}/api/lugares/lugares`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          // Manejo de respuestas no autorizadas
          if (response.status === 401) {
            console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
            // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
            return { status: 401, message: 'No autorizado' };
          }
          if (!response.ok) {
            throw new Error('problemas al consultar en la navegacion');
          }
          const data = await response.json();
          setLugares(data.response)          
        } catch (error) {
          let response = { status: 500 }
          console.error('problemas al obtener lugares:', error);
          return response            
        }
  }

  //obtener productos
  const [productos, setProductos] = useState([])
  const getProductos = async () =>{
      try {
          const response = await fetch(`http://${URL}/api/productos/productos`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });

           // Manejo de respuestas no autorizadas
          if (response.status === 401) {
            console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
            // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
            return { status: 401, message: 'No autorizado' };
          }
          if (!response.ok) {
            throw new Error('problemas al consultar en la navegacion');
          }
          const data = await response.json();
          setProductos(data.response)
              
          return response
        } catch (error) {
          let response = { status: 500 }
          console.error('problemas al obtener productos:', error);
          return response        
        }
      
  }
  //obtener producto
  const [idg, setIdg] = useState('')
  const [producto, setProducto] = useState([])
  const getProducto = async (id) =>{
      try {
          const response = await fetch(`http://${URL}/api/productos/producto/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          // Manejo de respuestas no autorizadas
          if (response.status === 401) {
            console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
            // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
            return { status: 401, message: 'No autorizado' };
          }
          if (!response.ok) {
            throw new Error('problemas al consultar en la navegacion');
          }
          const data = await response.json();
          setIdg(data.IdGenerate)
          return data
        } catch (error) {
          let response = { status: 500 }
          console.error('problemas al obtener producto:', error);
          return response             
        }
      
  }
  //obtener ubicacion de productos
  const [productoUbi, setProductoUbi] = useState([])
  const [infoprod, setInfoprod] = useState([])
  const getUbiProducto = async (id) =>{
    try {
        const response = await fetch(`http://${URL}/api/lugaresProd/getUbicacionProducto/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        // Manejo de respuestas no autorizadas
        if (response.status === 401) {
          console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
          // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
          return { status: 401, message: 'No autorizado' };
        }
        if (!response.ok) {
          throw new Error('problemas al consultar en la navegacion');
        }
        const data = await response.json();
        if (data.response == []) {
          return []
        }else{
          setProductoUbi(data.response)
          return data.response
        }
      } catch (error) {
        let response = { status: 500 }
        console.error('problemas con la consulta:', error);
        return response                   
      }
  }
  //obtener productos de un lugar
  const [productsLug, setProductsLug] = useState([])
  const getProductosLugar = async (id) =>{
    try {
          const response = await fetch(`http://${URL}/api/lugaresProd/getProductosLugar/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          // Manejo de respuestas no autorizadas
          if (response.status === 401) {
            console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
            // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
            return { status: 401, message: 'No autorizado' };
          }
          if (!response.ok) {
            throw new Error('problemas al consultar en la navegacion');
          }
          const data = await response.json();
          setProductsLug(data.response)
          return data.response
        } catch (error) {
          let response = { status: 500 }
          console.error('problemas con la consulta:', error);
          return response           
        }
  }
  //crear producto
  //const [prodCreado, setPructoCreado] = useState(false)
  const createProducto = async ( data, file ) =>{
    let prod = {
      Tipo: data.Tipo,
      Alto: data.Alto,
      Ancho: data.Ancho,
      Derc: '',
      Izq: '',
      Precio_U: data.Precio_U}
    if (data.Lado == 'Derc'){
      prod.Derc = 1
      prod.Izq = 0
    }else{
      prod.Derc = 0
      prod.Izq = 1
    }  
    console.log(data);
    console.log(prod);
    
    try {
      const formData = new FormData();
      formData.append('file',file); // 'archivo' debe ser el archivo que deseas enviar
      formData.append('prod', JSON.stringify(prod)); // Puedes agregar otros datos como un JSON stringificado

      const response = await fetch(`http://${URL}/api/productos/producto`, {
        method: 'POST',
        body: formData, 
        credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setVprod(false)
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response 
    }
  }
  //agregar imagen a producto
  const addimgProduct = async ( id, file ) =>{
    console.log(id);
    console.log(file);
    try {
      const formData = new FormData();
      formData.append('file',file); // 'archivo' debe ser el archivo que deseas enviar
      formData.append('id', JSON.stringify(id)); // Puedes agregar otros datos como un JSON stringificado

      const response = await fetch(`http://${URL}/api/productos/addimgProduct`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response 
    }
  }
  //obtener imagenes del producto
  const [imgs, setImgs] = useState([])
  const getProductoIms = async (id) =>{
    try {
      const response = await fetch(`http://${URL}/api/productos/productoimg/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('problemas al consultar en la navegacion');
      }
      const data = await response.json();
      return data
      } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response     
    }  
  }
  //eliminar producto
  const deleteProducto = async (id) => {
    try {
      const response = await fetch(`http://${URL}/api/productos/producto/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response);
      
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response  
    }
  }

  //añadir producto a un lugar
  const insertProdLug = async (data) => {
    const {Idg, stock, Lugar} =  data
    let info = {
      "id_lugar": Lugar,
      "stock": stock
    }
    try {
      const response = await fetch(`http://${URL}/api/lugaresProd/addProductoLugar/${Idg}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info), credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response  
    }
  }

  //actulizar producto en un lugar
  const updateproductolugar = async (data) => {
    const {Idg, stock, Lugar, procedimiento} =  data
    let info = {
      "id_lugar": Lugar,
      "stock": stock,
      "procedimiento": procedimiento,
    }
    try {
      const response = await fetch(`http://${URL}/api/lugaresProd/updateProductoLugar/${Idg}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info), credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response.status);
      if( response.status == 200) {
        setVprod(false) 
      } 
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response  
    }
  }

  //actualizar stock del producto
  const updateStockProduct = async (id) =>{
    try {
      const response = await fetch(`http://${URL}/api/lugaresProd/upDateStockProducto/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }, credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response);
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response  
    }
  }

  // Filtro productos
  // rows (filas de la tabla) 
  const [rows, setRows] = useState([])
  const filtrarTipoLadoLug = async (tipo, lado, lug) => {
    setRows([]);
    let prods = [];
    
    const addProduct = (prod) => {
        tipos.map((ti)=>{
          if (prod.Tipo == ti.id) {
            prods.push({
                id: prod.id,
                col0: prod.IdGenerate,
                col1: ti.Tipo,
                col2: ti.Descripcion,
                col3: prod.Alto,
                col4: prod.Ancho,
                col5: prod.Derc,
                col6: prod.Izq,
                col7: prod.stock,
                col8: prod.Precio_U
            });  
        } 
      })
    };

    const filterByLugar = async (lug) => {
        const response = await getProductosLugar(lug);
        response.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id) addProduct(prod);
            });
        });
    };

    const filterByTipo = () => {
        productos.forEach(prod => {
            if (tipo === prod.Tipo) addProduct(prod);
        });
    };

    const filterByLado = () => {
        productos.forEach(prod => {
            if ((lado === 'Derc' && prod.Derc === 1) || (lado === 'Izq' && prod.Izq === 1)) addProduct(prod);
        });
    };

    const filterByTipoYLado = () => {
        productos.forEach(prod => {
            if ((lado === 'Derc' && prod.Derc === 1 && tipo === prod.Tipo) || (lado === 'Izq' && prod.Izq === 1 && tipo === prod.Tipo)) addProduct(prod);
        });
    };

    const filterByLugarYTipo = async (lug) => {
        const response = await getProductosLugar(lug);
        setProductsLug(response);
        productsLug.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id && tipo === prod.Tipo) addProduct(prod);
            });
        });
    };

    const filterByLugarYLado = async (lug) => {
        const response = await getProductosLugar(lug);
        setProductsLug(response);
        productsLug.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id && ((lado === 'Derc' && prod.Derc === 1) || (lado === 'Izq' && prod.Izq === 1))) addProduct(prod);
            });
        });
    };


    if (lug && !tipo && !lado) {
        await filterByLugar(lug);
    } else if (tipo && !lado && !lug) {
        filterByTipo();
    } else if (lado && !tipo && !lug) {
        filterByLado();
    } else if (lug && tipo && !lado) {
        await filterByLugarYTipo(lug);
    } else if (lug && lado && !tipo) {
        await filterByLugarYLado(lug);
    } else if (tipo && lado && !lug) {
        filterByTipoYLado();
    } else if (tipo && lado && lug) {
        const response = await getProductosLugar(lug);
        setProductsLug(response);
        productsLug.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id && ((lado === 'Derc' && prod.Derc === 1) || (lado === 'Izq' && prod.Izq === 1)) && tipo == prod.Tipo ) addProduct(prod);
            });
        });
    }

    return prods
  };
  
  const [cart, setCart] = useState([])
  //Registrar Venta
  const [venta, setVenta] = useState({})
  const registrarVenta = async (data) => {
    const venta = {
      'cliente': data.cliente,
      'total': data.total
    }
    console.log(venta);
    try {
      const response = await fetch(`http://${URL}/api/ventas/registrarVenta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(venta), credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json()
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response  
    }
  }
  //obtener ventas
  const [email, setEmail] = useState('')
  const [emails, setEmails] = useState([])
  const [ventas, setVentas] = useState([])
  const getVentas = async () =>{
    try {
        const response = await fetch(`http://${URL}/api/ventas/getVentas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
         // Manejo de respuestas no autorizadas
        if (response.status === 401) {
          console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
          // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
          return { status: 401, message: 'No autorizado' };
        }

        if (!response.ok) {
          throw new Error('Problemas al consultar en la navegación');
        }

        const data = await response.json();
        setVentas(data.response);  // Asignar los datos a tu estado
        return data;
      } catch (error) {
        let response = { status: 500 }
        console.error('problemas con la consulta:', error);
        return response
      }
  }

  //obtener venta
  const [idv, setIdv] = useState('')
  const [ventainf, setVentainf] = useState([])
  const [ventainfProds, setVentainfProds] = useState([])
  const getVenta = async (id) =>{
    try {
        const response = await fetch(`http://${URL}/api/ventas/getVentaId/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        // Manejo de respuestas no autorizadas
        if (response.status === 401) {
          console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
          // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
          return { status: 401, message: 'No autorizado' };
        }
        if (!response.ok) {
          throw new Error('problemas al consultar en la navegacion');
        }
        const data = await response.json();
        setIdv(data.venta[0].id_venta)
        setVentainf(data.venta[0])
        setVentainfProds(data.productos)
        return data
      } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response
    }
      
  }

  //añadir producto a Venta
  const registrarProdsVenta = async (data) =>{
    console.log(data);
    try {
      const response = await fetch(`http://${URL}/api/ventas/registrarProdVenta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response.status);
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response
    }
  }

  //update de venta
  const updateVenta = async ( data, cart ) =>{

    let upVenta = {
      "venta" : {
        apellido: data.apellido,
        nombre: data.nombre,
        mail: data.mail,
        fecha: data.fecha,
        id_venta: data.id_venta,
        cel: data.cel,
        estado: data.estado,
        total: data.total
      },
      "cart" : cart
    }
 
    console.log(upVenta);
    console.log(cart);
    
    try {
      const formData = new FormData();
      formData.append('upVenta',upVenta); // 'archivo' debe ser el archivo que deseas enviar
      formData.append('cart', cart); // Puedes agregar otros datos como un JSON stringificado

      const response = await fetch(`http://${URL}/api/ventas/updateVenta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(upVenta), 
        credentials: 'include'
      });
      // Manejo de respuestas no autorizadas
      if (response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tus credenciales o sesión.');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de error
        return { status: 401, message: 'No autorizado' };
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response
    } catch (error) {
      let response = { status: 500 }
      console.error('problemas con la consulta:', error);
      return response 
    }
  }


  // Filtro productos
  // rows (filas de la tabla) 
  const [rowsVent, setRowsVent] = useState([])
  const filtrarEmail = async (email) => {
    setRowsVent([]);
    let vent = [];
    
    ventas.map((cliente)=>{ 
      if (cliente.email === email) {
        estados.map((est) =>{
            if (cliente.estado == est.id) {
                let newCliente = {
                    id: cliente.id,
                    col0: cliente.id_venta, 
                    col1: cliente.fecha, 
                    col2: cliente.nombre,
                    col3: cliente.apellido,
                    col4: cliente.email,
                    col5: cliente.cel,
                    col6: cliente.total,
                    col7: est.estado
                }
                vent.push(newCliente)
              }
          })
      }
    })



    return vent
  };
  

  // Limpiar Filtro
  const [lug, setLug] = useState('')
  const [lado, setLado] = useState('')
  const [tipo, setTipo] = useState('')
  const [ubi, setUbi] = useState(false)

  const refresh = () =>{
      setUbi(false)
      setIdg('')
      setProducto([])
      setInfoprod([])
      setTipo('')
      setLado('')
      setLug('')
      let prods = []
      productos.map((prod)=>{ 
          //console.log(prod.id);
          tipos.map((ti)=>{
            if (prod.Tipo == ti.id) {
              let newProd = {
                  id: prod.id,
                  col0: prod.IdGenerate, 
                  col1: ti.Tipo, 
                  col2: ti.Descripcion,
                  col3: prod.Alto,
                  col4: prod.Ancho,
                  col5: prod.Derc,
                  col6: prod.Izq,
                  col7: prod.stock,
                  col8: prod.Precio_U
                }
                prods.push(newProd)
          }
      })
      setRows(prods)})
  }

  const [idsvent, setidsVent] = useState([])

  const refreshVenta = () =>{
    setVentainf([])
    setEmail('')
    let vents = []
    let ids = []
    let em = []
    ventas.map((cliente)=>{ 
        em.push(cliente.email)
        estados.map((est) =>{
            if (cliente.estado == est.id) {
                let id = { label: cliente.id_venta }
                let newCliente = {
                    id: cliente.id,
                    col0: cliente.id_venta, 
                    col1: cliente.fecha, 
                    col2: cliente.nombre,
                    col3: cliente.apellido,
                    col4: cliente.email,
                    col5: cliente.cel,
                    col6: cliente.total,
                    col7: est.estado
                }
                vents.push(newCliente)
                ids.push(id)
            }
        })
    })
    setRowsVent(vents)
    setidsVent(ids)
    setEmails(em)
  }

  //Alertas
  const alert = async (status) =>{
    if (status == 'success') {
      const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Proceso exitoso"
        });
    }else if (status == 'error') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Problemas con el proceso"
      });
    }else if (status == 'warning') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "warning",
        title: "producto no se encuentra en ningun lugar"
      });
    }else if (status == 'succesStock') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Stock Actualizado"
      });
    }else if (status == 'errorCreate') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "El Producto ya existe"
      });
    }

  }
      

  return (
      // aca llamamos al hoock useMiContexto
      <MiContexto.Provider value={{
        getLocal, view, setview,

        getEstados, estados, setEstados,

        createTipo,
        getTipos, tipos,

        vprod, setVprod, vent, setVent,
        
        createProducto, deleteProducto, addimgProduct,
        productos, setProductos, getProductos,
        producto, setProducto, getProducto, idg, setIdg,
        getProductoIms, imgs, setImgs,
        productoUbi, setProductoUbi, getUbiProducto, infoprod, setInfoprod,
        updateStockProduct,
        getProductosLugar, productsLug, setProductsLug,

        filtrarTipoLadoLug, rows, setRows,
        
        createLugar,
        getLugares, lugares, setLugares,
        lug, setLug, lado, setLado, tipo, setTipo, ubi, setUbi,
        insertProdLug, updateproductolugar,

        registrarVenta, registrarProdsVenta, venta, setVenta, 
        updateVenta,
        
        cart, setCart, 
        idv, setIdv,
        emails, setEmails, email, setEmail,
        rowsVent, setRowsVent,
        filtrarEmail,
        idsvent, setidsVent,
        
        getVentas, ventas, setVentas,
        getVenta ,ventainf, setVentainf, ventainfProds, setVentainfProds,
        refresh, refreshVenta,
        alert
      }} >
          {children}
      </MiContexto.Provider>
  )
}

// Este va a ser el encargado de proveer el contexto a elementos hijos
export default CartProvider