'use strict';

/** Dependencies */
var
    { src, dest } = require( 'gulp' ),
    sass = require( 'gulp-sass' );

/** Tasks */
sass .compiler = require( 'node-sass' );
function sassTask( cb ) { 
    src( './src/css/*.scss' )
        .pipe( sass() .on( 'error', sass .logError ) )
        .pipe( dest( './dist/css' ) );
    cb();
}

function defaultTask( cb ) {
    // place code for your default task here
    cb();
}

exports .default = defaultTask;
exports .sass = sassTask;