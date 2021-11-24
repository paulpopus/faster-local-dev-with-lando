module.exports = ({ env }) => ({
  'config-sync': {
    destination: 'extensions/config-sync/files/',
    minify: false,
    importOnBootstrap: false,
    include: [
      'core-store',
      'role-permissions',
    ],
  },
  meilisearch: {
    host: env('MEILISEARCH_HOST'),
    api_key: env('MEILISEARCH_API_KEY'), //currently not used by the plugin, it needs to exist in the database
  }
})
