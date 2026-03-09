import { verify } from "jsonwebtoken";
import { Request as Req } from "express";

declare module "express" {
	export interface Request extends Req {
		user?: string;
	}
}

declare module "jsonwebtoken" {
	export function verify(
		token: string,
		secretOrPublicKey: Secret | GetPublicKeyOrSecret,
		callback?: VerifyCallback<JwtPayload>,
	): void;
}
