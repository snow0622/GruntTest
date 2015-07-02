module.exports = function(grunt) {

    // include connect-include
    var ssInclude = require("connect-include");

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true
                },
                files: [{
                    expand: true,
                    cwd: './static/less',
                    src: ['**/*.less'],
                    dest: 'static/css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['./static/less/**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                },
            },
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    // 在connect与watch同时运行的时候，keepalive不能为true，这里注释了keepalive， 因为他的默认值就是false。
                    // keepalive: true,

                    // livereload: true,
                    base: './static',
                    middleware: function(connect, options) {
                        // Same as in grunt-contrib-connect
                        var middlewares = [];
                        var directory = options.directory || options.base[options.base.length - 1];
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Here we insert connect-include, use the same pattern to add other middleware
                        middlewares.push(ssInclude(directory));

                        // Same as in grunt-contrib-connect
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        middlewares.push(connect.directory(directory));
                        return middlewares;
                    }
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    // grunt.registerTask('default', ['uglify']);
    grunt.registerTask('default', ['connect', 'watch']);

    //使用watch，实时编译less成功

};