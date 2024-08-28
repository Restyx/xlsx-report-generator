import { Router } from "express";

import Paths from "../common/Paths";
import CommentsRoutes from "./CommentsRoutes";

// **** Variables **** //

const apiRouter = Router();

// ** Add UserRouter ** //

// Init router
const commentsRouter = Router();

// Get all data
commentsRouter.get("", CommentsRoutes.getAll);

// Add DataRouter
apiRouter.use(Paths.Comments.Base, commentsRouter);

// **** Export default **** //

export default apiRouter;
