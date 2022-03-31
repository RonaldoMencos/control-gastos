
const Filtros = ({ filtro, setfiltro }) => {
    return (
        <div className="filtros sombra contenedor">
            <form>
                <div className="campo">
                    <label htmlFor="filtro">Filtrar Gastos</label>
                    <select
                        id="filtro"
                        value={filtro}
                        onChange={e => setfiltro(e.target.value) }
                    >
                        <option value="">-- Todas las categorias --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="casa">Casa</option>
                        <option value="comida">Comida</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="suscripciones">Suscripciones</option>
                        <option value="salud">Salud</option>

                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filtros