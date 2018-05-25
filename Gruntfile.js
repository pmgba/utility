/*global module:false*/
const webpackConfig = require('./webpack.config');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        footer: '/*! <%= grunt.template.today() %> */',
        process : function(src, filepath) {
        	return "//Filename: " + filepath + "\n" + src + "\n";
        },
        stripBanners: true
      },
      dev: {
	      files: {
	        'dist/js/common.js': [
		      	'src/js/common/_common.js',
		      	'src/js/common/_dev.js', //important
		      	'src/js/common/_common.*.js',
		      	'src/js/common/_init.js',
	        ],
	        'dist/mw/edit.js': [
		      	'src/js/edit/_edit.js',
		      	'src/js/edit/_edit.*.js',
	        ]
	      }
      },
      dist: {
	      files: {
	        'dist/js/common.js': [
		      	'src/js/common/_common.js',
		      	'src/js/common/_common.*.js',
		      	'src/js/common/_init.js',
	        ],
	        'dist/mw/edit.js': [
		      	'src/js/edit/_edit.js',
		      	'src/js/edit/_edit.*.js',
	        ]
	      }
      }
    },
    copy: {
		  main: {
		    files: [{
		      expand: true,
		      cwd: 'src',
		      src: [
		      	'mw/*.js',
		      ],
		      dest: 'dist/',
		      filter: 'isFile'
		    }],
		  },
		},
    uglify: {
      options: {
        banner: ''
      },
      dist: {
	      files: [{
	        expand: true,
	        src: [
	        	'dist/**/*.js',
	        	'!dist/scripts/*.js',
	        	'!dist/**/*.min.js'
	        ],
	        dest: '',
	        //rename : function ( dest, src ) { return src.replace('.js','.min.js'); }
	      }]
      }
    },
    jshint: {
      options: {
      	reporterOutput: '',
			  "curly": false,
			  "eqnull": true,
			  "eqeqeq": true,
			  "undef": false,
			  "laxbreak" : false,
			  "globals": {
			    "jQuery": true
			  }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['src/js/common/*.js']
      }
    },
    watch: {
      js: {
  			files: 'src/**/*.js',
        tasks: ['js']
      },
      css: {
  			files: 'src/**/*.scss',
        tasks: ['css']
      }
    },
	  connect: {
	    server: {
	      options: {
	        port: 8000,
	        hostname: '*'
	      }
	    }
	  },
	  sass: {
	    dev: {
	    	options: {
        	style: 'expanded',
        	sourcemap: 'none'
     		},
	      files: [{
	        expand: true,
	        cwd: 'src',
	        src: ['**/*.scss'],
	        dest: 'dist/',
	        ext: '.css',
	      }]
	    },
	    dist: {
	    	options: {
        	style: 'compressed',
        	sourcemap: 'none'
     		},
	      files: [{
	        expand: true,
	        cwd: 'src',
	        src: ['**/*.scss'],
	        dest: 'dist/',
	        ext: '.css',
	      }]
	    }
	  },
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      prod: webpackConfig,
      //dev: Object.assign({ watch: true }, webpackConfig)
    }
  });

  // These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-webpack');
	
	// Default task.
	grunt.registerTask('css', ['sass:dev']);
	grunt.registerTask('js', ['concat:dev','copy']);
	grunt.registerTask('dist', [ 'sass:dist','concat:dist','copy','uglify']);
	
	grunt.registerTask('dev', ['sass:dev', 'concat:dev', 'connect', 'watch']);
	grunt.registerTask('webpack', ['webpack']);

}