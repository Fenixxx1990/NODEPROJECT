import { UserModel } from "@prisma/client";
import { User } from "./user.entity";
import { IUsersRepository } from "./users.repository.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { PrismaService } from "../database/prisma.service";

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, password, name }: User): Promise<UserModel> {
		return await this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}

	async find(email: string): Promise<UserModel | null> {
		return await this.prismaService.client.userModel.findUnique({
			where: { email: email },
		});
	}
}
