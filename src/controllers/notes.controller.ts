import { Request, Response } from "express";
import Note, { noteDTO } from "../models/note.model";
import response from "../utils/response";
import { getUserData } from "../utils/jwt";

export default {
  async creates(req: Request, res: Response) {
    const { title, content } = req.body;
    const note = await Note.create({
      title,
      content,
      userId: (req as any).user.id,
    });
    res.json({ message: "Note created", note });
  },

  async create(req: Request, res: Response) {
    try {
      // validasi body
      await noteDTO.validate(req.body);


      // create note dengan userId dari token
      const result = await Note.create({
        ...req.body,
        userId: (req as any).user.id, // inject userId
      });

      response.success(res, result, "success create a note");
    } catch (error) {
      response.error(res, error, "failed create note");
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const result = await Note.find().sort({ createdAt: -1 }).exec();

      response.success(res, result, "success find all note");
    } catch (error) {
      response.error(res, error, "failed find all note");
    }
  },

  async getAllByUser(req: Request, res: Response) {
    const notes = await Note.find({ userId: (req as any).user.id });
    try {
      const notes = await Note.find({ userId: (req as any).user.id });

      response.success(res, notes, "success find all note");
    } catch (error) {
      response.error(res, error, "failed find all note");
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const note = await Note.findOne({ _id: id });
      if (!note)
        return response.error(res, "Note not found", "failed get note");

      response.success(res, note, "success get note");
    } catch (error) {
      response.error(res, error, "failed get note");
    }
  },
  async getOneByUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const note = await Note.findOne({ _id: id, userId: (req as any).user.id });
      if (!note)
        return response.error(res, "Note not found", "failed get note");

      response.success(res, note, "success get note");
    } catch (error) {
      response.error(res, error, "failed get note");
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await noteDTO.validate(req.body);

      // const token = req.headers.authorization?.split(" ")[1];
      // if (!token)
      //   return response.error(res, "Unauthorized", "failed update note");

      // const user = getUserData(token);

      const updated = await Note.findOneAndUpdate(
        { _id: id }, // cek note milik user
        { ...req.body },
        { new: true }
      );

      if (!updated)
        return response.error(res, "Note not found", "failed update note");

      response.success(res, updated, "success update note");
    } catch (error) {
      response.error(res, error, "failed update note");
    }
  },

  // ✅ Remove Note
  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleted = await Note.findOneAndDelete({
        _id: id,
      });

      if (!deleted)
        return response.error(res, "Note not found", "failed delete note");

      response.success(res, deleted, "success delete note");
    } catch (error) {
      response.error(res, error, "failed delete note");
    }
  },
};
