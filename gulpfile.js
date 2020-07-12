'use strict';

/** Dependencies */
var
    { src, dest, watch, series } = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    browserSync = require( 'browser-sync' ) .create();

/** Tasks */
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