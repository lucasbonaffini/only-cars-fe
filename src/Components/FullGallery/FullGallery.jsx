import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./FullGallery.css";
import { muiStyles } from "../../mui-styles";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const FullGallery = ({ images, onClose }) => {

return (

<div className="full-gallery-container">
    <IconButton
        sx={muiStyles.button}
        className="close-button"
        onClick={onClose}
        aria-label="Close"
    >
    <CloseIcon />
    </IconButton>
    <div className="full-gallery-grid">
        {images.map((image, index) => (
        <div key={index}>
            <img
            src={image}
            alt={`Imagen ${index + 1}`}
            className="full-gallery-image"
            />
        </div>
        ))}
    </div>

    <Carousel
        className="full-gallery-grid-mobile"
        showArrows={false}
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
        swipeable={true}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
        {images.map((image, index) => (
        <div key={index} className="carousel-slide">
            <div className="image-container">
                <img src={image} alt={`Imagen ${index + 1}`} className="full-gallery-image"/>
            </div>
        </div>
        ))}
    </Carousel>
    </div>
);
};

export default FullGallery;
