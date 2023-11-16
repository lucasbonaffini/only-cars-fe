import axios from "axios"
import React, { useState } from "react"
import { Button } from "@mui/material"
import { muiStyles } from "../../mui-styles"
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const DeleteCategory = ({categoryID, onDelete}) => {

    const [open, setOpen] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)

    const categoryUrl = `${import.meta.env.VITE_API_URL}/categorias/${categoryID.id}`

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    })

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDeleteCategory = async () => {
        try {
            await axios.delete(categoryUrl)
            setIsDeleted(true)
            onDelete()
        } catch (error) {
            console.error("Fallo eliminar la categoría", error)
        }
    }

    return(
        <>
        <Button
        sx={muiStyles.button}
		onClick={handleClickOpen}
		variant="outlined">
        ELIMINAR
        </Button>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
        {"Realmente desea eliminar esta Categoria? "}
        </DialogTitle>

        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {(categoryID.id) + "-" + (categoryID.title)}
        </DialogContentText>
        </DialogContent>

        <DialogActions>
        <Button 
        onClick={handleClose}>
        MANTENER
        </Button>

        <Button 
        onClick={handleDeleteCategory}
        onClose={handleClose} autoFocus>
        
        ELIMINAR

        </Button>
        </DialogActions>
    </Dialog>

    {isDeleted && (<Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}>

        <Alert 
        onClose={handleClose} 
        severity="success" 
        sx={{ width: '100%' }}>
        La categoria fue eliminada con exito!
        </Alert>
    </Snackbar>)}

    </>
    )
}

export default DeleteCategory