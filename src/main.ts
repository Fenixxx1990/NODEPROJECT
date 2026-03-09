import { Container } from "inversify";
import { App } from "./app";
import { ExeptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { IUserController } from "./users/users.controller.interface";
import { IUserService } from "./users/user.service.interface";
import { UserService } from "./users/users.service";
import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";
import { PrismaService } from "./database/prisma.service";
import { IUsersRepository } from "./users/users.repository.interface";
import { UsersRepository } from "./users/users.repository";

export interface IBootSrtapReturn {
	appContainer: Container;
	app: App;
}

function bootstrap(): IBootSrtapReturn {
	const appContainer = new Container();

	appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	appContainer.bind<IUserController>(TYPES.UserController).to(UserController);
	appContainer.bind<IUserService>(TYPES.UserService).to(UserService);
	appContainer.bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	appContainer.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	appContainer.bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	appContainer.bind<App>(TYPES.Application).to(App);

	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
