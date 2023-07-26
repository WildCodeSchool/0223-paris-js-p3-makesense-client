import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import users from "./users";
import jobs from "./jobs";
import roles from "./roles";
import posts from "./posts";
import avis from "./avis";

export default configureStore({
  reducer: { auth, users, jobs, roles, posts, avis },
});
