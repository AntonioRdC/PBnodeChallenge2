import type { Request, Response } from 'express';
import PetService from '../services/PetService';
import DuplicateKeyError from '../errors/DuplicateKeyError';

class PetController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { tutorId } = req.params;
      const result = await PetService.create(tutorId, req.body);

      return res.status(201).json(result);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res
          .status(400)
          .json(DuplicateKeyError(Object.keys(error.errors)));
      }
      if (error.statusCode !== undefined) {
        return res.status(error.statusCode).json({
          message: error.name,
          details: error.message,
        });
      }
      return res.status(500).json(error);
    }
  }

  async put(req: Request, res: Response): Promise<Response> {
    try {
      const { petId, tutorId } = req.params;
      const result = await PetService.put(petId, tutorId, req.body);
      return res.status(200).json(result);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res
          .status(400)
          .json(DuplicateKeyError(Object.keys(error.errors)));
      }
      if (error.statusCode !== undefined) {
        return res.status(error.statusCode).json({
          message: error.name,
          details: error.message,
        });
      }
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { petId, tutorId } = req.params;
      await PetService.delete(petId, tutorId);
      return res.status(204).json();
    } catch (error) {
      if (error.statusCode !== undefined) {
        return res.status(error.statusCode).json({
          message: error.name,
          details: error.message,
        });
      }
      return res.status(500).json(error);
    }
  }
}

export default new PetController();
