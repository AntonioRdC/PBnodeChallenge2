import type { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const result = await AuthService.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new AuthController();
