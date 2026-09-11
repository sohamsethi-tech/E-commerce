# Carpets & Beyond API

## Render deployment

This service is configured by the repository root `render.yaml`. Render should use `backend` as the root directory, run `npm install`, and start with `npm start`.

Required environment variables:

- `MONGODB_URI`
- `ADMIN_TOKEN`
- `FRONTEND_URL`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `FROM_EMAIL`, `TO_EMAIL`

The health check endpoint is `GET /api/health`. The protected admin endpoint is `GET /api/admin` with the `x-admin-token` header.
