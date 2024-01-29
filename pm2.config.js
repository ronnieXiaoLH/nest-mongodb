// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
module.exports = {
  apps: [
    {
      name: 'nest-mongodb',
      script: 'dist/main.js',
      autorestart: true,
      watch: false,
      min_uptime: '60s',
      max_restarts: 20,
      max_memory_restart: '600M',
      restart_delay: 4000,
      // env: {
      //   NODE_ENV: 'production'
      // },
      env_uat: {
        NODE_ENV: 'uat'
      }
    }
  ]
}
