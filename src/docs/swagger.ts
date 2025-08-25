import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v0.0.1",
    title: "Dokumentasi API Notes sederhana",
    description: "Dokumentasi API Notes sederhana",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      // === AUTH ===
      LoginRequest: {
        identifier: "samudra",
        password: "Samudra2025!",
      },
      RegisterRequest: {
        fullName: "samudra",
        username: "osaa",
        email: "osa@gmail.com",
        password: "Osam_1234",
        confirmPassword: "Osam_1234",
      },
      LoginResponse: {
        token: "jwt.token.here",
        user: {
          id: "64ac0f62b12f2a2c9f9e5c99",
          fullName: "John Doe",
          username: "johndoe",
          email: "johndoe@mail.com",
        },
      },
      UpdatePasswordRequest: {
        oldPassword: "",
        password: "",
        confirmPassword: "",
      },

      // === NOTES ===
      NoteRequest: {
        title: "Belajar Express",
        content: "Hari ini belajar CRUD dengan Express dan JWT",
      },
      NoteResponse: {
        id: "64ac0f62b12f2a2c9f9e5c11",
        title: "Belajar Express",
        content: "Hari ini belajar CRUD dengan Express dan JWT",
        userId: "64ac0f62b12f2a2c9f9e5c99",
        createdAt: "2025-08-24T10:00:00Z",
        updatedAt: "2025-08-24T10:10:00Z",
      },
      NotesListResponse: [
        {
          id: "64ac0f62b12f2a2c9f9e5c11",
          title: "Belajar Express",
          content: "Hari ini belajar CRUD dengan Express dan JWT",
          userId: "64ac0f62b12f2a2c9f9e5c99",
          createdAt: "2025-08-24T10:00:00Z",
          updatedAt: "2025-08-24T10:10:00Z",
        },
        {
          id: "64ac0f62b12f2a2c9f9e5c12",
          title: "Belajar JWT",
          content: "JWT dipakai untuk autentikasi",
          userId: "64ac0f62b12f2a2c9f9e5c99",
          createdAt: "2025-08-24T11:00:00Z",
          updatedAt: "2025-08-24T11:10:00Z",
        },
      ],
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];
swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
