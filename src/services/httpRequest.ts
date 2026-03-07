import axios from "axios";

export const createHttp = (baseURL: string) => {
    const instance = axios.create({
        baseURL,
        headers: { "Content-Type": "application/json" },
    });

    // Interceptor de request → adiciona token
    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("access_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Interceptor de response → renova token em caso de 401
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const refreshToken = localStorage.getItem("refresh_token");
                    if (refreshToken) {
                        const response = await axios.post(
                            `${process.env.NEXT_PUBLIC_BASEURL}/auth/refresh`,
                            { refresh_token: refreshToken }
                        );

                        const { access_token, refresh_token: newRefreshToken } = response.data;

                        localStorage.setItem("access_token", access_token);
                        localStorage.setItem("refresh_token", newRefreshToken);

                        instance.defaults.headers.Authorization = `Bearer ${access_token}`;
                        originalRequest.headers.Authorization = `Bearer ${access_token}`;

                        return instance(originalRequest);
                    }
                } catch (err) {
                    console.error("Erro ao renovar token:", err);
                    localStorage.clear();
                    window.location.href = "/login";
                }
            }

            return Promise.reject(error);
        }
    );

    return instance;
};
