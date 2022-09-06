import { Router } from "express";
import { getHeaderData } from "./header.controller";

const headerRouter = Router();

headerRouter.get("/", getHeaderData);

export default headerRouter;
