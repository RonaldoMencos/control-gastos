import ControlPresupuesto from "./ControlPresupuesto"
import NuevoPresupuesto from "./NuevoPresupuesto"

const Header = ({ presupuesto, setpresupuesto, isvalid, setisvalid }) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>
            {isvalid ? 
                <ControlPresupuesto 
                    presupuesto={presupuesto}
                /> :
                <NuevoPresupuesto
                presupuesto={presupuesto}
                setpresupuesto={setpresupuesto}
                setisvalid={setisvalid}
            />
            }
            
        </header>
    )
}

export default Header