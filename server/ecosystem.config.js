module.exports = {
  apps : [{
    script: 'index.js',
    watch: '.'
  },
    // {
    // script: './service-worker/',
    // watch: ['./service-worker']
    // }
  ],

  deploy : {
    production : {
      user : 'santhoshvgds',
      host : 'localhost',
      ref  : 'origin/master',
      repo : 'git@github.com:santhoshvgds/san.git',
      path : '/var/www/production',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      "ssh_options":"StrictHostKeyChecking=no"
    }
  }
};
