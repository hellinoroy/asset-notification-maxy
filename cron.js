import shell from 'shelljs';

console.log('Running cronjobs');
shell.exec('php artisan schedule:run');
// shell.exec('php artisan queue:work --stop-when-empty');
console.log('Cronjobs Done');
