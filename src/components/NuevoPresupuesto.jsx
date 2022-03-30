import { useState } from "react"
import Mensaje from "./Mensaje"

const NuevoPresupuesto = ({ presupuesto, setpresupuesto, setisvalid }) => {

    const [mensaje, setmensaje] = useState("")

    const handlePresupuesto = e => {
        e.preventDefault()

        if (!presupuesto || presupuesto < 0) {
            setmensaje("No es un presupuesto válido")
            return
        }

        setmensaje("")
        setisvalid(true)
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form className="formulario" onSubmit={handlePresupuesto}>
                <div className="campo">
                    <label htmlFor="">Definir Presupuesto</label>
                    <input
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Añade tu presupuesto"
                        value={presupuesto}
                        onChange={e => setpresupuesto(Number(e.target.value))}
                    />
                </div>
                <input type="submit" value="Añadir" />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    )
}

export default NuevoPresupuesto