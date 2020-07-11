'use strict';

module .exports = function( grunt ) {
    /** Dependencies */
    require( 'time-grunt' )( grunt );        // Display the elapsed execution time of grunt tasks
    require( 'jit-grunt' )( grunt, {
        useminPrepare: 'grunt-usemin'
    } );

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
                    {   /** Bootstrap CSS File */
                        expand: true,                                   // Process a dynamic src-dest file mapping
                        dot: true,                                      // Allows patterns that match file names that begin with a dot
                        cwd: './node_modules/bootstrap/dist/',          // All src matches are relative to (but don't include) this path > *(Property enabled by the "expand" property)
                        src: [ 'css/bootstrap.min.css' ],               // Source
                        dest: './src'                                   // Destination
                    },
                    {   /** FontAwesome CSS File */
                        expand: true,                                   // Process a dynamic src-dest file mapping
                        dot: true,                                      // Allows patterns that match file names that begin with a dot
                        cwd: './node_modules/font-awesome/',            // All src matches are relative to (but don't include) this path > *(Property enabled by the "expand" property)
                        src: [ 'css/font-awesome.min.css' ],            // Source
                        dest: './src'                                   // Destination
                    },
                    {   /** Bootstrap Social CSS File */
                        expand: true,                                   // Process a dynamic src-dest file mapping
                        dot: true,                                      // Allows patterns that match file names that begin with a dot
                        cwd: './node_modules/bootstrap-social/',        // All src matches are relative to (but don't include) this path > *(Property enabled by the "expand" property)
                        src: [ 'bootstrap-social.css' ],                // Source
                        dest: './src/css'                               // Destination
                    },
                    {   /** jQuery File */
                        expand: true,                                   // Process a dynamic src-dest file mapping
                        dot: true,                                      // Allows patterns that match file names that begin with a dot
                        cwd: './node_modules/jquery/dist/',             // All src matches are relative to (but don't include) this path > *(Property enabled by the "expand" property)
                        src: [ 'jquery.min.js' ],                       // Source
                        dest: './src/js'                                // Destination
                    },
                    {   /** Popper JS File */
                        expand: true,                                   // Process a dynamic src-dest file mapping
                        dot: true,                                      // Allows patterns that match file names that begin with a dot
                        cwd: './node_modules/popper.js/dist/umd/',      // All src matches are relative to (but don't include) this path > *(Property enabled by the "expand" property)
                        src: [ 'popper.min.js' ],                       // Source
                        dest: './src/js'                                // Destination
                    },
                    {   /** Bootstrap JS File */
                        expand: true,                                   // Process a dynamic src-dest file mapping
                        dot: true,                                      // Allows patterns that match file names that begin with a dot
                        cwd: './node_modules/bootstrap/dist/',          // All src matches are relative to (but don't include) this path > *(Property enabled by the "expand" property)
                        src: [ 'js/bootstrap.min.js' ],                 // Source
                        dest: './src'                                   // Destination
                    },
                    {   /** HTML Files */
                        expand: true,                                   // Process a dynamic src-dest file mapping
                        dot: true,                                      // Allows patterns that match file names that begin with a dot
                        cwd: './src/',                                  // All src matches are relative to (but don't include) this path > *(Property enabled by the "expand" property)
                        src: [ '*.html' ],                              // Source
                        dest: './dist'                                  // Destination
                    },
                    {   /** File Fonts */
                        expand: true,                                   // Process a dynamic src-dest file mapping
                        dot: true,                                      // Allows patterns that match file names that begin with a dot
                        cwd: './node_modules/font-awesome/',            // All src matches are relative to (but don't include) this path > *(Property enabled by the "expand" property)
                        src: [ 'fonts/*.*' ],                           // Source
                        dest: './dist'                                  // Destination
                    }
                ],
            },
        },
        /** Clean files and folders */
        clean: {
            build: {
                src: [ './dist' ]
            },
            modules: {
                src: [ './node_modules' ]
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
                    './src/css/master.css': './src/css/master.scss' // 'destination': 'source'
                }
            }
        },
        /** Minify images */
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,                                   // Process a dynamic src-dest file mapping
                    dot: true,                                      // Allows patterns that match file names that begin with a dot
                    cwd: './src/',                                  // All src matches are relative to (but don't include) this path > *(Property enabled by the "expand" property)
                    src: ['img/*.{png,jpg,gif}'],                   // Source
                    dest: './dist'                                  // Destination
                }]
            }
        },
        /** useminPrepare */
        useminPrepare: {
            foo: {
                src: [ './src/aboutus.html', './src/contactus.html', './src/index.html' ],
                dest: './dist'
            },
            options: {
                flow: {
                    steps: {
                        css: [ 'cssmin' ],
                        js: [ 'uglify' ]
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function( context, block ) {
                                var generated = context .options .generated;

                                generated .options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },
        /** Concatenate files. */
        concat: {
            options: {
                separator: ';',
            },
            // dist configuration is provided by useminPrepare
            dist: {},
        },
        /** Minify JavaScript files with UglifyJS */
        uglify: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },
        /** Minify CSS */
        cssmin: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },
        /** Static asset revisioning through file content hash */
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            // filerev:files hashes(md5) all assets (images, js and css ) in dist directory
            files: {
                src: [
                    './dist/css/*.css',
                    './dist/js/*.js'
                ]
            }  
        },
        /** Replaces references from non-optimized scripts, stylesheets and other assets to their optimized version within a set of HTML files (or any templates/views). */
        usemin: {
            html: [ './dist/aboutus.html', './dist/contactus.html', './dist/index.html' ],
            options: {
                assestsDirs: [ './dist', './dist/css', './dist/js' ]    // options.assetDirs contains the directories for finding the assets according to their relative paths
            }
        },
        /** Minify HTML */
        htmlmin: {                                          // Task
            dist: {                                         // Target
                options: {                                  // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                                 // Dictionary of files
                    './dist/aboutus.html': './dist/aboutus.html',        // 'destination': 'source'
                    './dist/contactus.html': './dist/contactus.html',    // 'destination': 'source'
                    './dist/index.html': './dist/index.html'             // 'destination': 'source'
                }
            }
        }
    });

    /** Load the plugins that provides the tasks */
    grunt .loadNpmTasks( 'grunt-sass' );    
    grunt .loadNpmTasks( 'grunt-contrib-watch' );    
    grunt .loadNpmTasks( 'grunt-browser-sync' );   
    grunt .loadNpmTasks( 'grunt-contrib-copy' );        
    grunt .loadNpmTasks( 'grunt-contrib-clean' );  
    grunt .loadNpmTasks( 'grunt-contrib-imagemin' );     

    /** Register Tasks */
    grunt .registerTask( 'css', [ 'sass' ] );
    grunt .registerTask( 'build', [ 'clean:build', 'copy', 'imagemin', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'filerev', 'usemin', 'htmlmin' ] );

    /** Default task(s). */ 
    grunt .registerTask( 'default', [ 'browserSync', 'watch' ] );

}