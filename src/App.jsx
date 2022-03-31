import { useState, useEffect } from "react"
import Header from "./components/Header"
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";

import { generarId } from "./helpers"
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import Filtros from "./components/Filtros";


function App() {
  const [presupuesto, setpresupuesto] = useState(Number (localStorage.getItem('presupuesto')) ?? 0)
  const [isvalid, setisvalid] = useState(false)

  const [modal, setmodal] = useState(false)
  const [animarModal, setanimarModal] = useState(false)

  const [gastos, setgastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [])

  const [gastoEditar, setgastoEditar] = useState({})

  const [filtro, setfiltro] = useState('')
  const [gastosFiltrados, setgastosFiltrados] = useState([])


  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setmodal(true)
      setTimeout(() => {
        setanimarModal(true)
      }, 500);
    }
  }, [gastoEditar])

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(gastoFilter => gastoFilter.categoria === filtro)
      setgastosFiltrados(gastosFiltrados)
    }
  }, [filtro])
  

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])
  
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])
  

  useEffect(() => {
    const presupuestoLS =   Number(localStorage.getItem('presupuesto') ?? 0) 
    if (presupuestoLS > 0) {
      setisvalid(true)
    }
  }, [])
  

  const handleNuevoGasto = () => {
    setmodal(true)
    setgastoEditar({})
    setTimeout(() => {
      setanimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setgastos(gastosActualizados)
    } else {
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setgastos([...gastos, gasto])
      setgastoEditar({})
    }

    setanimarModal(false)

    setTimeout(() => {
      setmodal(false)
    }, 500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id)
    setgastos(gastosActualizados)
  }

  return (

    <div className={modal ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setpresupuesto={setpresupuesto}
        isvalid={isvalid}
        setisvalid={setisvalid}
        gastos={gastos}
        setgastos={setgastos}
      />
      {isvalid && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setfiltro={setfiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setgastoEditar={setgastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )
      }

      {modal && (
        <Modal
          setmodal={setmodal}
          animarModal={animarModal}
          setanimarModal={setanimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setgastoEditar={setgastoEditar}
        />
      )}

    </div>
  )
}

export default App
