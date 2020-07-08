import axios from "axios";
import router from "@/router";

const httpClient = axios.create({
	baseURL: process.env.VUE_APP_API_ENDPOINT,
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
	}
});

const getAuthToken = () => localStorage.getItem("token-usuario");

const authInterceptor = (config) => {

	const token = getAuthToken();
	if (token) {
		config.headers["Authorization"] = "Bearer "+ token;
	}
	return config;
};

httpClient.interceptors.request.use(authInterceptor);

// interceptor to catch errors
const errorInterceptor = error => {
	// all the error responses
	switch(error.response.status) {
	case 400:
		console.error(error.response.status, error.message);
		break;

	case 401:
		localStorage.removeItem("token-usuario");
		break;

	default:
		console.error(error.response.status, error.message);
	}
	return Promise.reject(error);
};

// Interceptor for responses
const responseInterceptor = response => {
	switch(response.status) {
	case 200: 
		// yay!
		break;
		// any other cases
	default:
            // default case
	}

	return response;
};

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);


export default httpClient;