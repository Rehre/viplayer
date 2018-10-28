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
  const commandForBuildReact = 'npm run build:react';
  const commandForBuildElectron = 'npm run build:electron';
  const terminal = exec(commandForBuildReact);
  terminal.stdin.on('error', err => console.log(err));
  terminal.stdin.on('finish', () => {
    console.log('building react production: done');

    exec(commandForBuildElectron);
  });
});
