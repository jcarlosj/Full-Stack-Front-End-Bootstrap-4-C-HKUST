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
        browserSync: {                                              // Task
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
        /** Copy files and folders */
        copy: {
            main: {
                files: [
                    {   /** HTML Files */
                        expand: true,                                   // Process a dynamic src-dest file mapping
                        dot: true,                                      // Allows patterns that match file names that begin with a dot
                        cwd: './',                                      // All src matches are relative to (but don't include) this path > *(Property enabled by the "expand" property)
                        src: [ '*.html' ],                              // Source
                        dest: './dist'                                  // Destination
                    },
                    {   /** File Fonts */
                        expand: true,                                   // Process a dynamic src-dest file mapping
                        dot: true,                                      // Allows patterns that match file names that begin with a dot
                        cwd: './node_modules/font-awesome/',             // All src matches are relative to (but don't include) this path > *(Property enabled by the "expand" property)
                        src: [ 'fonts/*.*' ],                         // Source
                        dest: './dist'                                  // Destination
                    }
                ],
            },
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
    grunt .loadNpmTasks( 'grunt-contrib-copy' );                 

    /** Register Tasks */
    grunt .registerTask( 'css', [ 'sass' ] );

    /** Default task(s). */ 
    grunt .registerTask( 'default', [ 'browserSync', 'watch' ] );

}