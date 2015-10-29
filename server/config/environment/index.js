module.exports = {
  secrets: {
    session: 'this is the session secret 123123'
  },
  userRoles: ['guest', 'user', 'admin'],
  mongo: {
    uri: process.env.MONGO_URL || 'mongodb://localhost/moment_dev'
  },
  spotify: {
    clientId: 'f4ffe5be37984004ab370083ec607daf',
    clientSecret: '2c8c6f83ca7740e68be5cd0f36a67ccf',
    spotifyCallback: 'http://localhost:3000/auth/spotify/callback'
  }
};
