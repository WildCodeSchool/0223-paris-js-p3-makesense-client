import api from "./api";

const getAllUsers = () => {
    return api.get("/api/users");
}

const getCurrentUser = () => {
    return api.get("/api/users/me").then(data => {console.log("Mes data de getCurrentUser ", data)});
}


export {getAllUsers, getCurrentUser};