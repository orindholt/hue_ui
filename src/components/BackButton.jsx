import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
	const navigate = useNavigate();

	return (
		<button
			type="button"
			onClick={() => navigate(-1)}
			className="text-black text-4xl fixed top-5 left-10 z-10"
		>
			<IoArrowBack />
		</button>
	);
};

export default BackButton;
