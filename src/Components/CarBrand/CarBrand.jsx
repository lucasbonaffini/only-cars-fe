import nissan from "../../img/logo-nissan.png";
import dodge from "../../img/logo-dodge.png";
import honda from "../../img/logo-honda.png";
import mazda from "../../img/logo-mazda.png";
import mercedes from "../../img/logo-mercedes.png";
import peugeot from "../../img/logo-peugeot.png";
import toyota from "../../img/logo-toyota.png";
import "./CarBrand.css";

export function CarBrand() {
	return (
		<div className="carBrand">
			<img src={nissan} alt="" />
			<img src={dodge} alt="" />
			<img src={honda} alt="" />
			<img src={mazda} alt="" />
			<img src={mercedes} alt="" />
			<img src={peugeot} alt="" />
			<img src={toyota} alt="" />
		
		</div>
	);
}
