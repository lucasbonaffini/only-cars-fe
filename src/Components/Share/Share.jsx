import React, { useState } from "react";
import "./Share.css"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const ShareModal = ({ product, onClose }) => {
  const {
    id: productID,
    images: productImages,
    name: productName,
    description: productDescription,
    price: productPrice,
  } = product;
  const shareUrl = `http://c5-team6-production.s3-website-us-east-1.amazonaws.com/producto/` + productID ;
  const message = `Echa un vistazo a ${productName} en nuestro sitio: ${shareUrl}`;

  const width = 1024;
  const height = 800;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  const [extraData, setExtraData] = useState("");
  const options = `width=${width},height=${height},left=${left},top=${top}`;

  const handleExtraDataChange = (event) => {
    setExtraData(event.target.value);
  };

  const shareOnFacebook = () => {

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&t=${(productName)}`
  
    window.open(facebookShareUrl , "_blank", options);

  };

  const shareOnTwitter = () => {

    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;

    window.open(twitterShareUrl, "_blank", options);
  };

  const SendWhatsAppMessage = () => {
    const message = `Echa un vistazo a ${productName} en nuestro sitio: ${encodeURIComponent(shareUrl)}`;

    const formattedPhoneNumber = "";

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${message}`;

    window.open(whatsappUrl, "_blank", options);
  };

  return (
    <div className="share-modal">
      <div className="car-info">
      <img
        src={productImages[0]?.url || "https://via.placeholder.com/300"}
        alt="Imagen a compartir"
        className="shared-image"
      />
      <div className="car-to-share">
      <p>
        <strong>Nombre: </strong>
        {productName}
      </p>
      <p>
        <strong>Descripción: </strong>
        {productDescription}
      </p>
      <p>
        <strong>Precio: </strong>${productPrice}
      </p>
      </div>
      </div>
      <div className="social-buttons">
        <button className="facebook-button" onClick={shareOnFacebook}>
          <FacebookIcon/>
        </button>
        <button className="twitter-button" onClick={shareOnTwitter}>
          <TwitterIcon/>
        </button>
        <button className="whatsApp-button" onClick={SendWhatsAppMessage}>
          <WhatsAppIcon/>
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
