
import './ReservationOk.css'
import { ModalReservation } from '../../Components/ModalReservationOk/ModalReservation';

export function ReservationOk() {
	return (
		<section className='reservation-container1'>
			<h1>Estado de reserva</h1>
         <ModalReservation className="card-reservation"/>
		</section>
	);
}
