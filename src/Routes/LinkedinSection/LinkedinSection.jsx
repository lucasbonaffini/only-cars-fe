import React from "react";
import "./LinkedinSection.css";
import { LinkeCard } from "../../Components/LinkeCards/LinkeCard";
import profiles from "../../Utils/profiles";

export function LinkedinSection() {


	return (
		<section className="linke-section">
			<article className="title-container">
				<h1>Linkedin Cards</h1>
				<h3>Engineers Team 06</h3>
			</article>
			<div className="card-group">
				{profiles.map((profile) => (
				<LinkeCard key={profile.id} profile={profile} />
				))}
			</div>
		</section>
	);
}
