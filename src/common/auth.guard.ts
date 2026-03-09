import { NextFunction, Response, Request } from "express";
import { IMiddleware } from "./middleware.interface";
import { error } from "node:console";

export class AuthGuard implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			return next();
		}
		res.status(401).send({ error: "Вы не авторизованы" });
	}
}
