const {task, src, dest, series} = require('gulp');
const path = require('path');
const fs = require('fs');
const through = require('through2');
const os = require('os');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const base64 = require('gulp-base64');
const del = require('del');
const childProcess = require('child_process');
const rename = require('gulp-rename');
const Package = require('./package.json');

const cwd = process.cwd();

function runCmd(cmd, _args, fn) {
    const args = _args || [];

    const runner = childProcess.spawn(cmd, args, {
        // keep color
        stdio: 'inherit'
    });

    runner.on('close', code => {
        if (fn) {
            fn(code);
        }
    });
}

function setPackageConfig(cb) {
    // let file = fs.readFileSync('./package.json');
    // const res = JSON.parse(file.toString());
    Package.main = 'lib/index.js';
    Package.module = 'lib/index.js';
    Package.description = '共享中台前端框架';

    // delete res.devDependencies;

    fs.writeFileSync('./package.json', JSON.stringify(Package, null, 4));

    cb();
}

function cleanFn(cb) {
    del.sync('./lib');
    cb();
}

function compile(cb) {
    let file = fs.readFileSync('./.babelrc');
    const res = JSON.parse(file.toString());

    res.presets[1][1]['modules'] = false;
    res['plugins'].push('no-debugging');

    return src(['src/components/**/*.jsx', 'src/components/**/*.js'])
        .pipe(babel(res))
        .pipe(through.obj((file, _, cb) => {
            let deleteSCSS = '';
            deleteSCSS += file.contents.toString().replace(/\.scss/g, '.css');
            // const code = deleteSCSS.replace(/\@/g, '..');
            file.contents = Buffer.from(deleteSCSS);
            
            cb(null, file);
        }))
        .pipe(dest('lib'))
    cb();
}

function compileSASS(cb) {
    return src('src/components/**/*.scss')
        .pipe(base64({
            extensions: ['eot', 'ttf', 'woff', 'svg', 'png'],
            maxImageSize: 60*1024
        }))
        .pipe(sass())
        .pipe(through.obj((file, _, cb) => {
            let deleteSCSS = `@import '../style/sgexp.css'; \n`;
            console.log(file.contents.toString());
            deleteSCSS += file.contents.toString().replace(/\.scss/g, '.css');
            // const code = deleteSCSS.replace(/\@/g, '..');
            file.contents = Buffer.from(deleteSCSS);
            
            cb(null, file);
        }))
        .pipe(dest('lib'));
    
    cb();
}

function compileIndexSASS(cb) {
    return src('src/scss/reset.scss')
        .pipe(base64({
            extensions: ['eot', 'ttf', 'woff', 'svg', 'png'],
            maxImageSize: 60*1024,
            debug: true
        }))
        .pipe(sass())
        .pipe(rename('sgexp.css'))
        .pipe(dest('lib/style'));
}

function pub(cb) {
    runCmd('npm', ['publish']);
    cb();
}

function pushGit(cb) {
    runCmd('git', ['commit', '-a', '-m', '"版本更新"'], code => {
        runCmd('git', ['push'])
    });
    cb();
}

task('default', series(setPackageConfig, cleanFn, compile, compileSASS, compileIndexSASS, pub, pushGit));

task('test', function(cb){
    cb();
})
