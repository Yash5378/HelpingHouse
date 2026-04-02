import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import axios from "axios";

let hasRedirected = false;

const isTokenExpiredError = (error) => {
  const httpStatus = error?.response?.status;
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message;

  if (httpStatus === 401) {
    return /token expired|access token expired|jwt expired|invalid token/i.test(
      String(message),
    );
  }

  return false;
};

export default function TokenExpiryHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (hasRedirected) {
          return Promise.reject(error);
        }

        if (isTokenExpiredError(error)) {
          hasRedirected = true;

          notification.error({
            message: "Session expired",
            description:
              "Access token expired. Please log in again to continue.",
            placement: "topRight",
            duration: 4,
          });

          localStorage.removeItem("userData");
          localStorage.removeItem("authToken");

          navigate("/login");
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return null;
}
    