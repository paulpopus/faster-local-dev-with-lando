module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 48291),
  admin: {
    port: 48296,
    host: '0.0.0.0',
    auth: {
      secret: env('ADMIN_JWT_SECRET', '6a6c82f45d02aaf52f57ca9f4645d77d'),
    },
    watchIgnoreFiles: [
      '**/config-sync/files/**',
    ],
  },
})
