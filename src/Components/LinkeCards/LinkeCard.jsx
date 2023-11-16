import React from "react";
import "./LinkeCard.css";
import { Link } from "react-router-dom";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ConstructionIcon from "@mui/icons-material/Construction";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import logo from "../../img/OnlyCars_2.png";
import only1 from "../../img/ideogram1.jpeg";
import only2 from "../../img/ideogram2.jpeg";
import only3 from "../../img/ideogram3.jpeg";
import only4 from "../../img/ideogram4.jpeg";
import only5 from "../../img/ideogram5.jpeg";
import only6 from "../../img/ideogram6.jpeg";
import only7 from "../../img/ideogram7.jpeg";
import only8 from "../../img/ideogram8.jpeg";
import only9 from "../../img/ideogram9.jpeg";

export function LinkeCard({ profile }) {
	return (
		<article className="linke-card">
			<img src={logo} alt="logo" className="only-logo" />
			<img
			src={
				profile.image === "only1" ? only1 : 
				profile.image === "only2" ? only2 : 
				profile.image === "only3" ? only3 : 
				profile.image === "only4" ? only4 :
				profile.image === "only5" ? only5 :
				profile.image === "only6" ? only6 :
				profile.image === "only7" ? only7 :
				profile.image === "only8" ? only8 :
				profile.image === "only9" ? only9 : ""
			}
			alt="Perfil"
			className="profile-image truck"
			/>
			<div className="data-container">
			<p>
				<ConstructionIcon className="link-icon" />
				{profile.role}
			</p>
			<p>
				<EngineeringIcon className="link-icon" />
				{profile.name}
			</p>
			<Link className="link" to={profile.linkedInUrl} target="_blank">
				<LinkedInIcon className="link-icon" />
				Mi LinkedIn
			</Link>
			<Link className="link" to={profile.githubUrl} target="_blank">
				<GitHubIcon className="link-icon" />
				Mi Github
			</Link>
			</div>
		</article>
		);
	}