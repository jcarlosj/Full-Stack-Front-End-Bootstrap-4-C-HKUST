'use strict';

/** Dependencies */
var
    { src, dest, watch, series } = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    browserSync = require( 'browser-sync' ) .create(),
    del = require( 'del' );

/** Tasks */
function cleanDistTask( cb ) {
    del .sync([ './dist' ]);
    cb();
}

function copyFontsTask( cb ) {
    src( './node_modules/font-awesome/fonts/**/*.{ttf,woff,woff2,eot,otf,svg}' )
        .pipe( dest( './dist/fonts' ) );
    cb();
}

function copyFilesTask( cb ) {
    src( './src/*.html' )
        .pipe( dest( './dist' ) );
    cb();
}

sass .compiler = require( 'node-sass' );
function sassTask( cb ) { 
    src( './src/css/*.scss' )
        .pipe( sass() .on( 'error', sass .logError ) )
        .pipe( dest( './dist/css' ) );
    cb();
}

function sassWatchTask( cb ) {
    watch( './src/css/*.scss', sassTask );
    cb();
}

function browserSyncTask( cb ) {
    var files = [
        '*.html',
        './src/css/*.css',
        './src/js.*.js',
        './src/img/*.{png,jpg,gif}'
    ];

    browserSync .init({
        server: {
            baseDir: './src/'
        }
    });

    cb();
}

exports .default = series( browserSyncTask, sassWatchTask );
exports .sass = sassTask;
exports .copy = series( copyFontsTask, copyFilesTask );