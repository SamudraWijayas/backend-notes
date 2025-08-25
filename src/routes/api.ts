import express from "express";
import authController from "../controllers/auth.controller";
import NotesController from "../controllers/notes.controller";
import auth from "../middleware/auth.middleware";
import acl from "../middleware/acl.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

// ================== AUTH ==================
router.post(
  "/auth/register",
  authController.register
  /*
  #swagger.tags = ['Auth']
  #swagger.summary = 'Register user baru'
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/RegisterRequest" }
  }
  #swagger.responses[201] = {
    description: "User berhasil terdaftar",
    schema: { $ref: "#/components/schemas/UserResponse" }
  }
  */
);

router.post(
  "/auth/login",
  authController.login
  /*
  #swagger.tags = ['Auth']
  #swagger.summary = 'Login user'
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/LoginRequest" }
  }
  #swagger.responses[200] = {
    description: "Login berhasil, token JWT dikembalikan",
    schema: { $ref: "#/components/schemas/LoginResponse" }
  }
  */
);

router.put(
  "/auth/update-password",
  [auth, acl([ROLES.USER, ROLES.ADMIN])],
  authController.updatePassword
  /*
  #swagger.tags = ['Auth']
  #swagger.summary = 'Update Password'
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/UpdatePasswordRequest"
    }
  }
  */
);

router.get(
  "/auth/me",
  auth,
  authController.me
  /*
  #swagger.tags = ['Auth']
  #swagger.summary = 'Ambil data user yang sedang login'
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

// ================== NOTES ==================
router.post(
  "/notes",
  auth,
  NotesController.create
  /*
  #swagger.tags = ['Notes']
  #swagger.summary = 'Buat note baru'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/NoteRequest" }
  }
  #swagger.responses[201] = {
    description: "Note berhasil dibuat",
    schema: { $ref: "#/components/schemas/NoteResponse" }
  }
  */
);

router.get(
  "/notes",
  auth,
  NotesController.findAll
  /*
  #swagger.tags = ['Notes']
  #swagger.summary = 'Ambil semua note'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.responses[200] = {
    description: "List semua note",
    schema: { $ref: "#/components/schemas/NotesListResponse" }
  }
  */
);

router.get(
  "/notes/user",
  auth,
  NotesController.getAllByUser
  /*
  #swagger.tags = ['Notes']
  #swagger.summary = 'Ambil semua note milik user login'
  #swagger.security = [{ "bearerAuth": [] }]
  */
);

router.get(
  "/notes/:id",
  auth,
  NotesController.getOne
  /*
  #swagger.tags = ['Notes']
  #swagger.summary = 'Ambil note berdasarkan ID'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.parameters['id'] = { description: "ID Note", type: "string" }
  */
);

router.get(
  "/notes/user/:id",
  auth,
  NotesController.getOneByUser
  /*
  #swagger.tags = ['Notes']
  #swagger.summary = 'Ambil note milik user berdasarkan ID'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.parameters['id'] = { description: "ID Note", type: "string" }
  */
);

router.put(
  "/notes/:id",
  auth,
  NotesController.update
  /*
  #swagger.tags = ['Notes']
  #swagger.summary = 'Update note berdasarkan ID'
  #swagger.parameters['id'] = { description: "ID Note", type: "string" }
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/NoteRequest" }
  }
  */
);

router.delete(
  "/notes/:id",
  auth,
  NotesController.remove
  /*
  #swagger.tags = ['Notes']
  #swagger.summary = 'Hapus note berdasarkan ID'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.parameters['id'] = { description: "ID Note", type: "string" }
  */
);

export default router;
