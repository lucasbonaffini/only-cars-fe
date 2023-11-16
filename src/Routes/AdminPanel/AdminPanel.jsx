import { useState } from "react";
import { Button } from "@mui/material";
import AddProduct from "../AddProduct/AddProduct";
import AddFeature from "../AddFeature/AddFeature";
import AddCategory from "../AddCategory/AddCategory";
import ProductsList from "../ProductsList/ProductsList"
import "./AdminPanel.css"
import AdminImg from '../../img/Admin.jpg'
import { useAuth } from "../../Components/AuthContext/AuthContext";
import CategoryList from "../CategoryList/CategoryList";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const AdminPanel = () => {

	const [open, setOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const auth = useAuth();

	const handleOpen = (item) => {
		setSelectedItem(item);
		setOpen(true);
	};
	
	const handleClose = () => {
		setSelectedItem(null);
		setOpen(false);
	};

	
    return (
		<div className="panel">
			
			<div className="admin-panel">

			<div className="buttons-container">
			<div className='welcome-admin'>
                <img className='admin-img' src={AdminImg} alt="" />
                        <div>
                            <h1>Bienvenido</h1>
                            <h2>{auth.user.username}</h2>    
                        </div>
                    </div>
			<Button onClick={() => handleOpen(<ProductsList/>)}>
							<div className="add-category">
                				<h3>Lista de Productos {<KeyboardArrowRightIcon fontSize="large"/>}</h3>
            	    		</div>
    		</Button>
			<Button onClick={() => handleOpen(<CategoryList />)}>
							<div className="add-category">
                				<h3>Lista de Categorias {<KeyboardArrowRightIcon fontSize="large"/>}</h3>
            	    		</div>
    		</Button>
			<Button onClick={() => handleOpen(<AddProduct />)}>
							<div className="add-product">
                				<h3>Agregar Producto {<KeyboardArrowRightIcon fontSize="large"/>}</h3>
								
            	    		</div>
    		</Button>
			<Button onClick={() => handleOpen(<AddFeature />)}>
							<div className="add-feature">
                				<h3>Agregar Característica {<KeyboardArrowRightIcon fontSize="large"/>}</h3>
            	    		</div>
    		</Button>
			<Button onClick={() => handleOpen(<AddCategory />)}>
							<div className="add-category">
                				<h3>Agregar Categoría {<KeyboardArrowRightIcon fontSize="large"/>}</h3>
            	    		</div>
    		</Button>	
			</div>	
<div className="selected-item">
{selectedItem}
</div>
</div>
		
		</div>
	);
}

export default AdminPanel;
