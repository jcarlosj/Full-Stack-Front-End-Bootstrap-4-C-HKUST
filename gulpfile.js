'use strict';

/** Dependencies */
var
    { src, dest, watch, series, parallel } = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    browserSync = require( 'browser-sync' ) .create(),
    del = require( 'del' ),
    imagemin = require( 'gulp-imagemin' ),
    uglify = require( 'gulp-uglify' ),
    usemin = require( 'gulp-usemin' ),
    rev = require( 'gulp-rev' ),
    cleanCss = require( 'gulp-clean-css' ),
    flatmap = require( 'gulp-flatmap' ),
    htmlmin = require( 'gulp-htmlmin' );

/** Clean files and folders */
function cleanDistTask( cb ) {
    del .sync([ './dist' ]);
    cb();
}

function copyFontsTask( cb ) {
    src( './node_modules/font-awesome/fonts/**/*.{ttf,woff,woff2,eot,otf,svg}' )
        .pipe( dest( './dist/fonts' ) );
    cb();
}

/** Copy files and folders */
function copyFilesTask( cb ) {
    src( './src/*.html' )
        .pipe( dest( './dist' ) );
    cb();
}

/** Minify images */
function compressImagesTask( cb ) {
    src( './src/img/*' )
        .pipe( imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe( dest( './dist/img') );
    cb();
}

/** Convert Sass code to CSS */
sass .compiler = require( 'node-sass' );
function sassTask( cb ) { 
    src( './src/css/*.scss' )
        .pipe( sass() .on( 'error', sass .logError ) )
        .pipe( dest( './dist/css' ) );
    cb();
}

/** Run predefined tasks whenever observed file patterns are added, modified, or deleted */
function sassWatchTask( cb ) {
    watch( './src/css/*.scss', sassTask );
    cb();
}

/** Replaces references from non-optimized scripts, stylesheets and other assets to their optimized version within a set of HTML files (or any templates/views). */
function useMinTask( cb ) {
    src( './src/*.html' )
        .pipe( flatmap( function( stream, file ) {
            return stream .pipe( usemin({       
                html: [ htmlmin({ collapseWhitespace: true }) ],        
                css: [ rev() ],                                         /** Minify CSS */
                js: [ uglify(), rev() ],                                /** Minify JavaScript files with UglifyJS */
                inlinejs: [ uglify() ],
                inlinecss: [ cleanCss(), 'concat' ]                     /** Minify HTML */
            }))
        }))
        .pipe( dest( './dist' ) );
    cb();
}

/** Browser-sync module */
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
exports .build = series( cleanDistTask, parallel( copyFontsTask, compressImagesTask, useMinTask ) );
exports .clear = cleanDistTask;