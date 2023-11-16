import { useState, useEffect} from 'react';
import '../../index.css';
import { useAuth } from '../../Components/AuthContext/AuthContext';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AdminPanel from "../../Routes/AdminPanel/AdminPanel";
import ErrorBoundary from '../../Components/ErrorBoundary';
import { Outlet, useNavigate } from 'react-router-dom';
import "./Admin.css";


const Admin = () => {

    const auth = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (!(auth.isAuthenticated() && auth.isAdmin())) {
            setShowAlert(true);
            const redirectTimer = setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }, [auth]);

    if (auth.isAuthenticated() && auth.isAdmin()) {
return (
        <div className='admin_container'>
          
            <div className='main-panel'>
                <ErrorBoundary>
                    
                    <AdminPanel  />
                    <Outlet />
                </ErrorBoundary>
            </div>
        </div>
    )
} else {
        return (
            <div className="admin_container_error">
                {showAlert && (
                    <Alert variant="filled" severity="error">
                        <AlertTitle>Error de autorización</AlertTitle>
                        No estás autorizado para acceder a esta página.
                    </Alert>
                )}
            </div>
        );
    }
}

export default Admin