import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./ModalReservation.css";
import photo from "../../img/llave.jpg";
import { useNavigate } from "react-router";
import check from "../../img/check1.png";

export function ModalReservation() {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate("/");
	};

	return (
		<Card className="card-reservation">
			<img className="check" src={check} alt="" />

			<CardActionArea>
				<CardMedia
					component="img"
					height="250"
					image={photo}
					alt="auto-ruta"
				/>
				<CardContent className="text-container">
					<Typography gutterBottom variant="h5" component="div">
						Tu reserva ha sido confirmada
					</Typography>
					<Typography className="text-reservation">
						En Only Cars, queremos agradecerle sinceramente por
						elegirnos como su empresa de alquiler de autos. Su
						confianza en nosotros es invaluable y estamos
						comprometidos a seguir ofreciéndole un servicio de alta
						calidad. Esperamos que su experiencia con nuestros
						vehículos haya sido satisfactoria y esperamos poder
						servirle nuevamente en el futuro
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button onClick={handleNavigate}>Ir a Home</Button>
			</CardActions>
		</Card>
	);
}
