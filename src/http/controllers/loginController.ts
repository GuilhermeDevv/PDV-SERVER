import { Request, Response } from "express";
import { PrismaRepository } from "../../repository/Login/PrismaRepository";
import { GetFuncionarioJWTServices } from "../../services/GetFuncionarioJWTServices";
import { GetFuncionarioServices } from "../../services/GetFuncionarioServices";
import { ICustomRequest } from "../../server";
import { GetInfoUserServices } from "../../services/GetInfoUserServices";

class LoginController {
  async login(req: Request, res: Response) {
    const repository = new PrismaRepository();
    const getFuncionarioServices = new GetFuncionarioJWTServices(repository);

    const { data, error, statusCode, message } =
      await getFuncionarioServices.execute(req.body);

    res.status(statusCode).json({ data, error, message });
  }

  async user(req: ICustomRequest, res: Response) {
    const repository = new PrismaRepository();
    const getFuncionarioServices = new GetFuncionarioServices(repository);

    const { data, error, statusCode, message } =
      await getFuncionarioServices.execute(req.user);

    res.status(statusCode).json({ data, error, message });
  }

  async auth(req: ICustomRequest, res: Response) {
    res.status(200).json({ message: "Token válido" });
  }

  async infoUser(req: ICustomRequest, res: Response) {
    const repository = new PrismaRepository();
    const getFuncionarioServices = new GetInfoUserServices(repository);

    const { data, error, statusCode, message } =
      await getFuncionarioServices.execute(req.user);

    res.status(statusCode).json({ data, error, message });
  }
}

export default new LoginController();
