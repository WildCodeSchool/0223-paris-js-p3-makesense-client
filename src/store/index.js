import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import users from "./users"
import project from "./projectSlice"

export default configureStore({
  reducer: { auth, users, project },
});
