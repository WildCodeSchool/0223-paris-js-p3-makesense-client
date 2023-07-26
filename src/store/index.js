import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import users from "./users"
import avis from "./avis"

export default configureStore({
  reducer: { auth, users, avis },
});
