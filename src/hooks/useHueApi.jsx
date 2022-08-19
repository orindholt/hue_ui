import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const userKey = "APr1gUkAyo6q0Xi4xfd9FHv2eZUPU2rLV0n50SOB";

const useHueApi = ({ group = false, id = "", method = "GET" }) => {
	const [data, setData] = useState(null);
	const [err, setErr] = useState(null);
	const [ipErr, setIpErr] = useState(null);
	const [localIp, setLocalIp] = useState(
		localStorage.getItem("localIp") || null
	);

	const getLocalIp = () => {
		axios({
			url: "https://discovery.meethue.com/",
			method: "GET",
		})
			.then(res => {
				localStorage.setItem("localIp", res.data.internalipaddress);
				setLocalIp(res.data.internalipaddress);
				callback();
			})
			.catch(err => {
				setIpErr(err);
			});
	};

	const callback = body => {
		axios({
			method,
			url: `http://${localIp}/api/${userKey}/${group ? "groups" : "lights"}${
				id ? "/" + id : ""
			}/${
				group && method.toUpperCase() === "PUT"
					? "action"
					: !group && method.toUpperCase() === "PUT"
					? "state"
					: ""
			}`,
			data: body || null,
		})
			.then(res => {
				if (res.data[0] && res.data[0].error) {
					console.log(res.data[0].error.description);
					throw { message: res.data[0].error.description };
				}
				setData(res.data);
			})
			.catch(error => {
				setErr(error);
			});
	};

	useEffect(() => {
		if (!localStorage.getItem("localIp") || ipErr) {
			getLocalIp();
		} else if (localStorage.getItem("localIp") && !ipErr && method === "GET") {
			callback();
		}
	}, [method, group, id, ipErr]);

	return { data, err, callback };
};

export default useHueApi;
