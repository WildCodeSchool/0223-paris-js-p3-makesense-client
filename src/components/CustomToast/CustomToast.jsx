import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomToast = () => {
  const [alerts, setAlerts] = useState([]);
  const showAlertRef = useRef(null);

  useEffect(() => {
    showAlertRef.current = showAlert;
  }, []);

  useEffect(() => {
    if (alerts.length > 0) {
      const { type, message } = alerts[0];
      const options = getToastOptions(type, message);
      typeof toast[type] === "function"
        ? toast[type](message, options)
        : toast.error(
            `ERROR: Le type d'alerte "${type}" n'existe pas!`,
            options
          );
      setAlerts((prevAlerts) => prevAlerts.slice(1));
    }
  }, [alerts]);

  const showAlert = (type, message) => {
    setAlerts((prevAlerts) => [...prevAlerts, { type, message }]);
  };

  const getToastOptions = (type, message) => {
    const commonOptions = {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    switch (type) {
      case "error":
        return {
          ...commonOptions,
          theme: "custom_toast_alert_error",
          className: "custom_toast_alert_error",
        };
      case "success":
        return {
          ...commonOptions,
          theme: "custom_toast_alert_success",
          className: "custom_toast_alert_success",
        };
      case "info":
        return {
          ...commonOptions,
          theme: "custom_toast_alert_info",
          className: "custom_toast_alert_info",
        };
      case "warn":
        return {
          ...commonOptions,
          theme: "custom_toast_alert_warn",
          className: "custom_toast_alert_warn",
        };
      default:
        console.error(`ERROR: Le type d'alerte "${type}" n'existe pas!`);
        return {
          ...commonOptions,
          theme: "custom_toast_alert_error",
          className: "custom_toast_alert_error",
        };
    }
  };

  return { showAlert };
};

export default CustomToast;
