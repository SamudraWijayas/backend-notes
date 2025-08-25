# Notes API

Sebuah RESTful API sederhana untuk manajemen catatan (notes) dengan autentikasi JWT, dibangun menggunakan TypeScript, Express.js, dan MongoDB.

## Fitur

- ✅ Autentikasi JWT
- ✅ CRUD Operations untuk Notes
- ✅ Validasi input dengan Yup
- ✅ Dokumentasi API dengan Swagger
- ✅ TypeScript untuk type safety
- ✅ CORS enabled

## Teknologi yang Digunakan

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB dengan Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Validation**: Yup
- **Documentation**: Swagger
- **Language**: TypeScript

## Prerequisites

Sebelum menjalankan proyek ini, pastikan Anda telah menginstall:

- Node.js (v16 atau lebih baru)
- MongoDB (local atau MongoDB Atlas)
- npm atau yarn

## Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd notes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Buat file `.env` di root directory dan isi dengan konfigurasi berikut:
   ```env
   DATABASE_URL=mongodb://localhost:27017/notes
   SECRET=your-super-secret-jwt-key-here
   CLIENT_HOST=http://localhost:3001
   PORT=3000
   ```

   **Penjelasan Environment Variables:**
   - `DATABASE_URL`: URL koneksi MongoDB (bisa local atau MongoDB Atlas)
   - `SECRET`: Secret key untuk JWT token (gunakan string yang kuat)
   - `CLIENT_HOST`: URL untuk client aplikasi (untuk CORS)
   - `PORT`: Port untuk server (default: 3000)

4. **Generate Swagger Documentation**
   ```bash
   npm run docs
   ```

5. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

   Server akan berjalan di `http://localhost:3000`

## Scripts yang Tersedia

- `npm run dev` - Menjalankan server dengan nodemon (development)
- `npm run docs` - Generate dokumentasi Swagger
- `npm test` - Menjalankan tests (belum diimplementasi)

## Struktur Project

```
src/
├── controllers/     # Business logic handlers
│   ├── auth.controller.ts
│   └── notes.controller.ts
├── docs/           # Swagger documentation
│   ├── route.ts
│   ├── swagger.ts
│   └── swagger_output.json
├── middleware/     # Custom middleware
│   ├── acl.middleware.ts
│   └── auth.middleware.ts
├── models/         # Database models
│   ├── note.model.ts
│   └── user.model.ts
├── routes/         # API routes
│   └── api.ts
├── utils/          # Utility functions
│   ├── constant.ts
│   ├── database.ts
│   ├── encryption.ts
│   ├── env.ts
│   ├── interfaces.ts
│   ├── jwt.ts
│   └── response.ts
└── index.ts        # Entry point
```

## API Documentation

Dokumentasi API lengkap tersedia melalui Swagger UI di:
`http://localhost:3000/api-docs`

### Endpoints yang Tersedia

#### Authentication Endpoints

- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `PUT /api/auth/update-password` - Update password (memerlukan auth)
- `GET /api/auth/me` - Get data user yang sedang login (memerlukan auth)

#### Notes Endpoints (semua memerlukan auth)

- `POST /api/notes` - Buat note baru
- `GET /api/notes` - Ambil semua notes
- `GET /api/notes/user` - Ambil notes milik user login
- `GET /api/notes/:id` - Ambil note berdasarkan ID
- `GET /api/notes/user/:id` - Ambil note milik user berdasarkan ID
- `PUT /api/notes/:id` - Update note berdasarkan ID
- `DELETE /api/notes/:id` - Hapus note berdasarkan ID

### Contoh Request/Response

#### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "Password123!",
    "confirmPassword": "Password123!"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "johndoe",
    "password": "Password123!"
  }'
```

#### Create Note (dengan auth token)
```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "title": "My First Note",
    "content": "This is my first note content"
  }'
```

## Database Schema

### User Model
```typescript
{
  fullName: string,
  username: string,
  email: string,
  password: string (hashed),
  role: string ('user' | 'admin')
}
```

### Note Model
```typescript
{
  title: string,
  content: string,
  userId: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

## Development

### Menambahkan Endpoint Baru

1. Tambahkan route di `src/routes/api.ts`
2. Buat controller function di `src/controllers/`
3. Tambahkan dokumentasi Swagger dengan komentar di route
4. Generate ulang dokumentasi: `npm run docs`

### Testing

Untuk testing, pastikan MongoDB test database sudah disetup dan gunakan environment variables yang sesuai.

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables Production
Pastikan untuk mengubah environment variables untuk production:
- `DATABASE_URL` ke production MongoDB
- `SECRET` ke production JWT secret
- `CLIENT_HOST` ke production client URL

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Pastikan MongoDB berjalan
   - Periksa `DATABASE_URL` di `.env`

2. **JWT Error**
   - Pastikan `SECRET` sudah diset di `.env`

3. **CORS Error**
   - Periksa `CLIENT_HOST` di `.env`

## Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

Proyek ini dilisensikan di bawah ISC License.

## Support

Untuk pertanyaan atau bantuan, silakan buka issue di repository atau hubungi developer.
