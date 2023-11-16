import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import axios from "axios";
import DeleteCategory from "../../Components/DeleteCategory/CategoryDelete";
import "./CategoryList.css"

const CategoryList = () => {
    
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
	const categoryUrl = `${import.meta.env.VITE_API_URL}/categorias`;

    const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		axios.get(categoryUrl)      
        .then(res => {
			setCategories(res.data);
		});
	}, []);

    const handleCategoryDeleted = () => {
        axios.get(categoryUrl)
        .then(res => {
            setCategories(res.data)
        })
    }

    return (
        <div>
            {categories.map((cat, index) => (
                <div key={index} className="list-of-cars" >
                <div className="image">
                        <img src={cat.image?.url} alt="" />
                    </div>
                    <div>
                        <div className="id">ID: {cat.id}</div>
                        <div className="name">{cat.title}</div>
                        <div className="buttons">
                            {<DeleteCategory categoryID={cat} onDelete={handleCategoryDeleted}/>}
                        </div>
                    </div>
                </div>
            )
            )}

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cerrar
            </Button>
        </DialogActions>
        </Dialog>
        </div>
    );
}

export default CategoryList