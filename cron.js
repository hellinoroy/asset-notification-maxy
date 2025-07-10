import cron from 'node-cron';
import shell from 'shelljs';

   shell.exec('php artisan queue:listen>> /dev/null 2>&1');
// Schedule tasks to be run on the server.
cron.schedule('* * * * *', function() {
  console.log('Running cronjobs');
  shell.exec('php artisan schedule:run >> /dev/null 2>&1');
});
