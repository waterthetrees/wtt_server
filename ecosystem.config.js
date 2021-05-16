module.exports = {
  apps : [{
    script: 'server/server-api.js',
    watch: '.',
    name: 'wtt_server',
    instances: 'max',
    exec_mode: 'fork',
    node_args: '--require dotenv/config',
    env: {
      NODE_ENV: 'development',
    },
    env_development: {
      DOTENV_CONFIG_DEBUG: true,
      DOTENV_CONFIG_PATH: '/var/www/html/dev.waterthetrees.com/wtt_server/.env',
    }
  }],
  deploy : {
    development : {
      user : 'trees',
      host : 'localhost',
      ref  : 'origin/master',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env development',
      'pre-setup': ''
    }
  }
};
