import styles from './ErrorPanel.module.css'
import { useNavigate } from "react-router-dom";

const ErrorPanel = () => {

	const navigate = useNavigate();

    return(
        <div className={styles.panel_error}>
        <h1>No puedes acceder al Panel desde este Dispositivo!!</h1>
        <h3>Tu pantalla es demasiado pequeña</h3>
        <button className={styles.btn_error} onClick={() => navigate(-1)}>Volver al Inicio</button>
        </div>
    )
}

export default ErrorPanel