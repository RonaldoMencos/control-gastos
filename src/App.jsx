import { useState } from "react"
import Header from "./components/Header"
import Modal from "./components/Modal";
import IconoNuevoGasto from './img/nuevo-gasto.svg';


function App() {
  const [presupuesto, setpresupuesto] = useState(0)
  const [isvalid, setisvalid] = useState(false)

  const [modal, setmodal] = useState(false)
  const [animarModal, setanimarModal] = useState(false)


  const handleNuevoGasto = () => {
    setmodal(true)

    setTimeout(() => {
      setanimarModal(true)
    }, 1000);
  }

  return (
    
    <div>
      <Header 
        presupuesto={presupuesto}
        setpresupuesto={setpresupuesto}
        isvalid={isvalid}
        setisvalid={setisvalid}
      />
      {isvalid && (
        <div className="nuevo-gasto">
        <img 
          src={IconoNuevoGasto} 
          alt="icono nuevo gasto" 
          onClick={handleNuevoGasto}  
        />
      </div>
      ) 
      }

      {modal && (
      <Modal 
        setmodal={setmodal}
        animarModal={animarModal}
      />
      )}
      
    </div>
  )
}

export default App
