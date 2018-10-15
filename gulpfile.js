const gulp = require('gulp');
const { exec } = require('child_process');
const electron = require('electron-connect').server.create();

gulp.task('run:dev', () => {
  const commandForReactDev = 'gnome-terminal -x npm run dev:react'; // Change this according to your setup
  const terminal = exec(commandForReactDev, { detached: true });
  terminal.stdin.on('error', err => console.log(err));

  electron.start();
  gulp.watch(['src/*.js', 'src/**/*.js'], electron.restart);
});

gulp.task('run:build', () => {
  const commandForBuildReact = 'gnome-terminal -x npm run build:react';
  const terminal = exec(commandForBuildReact, { detached: true });
  terminal.stdin.on('error', err => console.log(err));
});
