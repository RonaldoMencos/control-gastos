import { useState, useEffect } from "react"
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from "./Mensaje"

const Modal = ({ setmodal, animarModal, setanimarModal, guardarGasto, gastoEditar, setgastoEditar }) => {

    const [nombre, setnombre] = useState("")
    const [cantidad, setcantidad] = useState(0)
    const [categoria, setcategoria] = useState("")
    const [mensaje, setmensaje] = useState("")
    const [fecha, setfecha] = useState("")
    const [id, setid] = useState("")

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setnombre(gastoEditar.nombre)
            setcantidad(gastoEditar.cantidad)
            setcategoria(gastoEditar.categoria)
            setfecha(gastoEditar.fecha)
            setid(gastoEditar.id)
        }
    }, [])


    const ocultarModal = () => {
        setanimarModal(false)
        setgastoEditar({})
        setTimeout(() => {
            setmodal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault()

        if ([nombre, cantidad, categoria].includes('')) {
            setmensaje("Todos los campos son obligatorios")
            setTimeout(() => {
                setmensaje('')
            }, 2000);
            return
        }

        guardarGasto({ nombre, cantidad, categoria, id, fecha })
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                />
            </div>
            <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        type="text"
                        placeholder="Añade el nombre del gasto"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setnombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        type="number"
                        placeholder="Añade la cantidaed del gasto: ej. 300"
                        id="cantidad"
                        value={cantidad}
                        onChange={(e) => setcantidad(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setcategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="casa">Casa</option>
                        <option value="comida">Comida</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="suscripciones">Suscripciones</option>
                        <option value="salud">Salud</option>

                    </select>
                </div>
                <input
                    type="submit"
                    value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
                />
            </form>
        </div>
    )
}

export default Modal