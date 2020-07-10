'use strict';

module .exports = function( grunt ) {
    /** Dependencies */
    require( 'time-grunt' )( grunt );        // Display the elapsed execution time of grunt tasks
    require( 'jit-grunt' )( grunt );
    const sass = require( 'node-sass' );

    // Project configuration.
    grunt .initConfig({
        /** Convert Sass code to CSS */
        sass: {                                                     // Task
            dist: {                                                 // Target
                options: {                                          // Target Options
                    implementation: sass,
                    sourceMap: true,
                },
                files: {                                            // Dictionary of files
                    './dist/css/styles.css': './css/master.scss'    // 'destination': 'source'
                }
            }
        }
    });

    /** Load the plugins that provides the tasks */
    grunt .loadNpmTasks( 'grunt-sass' );                        

    /** Register Tasks */
    grunt .registerTask( 'css', [ 'sass' ] );

    /** Default task(s). */ 
    grunt .registerTask( 'default', [] );

}