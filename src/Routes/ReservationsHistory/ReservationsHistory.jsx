import React, { useEffect, useState } from "react";
import AccordionContainer from "../../Components/AccordionContainer/AccordionContainer";
import FormattedTable from "../../Components/FormattedTable/FormattedTable";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import { isFutureDate } from "../../Utils/utils";
import axios from "axios";
import "./ReservationsHistory.css";

const ReservationsHistory = () => {
  const { user, authenticated } = useAuth();

  const [reservations, setReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [futureReservations, setFutureReservations] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (authenticated) {
      const reservationsUrl = `${
        import.meta.env.VITE_API_URL
      }/reservas/usuarios/${user.email}`;
      axios(reservationsUrl).then((res) => {
        setReservations(res.data);
      });
    }
  }, [authenticated]);

  useEffect(() => {
    setPastReservations(
      ...pastReservations,
      reservations.filter((reservation) => !isFutureDate(reservation.startDate))
    );
    setFutureReservations(
      ...futureReservations,
      reservations.filter((reservation) => isFutureDate(reservation.startDate))
    );
  }, [reservations]);

  return (
    <div className="reservation">
      <h1>Mis Reservas</h1>
      <div>
        <AccordionContainer
          title="Las Reservas Que Vienen"
          defaultExpanded={true}
        >
          <FormattedTable rows={futureReservations} />
        </AccordionContainer>
      </div>
      <div>
        <AccordionContainer title="Tus Reservas Pasadas">
          <FormattedTable rows={pastReservations} />
        </AccordionContainer>
      </div>
    </div>
  );
};

export default ReservationsHistory;
