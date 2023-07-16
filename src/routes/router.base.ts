import { Router } from "express";


abstract class BaseRouter {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    abstract initializeRoutes(): void;
}

export default BaseRouter;