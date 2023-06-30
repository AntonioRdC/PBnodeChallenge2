import type { Request, Response } from 'express';
import TutorService from '../services/TutorService';
import DuplicateKeyError from '../errors/DuplicateKeyError';

class TutorController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const result = await TutorService.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res
          .status(400)
          .json(DuplicateKeyError(Object.keys(error.errors)));
      }
      return res.status(500).json(error);
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const result = await TutorService.get(req.query);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.name,
        details: error.message,
      });
    }
  }

  async put(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const result = await TutorService.put(id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res
          .status(400)
          .json(DuplicateKeyError(Object.keys(error.errors)));
      }
      return res.status(error.statusCode).json({
        message: error.name,
        details: error.message,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await TutorService.delete(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.name,
        details: error.message,
      });
    }
  }
}

export default new TutorController();
