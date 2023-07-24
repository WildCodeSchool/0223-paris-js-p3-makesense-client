import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import users from "./users";
import jobs from "./jobs";
import roles from "./roles";

export default configureStore({
  reducer: { auth, users, jobs, roles },
});
