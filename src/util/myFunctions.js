const rainToString = (rainData) => {
	// TODO: better logic.....
	if (rainData === 0) return "No";
	if (rainData >= 3) return "Yes";
	if (rainData === 2) return "Yeah";
	return "Maybe";
};

const zeroPad = (num, places) => String(num).padStart(places, "0");

const formatDate = (dateObj) => {
	var day = zeroPad(dateObj.getDate(), 2);
	var month = zeroPad(dateObj.getMonth() + 1, 2);
	var year = dateObj.getFullYear();
	return "" + year + "-" + month + "-" + day;
};

const getWeatherUrl = (lat, lng) => {
	const myTimeZone = encodeURIComponent(
		Intl.DateTimeFormat().resolvedOptions().timeZone
	);
	const today = formatDate(new Date());
	const tomorrow = formatDate(
		new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
	);
	return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours&timezone=${myTimeZone}&start_date=${today}&end_date=${tomorrow}`;
};

const toLocaleString = (l) => {
	let regionNames = new Intl.DisplayNames(["en"], { type: "region" });

	if (!l) return "Error: bad location";
	if (l.adminArea5 === "") {
		if (l.adminArea3 === "") {
			return regionNames.of(l.adminArea1);
		}
		return l.adminArea3 + ", " + l.adminArea1;
	}
	return l.adminArea5 + ", " + l.adminArea1;
};

export { rainToString, getWeatherUrl, toLocaleString };
