import React from "react";
import "./Politics.css";

const Politics = () => {
	return (
		<div className="politics">
			<h3 className="politics-title">Políticas de Uso del Automóvil</h3>
			<ul className="politics-list">
				<li>
					<div className="columnn-politic">
					<h4>Reservas</h4>
					<p>
						Debes reservar tu automóvil con al menos 24 horas de
						antelación.
					</p>
					</div>
				</li>
				<li>
					<div className="columnn-politic">
					<h4>Documentos requeridos</h4>
					<p>
						Para recoger el automóvil, debes presentar una licencia
						de conducir válida y una tarjeta de crédito.
					</p>
					</div>
				</li>
				<li>
					<div className="columnn-politic">
					<h4>Kilometraje</h4>
					<p>
						Los precios incluyen un límite de kilometraje diario. Se
						aplicarán cargos adicionales por exceder este límite.
					</p>
					</div>
				</li>
				<li>
					<div className="columnn-politic">
					<h4>Combustible</h4>
					<p>
						El automóvil se entrega con un tanque lleno de
						combustible y debe devolverse en las mismas condiciones.
						De lo contrario, se aplicarán cargos adicionales.
					</p>
					</div>
				</li>
				<li>
				<div className="columnn-politic">
					<h4>Política de cancelación</h4>
					<p>
						Puedes cancelar tu reserva con al menos 48 horas de
						anticipación para obtener un reembolso completo. Las
						cancelaciones realizadas después de este plazo no serán
						reembolsables.
					</p>
					</div>
				</li>
				<li>
					<div className="columnn-politic">
					<h4>Pago por adelantado</h4>
					<p>
						Se requiere un pago por adelantado del 50% al confirmar
						tu reserva. El saldo restante se debe pagar al recoger
						el automóvil.
					</p>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Politics;
