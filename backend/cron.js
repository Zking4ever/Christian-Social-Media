const cron = require('cron');
const https = require('https');
const job = new cron.CronJob('*/14 * * * *', function() {
    https
    .get('https://verse-of-the-day-api.onrender.com/health', (res) => {
        if (res.statusCode == 200) {
            console.log('Get request successfully sent to health point');
        }else{
            console.log('Get request failed with status code:', res.statusCode);
        }
    })
    .on('error', (e) => {
        console.error(` Error during health check ping`);
    });
});

module.exports = job;