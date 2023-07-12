import api from "./api";

const getAllUsers = () => {
    return api.get("/api/users");
}

const getCurrentUser = () => {
    return api.get("/api/users/me");
} 

const editUser = (data) => {
    return api.put("/api/users/", data);
}

export {getAllUsers, getCurrentUser, editUser};
