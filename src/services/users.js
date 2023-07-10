import api from "./api";

const getAllUsers = () => {
    return api.get("/api/users");
}

const getCurrentUser = () => {
    return api.get("/api/users/me");
}


export {getAllUsers, getCurrentUser};