import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
<<<<<<< HEAD
import users from "./users"
import project from "./projectSlice"

export default configureStore({
  reducer: { auth, users, project },
=======
import users from "./users";
import jobs from "./jobs";
import roles from "./roles";
import posts from "./posts";
import avis from "./avis";

export default configureStore({
  reducer: { auth, users, jobs, roles, posts, avis },
>>>>>>> ff4aaf0e7bdbf0cb041fe7229805aa94e40d1efe
});
