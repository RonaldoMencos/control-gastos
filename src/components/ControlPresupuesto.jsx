import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
const ControlPresupuesto = ({ presupuesto, gastos, setgastos, setpresupuesto, setisvalid }) => {

    const [disponible, setdisponible] = useState(0)
    const [gastado, setgastado] = useState(0)
    const [porcentaje, setporcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        setgastado(totalGastado)
        setdisponible(presupuesto - totalGastado)
        const nuevoPorcentaje = ((totalGastado * 100) / presupuesto).toFixed(2)

        setTimeout(() => {
            setporcentaje(nuevoPorcentaje)
        }, 1500);
    }, [gastos])


    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
         const resultado = confirm('¿Desea reiniciar el presupuesto y gastos?')

         if (resultado) {
             setgastos([])
             setpresupuesto(0)
             setisvalid(false)
         }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas  ">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : "#3b82f6",
                        trailColor: "#f5f5f5",
                        textColor: porcentaje > 100 ? '#DC2626' : "#3b82f6",
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado `}
                />
            </div>
            <div className="contenido-presupuesto">
                <button 
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}    
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span>{formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span>{formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto