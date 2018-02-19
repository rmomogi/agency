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
				src: ["components/js/jquery.min.js",
					  "components/js/bootstrap.min.js",
					  "components/js/adminlte.min.js",
					  "components/js/jquery.inputmask.bundle.js"
					  ],
				dest: 'dist/build.js'	    	
			},
			css: {	  		
				src: ["components/css/bootstrap.min.css",
					  "components/css/AdminLTE.min.css",
				      "components/css/skins/_all-skins.min.css",
				      "components/css/font-awesome.css"
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