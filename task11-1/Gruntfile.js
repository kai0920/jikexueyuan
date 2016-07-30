module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        copy: {
            src: {
                files: [
                    { expand: true, src: ['*.html'], dest: 'dist' }
                ]
            },
            image: {
                files: [
                    { expand: true, src: ['images/*.{png,jpg,jpeg,gif}'], dest: 'dist' }
                ]
            }
        },

        //编译less文件
        less: {
            compile: {
                files: {
                    'css/index.css': 'css/index.less'
                }
            },
        },

        //监听less文件
        watch: {
            scripts: {
                files: ['css/*.less'],
                tasks: ['less']
            }
        },

        // 文件合并
        concat: {
            options: {
                separator: ';',
                stripBanners: true
            },
            js: {
                src: ["js/jquery.js", "js/index.js"],
                dest: "dist/js/main.js"
            },
            css: {
                src: [
                    "css/*.css"
                ],
                dest: "dist/css/main.css"
            }
        },

        uglify: {
            options: {},
            dist: {
                files: {
                    'dist/js/main.min.js': 'dist/js/main.js'
                }
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            compress: {
                files: {
                    'dist/css/main.css': [
                        "css/*.css",
                    ]
                }
            }
        },

        // 处理html中css、js 引入合并问题
        usemin: {
            html: 'dist/*.html'
        },

        //压缩HTML
        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            html: {
                files: [
                    { expand: true, src: ['dist/*.html'], dest: '' }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['less', 'copy', 'concat', 'uglify', 'cssmin', 'usemin', 'htmlmin']);
};
