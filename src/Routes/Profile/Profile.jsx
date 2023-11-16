import React, { useState } from "react";
import "./Profile.css";
import axios from "axios";
import { validateEmail } from "../../Utils/utils";
import { useAuth } from "../../Components/AuthContext/AuthContext";

export function Profile() {
	const [username, setUsername] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const { user, state, isAuthenticated } = useAuth();

	console.log(user);

	const usersUrl = `${import.meta.env.VITE_API_URL}/usuarios`;

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!username || !lastName || !email || !password || !confirmPassword) {
			setError("Por favor, complete todos los campos.");
			return;
		}

		if (!validateEmail(email)) {
			setError("El email no es válido.");
			return;
		}

		if (password.length < 6) {
			setError("La contraseña debe tener al menos 6 caracteres.");
			return;
		}

		if (password !== confirmPassword) {
			setError("Las contraseñas no coinciden.");
			return;
		}

		setError("");

		axios
			.post(usersUrl, {
				username: username,
				lastName: lastName,
				email: email,
				password: password,
			})
			.then(() => {
				alert("Usuario creado con éxito");
				setUsername("");
				setLastName("");
				setEmail("");
			})
			.catch((err) => {
				console.log(err);
				alert("Error al crear usuario");
			});
	};

	return (
		<section className="user-section">
			<form className="user-form" onSubmit={handleSubmit}>
				{error && <div className="error-message">{error}</div>}
				<p className="user-title">Configuración de mis datos</p>
				<p className="user-message">
					Configura tu perfil para que podamos conocerte mejor
				</p>

				<label htmlFor="username">
					<input
						required
						id="username"
						placeholder="Juan Pedro"
						type="text"
						className="user-input"
						value={user.firstname}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<span>Nombre</span>
				</label>

				<label htmlFor="lastName">
					<input
						required
						id="lastName"
						placeholder="Peréz"
						type="text"
						className="user-input"
						value={user.lastname}
						onChange={(e) => setLastName(e.target.value)}
					/>
					<span>Apellido</span>
				</label>
				<label htmlFor="email">
					<input
						required
						id="email"
						placeholder="juan_perez@gmail.com"
						type="email"
						className="user-input"
						value={user.username}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<span>Correo</span>
				</label>
				<button type="submit" className="user-submit">
					Actualizar
				</button>
			</form>
		</section>
	);
}
