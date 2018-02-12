module.exports = function(grunt){
	grunt.initConfig({
		uglify:{
			files: {
				src: "dist/build.js",
				dest: "dist",
				expand: true,
				flatten: true,
				ext: '.min.js'
			}			
		},
		cssmin: {
			css:{
				src: 'dist/build.css',
				dest: 'dist/build.min.css'
			}
		},
		concat: {
			js: {
				src: ["components/js/vendor/jquery-2.1.4.min.js",
							"components/js/popper.min.js",
							"components/js/plugins.js",
							"components/js/main.js",
							"components/js/lib/chosen/chosen.jquery.min.js"],
				dest: 'dist/build.js'	    	
			},
			css: {	  		
				src: ["components/css/normalize.css",
							"components/css/bootstrap.min.css",
							"components/css/font-awesome.min.css",							
							"components/css/themify-icons.css",
							"components/css/flag-icon.min.css",
							"components/css/cs-skin-elastic.css",
							"components/css/lib/chosen/chosen.min.css",
							"components/scss/style.css"
							],
				dest: 'dist/build.css'	    	
			}
		},
		watch:{
			js:  { files: 'components/js/*.js', tasks: [ 'concat', 'uglify' ] },
			css:  { files: 'components/js/*.js', tasks: [ 'concat', 'cssmin' ] },
		}
	});	

	// load plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-css');
	
	// register at least this one task
	grunt.registerTask('default', [ 'concat', 'cssmin' ]);
}