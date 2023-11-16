import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import { muiStyles } from "../../mui-styles";
import axios from "axios";
import DeleteBtn from "../../Components/DeleteBtn/DeleteBtn";
import "./ProductsList.css"
import EditProduct from '../EditProduct/EditProduct.jsx'
import EditIcon from '@mui/icons-material/Edit';

const ProductsList = () => {
    
    const [open, setOpen] = useState(false);
    const [products, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
	const productUrl = `${import.meta.env.VITE_API_URL}/productos`;

    const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		axios.get(productUrl)      
        .then(res => {
			setProduct(res.data);
		});
	}, []);

    const handleProductDeleted = () => {
        axios.get(productUrl)
        .then(res => {
            setProduct(res.data)
        })
    }

    return (
        <div>
            {products.map((product, index) => (
                <div key={index} className="list-of-cars" >
                    <div className="image">
                        <img src={product.images[0].url} alt="" />
                    </div>
                    <div>
                        <div className="id">ID: {product.id}</div>
                        <div className="name">{product.name}</div>
                        <div className="buttons">
                            {<DeleteBtn productId={product} onDelete={handleProductDeleted}/>}
                            <Button sx={muiStyles.button} onClick={() => handleOpen()}>
                                <EditIcon/>
                                EDITAR PRODUCTO
            			    </Button>
                            
                        </div>
                    </div>
                </div>
            )
            )}

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogContent>
                {selectedProduct && <EditProduct product={selectedProduct} />}
            </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cerrar
            </Button>
        </DialogActions>
        </Dialog>
        </div>
    );
}

export default ProductsList