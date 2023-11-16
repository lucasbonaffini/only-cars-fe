import React, { useState, useEffect } from "react";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import "./DateSearch.css";
import axios from "axios";

export function DateSearch({onReservarClick}) {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [reservations, setReservations] = useState([]);
	const [message, setMessage] = useState({message:'',error:false});

	const reservationURL = `${import.meta.env.VITE_API_URL}/reservas`;

	useEffect(() => {
		fetchReservations();
	}, []);

	const fetchReservations = async () => {
		try {
			const response = await axios.get(reservationURL);
			setReservations(response.data);
		} catch (error) {
			console.error("Error al obtener las reservas:", error);
		}
	};

	function checkDateisValid(date){
	  	return date instanceof Date && !isNaN(date);
	}

	const reservationFilter = () => {
		const inputStartDate = new Date(startDate)
		const inputEndDate = new Date(endDate)
		if (!checkDateisValid(inputStartDate)||!checkDateisValid(inputEndDate)) {
			setMessage(
				{
					message:"Las fechas de inicio y fin son obligatorias.",
					error:true
				}
			);
		} else if (inputStartDate >= inputEndDate) {
			setMessage(
				{
					message:"La fecha de inicio no puede ser mayor o igual a la fecha de fin.",
					error:true
				}
			);
		} else{
			setMessage(
				{
					message:"",
					error:false
				}
			);
			filterBookedProducts(inputStartDate,inputEndDate)
		}
	};

	const filterBookedProducts = (inputStartDate,inputEndDate) => {
		const prodArray = reservations.map((reservation) => {
			
			const reservationStart = new Date(reservation.startDate);
			const reservationEnd = new Date(reservation.endDate);
	  
			if (
			  (inputStartDate < reservationStart && inputEndDate < reservationStart) ||
			  (inputStartDate > reservationEnd)
			) {
				return null
			}else{
				return reservation.product_id;
			}
	  
		  });
		onReservarClick(prodArray);
	}

	return (
		<section className="section2">
			<legend className="title">
				<EventAvailableIcon />
				Disponibilidad
			</legend>
			<legend className="subtitle">*Selecciona el periodo de tu alquiler</legend>
			<div className="div-reserva">
				<input
					className="startDate"
					type="date"
					name="startDate"
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
				/>
				<input
					className="endDate"
					type="date"
					name="endDate"
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
				/>
			</div>
			<button
				className="create-btn"
				onClick={(e) => {
					e.preventDefault();
					reservationFilter();
				}}>
				<svg
					width="17"
					height="16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					aria-labelledby="search">
					<path
						d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
						stroke="currentColor"
						strokeWidth="1.333"
						strokeLinecap="round"
						strokeLinejoin="round"></path>
				</svg>
				Verificar Disponibilidad
			</button>
			{message && <p 
				className={`${
						message.error
							? "error"
							: ""
					}`}>{message.message}</p>}
		</section>
	);
}
