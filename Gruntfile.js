'use strict';

module .exports = function( grunt ) {
    /** Dependencies */
    require( 'time-grunt' )( grunt );        // Display the elapsed execution time of grunt tasks
    require( 'jit-grunt' )( grunt );
    const sass = require( 'node-sass' );

    // Project configuration.
    grunt .initConfig({
        /** Run predefined tasks whenever observed file patterns are added, modified, or deleted */
        watch: {                                                    // Task
            scripts: {
                files: [ './css/*.scss' ],
                tasks: [ 'sass' ]
            },
        },
        /** Browser-sync module */
        browserSync: {
            dev: {
                bdFiles: {
                    src: [
                        './css/*.css',
                        './js/*.js',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        },
        /** Convert Sass code to CSS */
        sass: {                                                     // Task
            dist: {                                                 // Target
                options: {                                          // Target Options
                    implementation: sass,
                    sourceMap: true,
                },
                files: {                                            // Dictionary of files
                    './css/master.css': './css/master.scss'         // 'destination': 'source'
                }
            }
        }
    });

    /** Load the plugins that provides the tasks */
    grunt .loadNpmTasks( 'grunt-sass' );    
    grunt .loadNpmTasks( 'grunt-contrib-watch' );    
    grunt .loadNpmTasks( 'grunt-browser-sync' );                    

    /** Register Tasks */
    grunt .registerTask( 'css', [ 'sass' ] );

    /** Default task(s). */ 
    grunt .registerTask( 'default', [ 'browserSync', 'watch' ] );

}