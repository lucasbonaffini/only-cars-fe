import { useState, useEffect } from "react";
import axios from "axios";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import "./Calendar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import Modal from "@mui/material/Modal";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { es } from "date-fns/locale";

export default function Calendar({ productId, product }) {
  const [range, setRange] = useState({ from: null, to: null });
  const [disabledDays, setDisabledDays] = useState([]);
  const { user, authenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const newArray = (reservas) => {
    let disabledDays = [];

    reservas.forEach((item) => {
      const startDateParts = item.startDate.split("-");
      const endDateParts = item.endDate.split("-");

      const startDate = new Date(
        startDateParts[0],
        startDateParts[1] - 1,
        startDateParts[2]
      );

      const endDate = new Date(
        endDateParts[0],
        endDateParts[1] - 1,
        endDateParts[2]
      );

      disabledDays.push({
        from: startDate,
        to: endDate,
      });
    });

    disabledDays.push({ before: new Date() });
    setDisabledDays(disabledDays);
  };

  const fetchData = async () => {
    if (productId !== 0 && productId !== null) {
      const productsUrl = `${
        import.meta.env.VITE_API_URL
      }/reservas/productos/${productId}`;
      try {
        const response = await axios.get(productsUrl);
        newArray(response.data);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      }
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchData();
  }, [productId]);
  const navigate = useNavigate();

  const handleReservarClick = () => {
    if (range && range.from && range.to) {
      confirm("Reserva realizada con éxito. Gracias por confiar en nosotros.");
      if (confirm) {
        handleOpen();
        navigate("/");
      }

      const productsUrl = `${
        import.meta.env.VITE_API_URL
      }/reservas/productos/${productId}`;
      const requestData = {
        userEmail: user.email,
        startDate: range.from.toISOString().slice(0, 10),
        endDate: range.to.toISOString().slice(0, 10),
        userFirstName: user.firstname,
      };

      axios
        .post(productsUrl, requestData)
        .then(async (response) => {
          await fetchData();
          setRange({ from: null, to: null });
        })
        .catch((error) => {
          console.error("Error al hacer la reserva:", error);
          alert(
            "Error al hacer la reserva. Por favor, inténtalo de nuevo más tarde."
          );
        });
    } else {
      alert("Selecciona un rango válido antes de reservar.");
    }
    navigate("/reservaOk");
  };

  function capitalizeFirstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return "";
    }
  }

  return (
    <div className="container-calendar">
      <h1>Selecciona tus fechas de reserva</h1>
      <DayPicker
        defaultMonth={new Date()}
        mode="range"
        selected={range}
        onSelect={setRange}
        disabled={disabledDays}
        locale={es}
      />
      <Modal open={open} onClose={handleOpen} className="backdrop-modal">
        <div className="backdrop-data">
          <h1>
            <CalendarMonthIcon />
            Ticket de reserva
          </h1>

          <p>
            *{" "}
            <strong>
              {capitalizeFirstLetter(user?.firstname)}{" "}
              {capitalizeFirstLetter(user?.lastname)}
            </strong>
            , vas a reservar el : <strong>{product?.name}</strong>
            {"	"}
          </p>
          <p>
            * Desde el:{" "}
            <strong>
              {range.from ? range.from.toISOString().slice(0, 10) : ""}
            </strong>
          </p>
          <p>
            * Hasta el:{" "}
            <strong>
              {range.to ? range.to.toISOString().slice(0, 10) : ""}
            </strong>
          </p>
          <p>{product?.description}</p>
          <figure className="img-container">
            <img src={product?.images[0]?.url} alt="" />
          </figure>

          <p>
            * Enviaremos la confirmación de la reserva a :{" "}
            <strong>{user?.email}</strong>
          </p>
          <div className="btn-container1">
            <div className="checkbox-container">
              <p>Acepto los terminos y condiciones</p>
              <label htmlFor="cbx" className="cbx">
                <div className="checkmark">
                  <input
                    type="checkbox"
                    id="cbx"
                    value={(isCheck, setIsCheck)}
                    onChange={(e) => {
                      setIsCheck(e.target.checked);
                    }}
                  />
                  <div className="flip">
                    <div className="front"></div>
                    <div className="back">
                      <svg viewBox="0 0 16 14" height="14" width="16">
                        <path d="M2 8.5L6 12.5L14 1.5"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <button
              className={`button ${!isCheck ? "button-disabled" : ""}`}
              onClick={handleReservarClick}
              disabled={!isCheck}
            >
              <CheckIcon />
              Confirmar reserva
            </button>
            <button onClick={handleOpen}>
              <CloseIcon />
              Cancelar reserva
            </button>
          </div>
        </div>
      </Modal>
      <div>
        <button
          className={`button ${
            !range || !range.from || !range.to || !authenticated
              ? "button-disabled"
              : ""
          }`}
          onClick={authenticated && handleOpen}
          disabled={!range || !range.from || !range.to}
        >
          Ir a reservar
        </button>
        <p style={{ color: "red" }}>
          {authenticated
            ? ""
            : "Debe iniciar sesión para poder reservar el producto"}
        </p>
      </div>
    </div>
  );
}
