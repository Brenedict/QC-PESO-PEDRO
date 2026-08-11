import type { RouteObject } from "react-router";

// Routes split
import { authRoutes } from "./routes/AuthRoutes";
import { protectedRoutes } from "./routes/ProtectedRoutes";

const routes: RouteObject[] = [...authRoutes, ...protectedRoutes];

// Export combined routes
export default routes;
