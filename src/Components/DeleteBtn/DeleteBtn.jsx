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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const DeleteBtn = ({productId, onDelete}) => {

    const [open, setOpen] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)

    const productUrl = `${import.meta.env.VITE_API_URL}/productos/${productId.id}`

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    })

    const muiStyles = {
        button: {
            margin: "1rem",
            color: "black",
            backgroundColor: 'white',
            borderColor: 'red',
            borderRadius: "60px",
            fontSize: "13px",
            lineHeight: "1.5",
            maxHeight: "40px",
        "@media (max-width: 375px)": {
            lineHeight: "1.0",
            padding: "6px 5px",
        },
        '&:hover': {
            backgroundColor: 'red',
            color: "white",
        },
        },
    };

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDeleteProduct = async () => {
        try {
            await axios.delete(productUrl)
            setIsDeleted(true)
            onDelete()
        } catch (error) {
            console.error("Fallo eliminar el producto", error)
        }
    }

    return(
        <>
        <Button
        sx={muiStyles.button}
		onClick={handleClickOpen}
		variant="outlined">
        <DeleteForeverIcon/>
        ELIMINAR PRODUCTO
        </Button>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
        {"Realmente desea eliminar este Vehiculo? "}
        </DialogTitle>

        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {(productId.id) + "-" + (productId.name)}
        </DialogContentText>
        </DialogContent>

        <DialogActions>
        <Button 
        onClick={handleClose}>
        MANTENER
        </Button>

        <Button 
        onClick={handleDeleteProduct}
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
        El producto fue eliminado con exito!
        </Alert>
    </Snackbar>)}

    </>
    )
}

export default DeleteBtn