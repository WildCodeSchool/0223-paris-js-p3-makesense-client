import api from "./api";

const getAllUsers = () => {
    return api.get("/api/users");
}

const getCurrentUser = () => {
    return api.get("/api/users/me");
} 

const editUser = () => {
    return api.put("/api/users/:id")
}

export {getAllUsers, getCurrentUser, editUser};