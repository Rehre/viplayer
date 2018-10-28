const gulp = require('gulp');
const kill = require('tree-kill');
const { exec, spawn } = require('child_process');

let terminalElectron = null;
function runDevElectron() {
  console.log('Electron starting');
  terminalElectron = spawn('npm', ['run', 'dev:electron']);
  terminalElectron.stdout.on('data', data => console.log(data.toString()));
  console.log('Electron started');

  gulp.watch(['src/*.js', 'src/**/*.js'], () => kill(terminalElectron.pid, 'SIGTERM', runDevElectron));
}

gulp.task('run:dev', () => {
  const commandForReactDev = 'gnome-terminal -x npm run dev:react'; // Change this according to your setup
  console.log('Starting react dev server...');
  const terminal = exec(commandForReactDev, { detached: true });
  terminal.stdin.on('error', err => console.log(err));

  runDevElectron();
});

gulp.task('run:build', () => {
  const buildReact = spawn('npm', ['run', 'build:react']);
  buildReact.stdout.on('data', data => console.log(data.toString()));

  buildReact.stdin.on('finish', () => {
    console.log('Finished build React');

    const buildElectron = spawn('npm', ['run', 'build:electron']);
    buildElectron.on('data', data => console.log(data.toString()));

    buildElectron.stdin.on('finish', () => {
      console.log('Finished build Electron');
    });
  });
});
