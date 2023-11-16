import OnlyCars_1 from "../../img/OnlyCars_2.png";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { routes } from "../../Utils/routes";
import "./Footer.css";
import ApartmentIcon from "@mui/icons-material/Apartment";
import InfoIcon from "@mui/icons-material/Info";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import YouTubeIcon from "@mui/icons-material/YouTube";
const Footer = () => {
	const handleClick = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-logo">
					<Link onClick={handleClick}>
						<img src={OnlyCars_1} alt="OnlyCars Logo" />
					</Link>

					<div className="social-icons">
						<Link onClick={handleClick} to={routes.linkedin}>
							<WhatsAppIcon className="social-icon" />
						</Link>
						<Link onClick={handleClick} to={routes.linkedin}>
							<InstagramIcon className="social-icon" />
						</Link>
						<Link onClick={handleClick} to={routes.linkedin}>
							<FacebookIcon className="social-icon" />
						</Link>
						<Link onClick={handleClick} to={routes.linkedin}>
							<LinkedInIcon className="social-icon" />
						</Link>
					</div>
					<p>&copy; {new Date().getFullYear()} OnlyCars - Team06</p>
					<p>Todos los derechos reservados</p>
				</div>

				<div className="footer-info">
					<h6>
						<ApartmentIcon className="icon-footer" />
						COMPANY
					</h6>
					<Link onClick={handleClick} to={routes.linkedin}>
						About
					</Link>
					<Link onClick={handleClick} to={routes.linkedin}>
						Features
					</Link>
					<Link onClick={handleClick} to={routes.linkedin}>
						Works
					</Link>
					<Link onClick={handleClick} to={routes.linkedin}>
						Carrer
					</Link>
				</div>

				<div className="footer-info">
					<h6>
						<InfoIcon className="icon-footer" />
						HELP
					</h6>
					<Link onClick={handleClick} to={routes.linkedin}>
						Customer{" "}
					</Link>
					<Link onClick={handleClick} to={routes.linkedin}>
						Delivery Details
					</Link>
					<Link onClick={handleClick} to={routes.linkedin}>
						Terms & Conditions
					</Link>
					<Link onClick={handleClick} to={routes.linkedin}>
						Privacy Policy
					</Link>
				</div>

				<div className="footer-info">
					<h6>
						<LiveHelpIcon className="icon-footer" />
						FAQ
					</h6>
					<Link onClick={handleClick} to={routes.linkedin}>
						Account
					</Link>
					<Link onClick={handleClick} to={routes.linkedin}>
						Delivery Details
					</Link>
					<Link onClick={handleClick} to={routes.linkedin}>
						Manage Delivery
					</Link>
					<Link onClick={handleClick} to={routes.linkedin}>
						Order
					</Link>
				</div>

				<div className="footer-info">
					<h6>
						<YouTubeIcon className="icon-footer" />
						RESOURCES
					</h6>
					<Link onClick={handleClick} to={routes.linkedin}>
						Development Tutorial
					</Link>
					<Link onClick={handleClick} to={routes.linkedin}>
						How to - Blog{" "}
					</Link>
					<Link onClick={handleClick} to={routes.linkedin}>
						Youtube Playlist
					</Link>
					<Link onClick={handleClick} to={routes.linkedin}>
						Payments
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
