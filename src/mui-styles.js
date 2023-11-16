import { blue } from "@mui/material/colors";

export const muiStyles = {
	button: {
		margin: "1rem",
		backgroundColor: blue[800],
		color: "white",
		borderRadius: "60px",
		border: "none",
		textTransform: "none",
		fontSize: "13px",
		lineHeight: "1.5",
		maxHeight: "40px",
		"@media (max-width: 375px)": {
			lineHeight: "1.0",
			padding: "6px 5px",
		},
		"&:hover": {
			cursor: "pointer",
			backgroundColor: "white",
			color: "black",
		},
	},
	input: {
		marginTop: "1rem",
		color: "black",
	},
	card: {
		maxWidth: "50rem",
		margin: "2rem",
	},
	cardMedia: {
		width: "25rem",
		height: "15rem",
	},
};
