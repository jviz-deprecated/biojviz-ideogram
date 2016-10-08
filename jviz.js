//Initialize the package
var pkg = {};

//Source js files
var src_js = [ './js/ideogram.js', './js/**/*.js' ];

//Source sass files
var src_scss = [ './scss/**.scss' ];

//Source data files
var src_data = [ ' ./data/**.json' ];

//Package name
pkg.name = 'ideogram';

//Description
pkg.description = 'A module to build an ideogram';

//Author
pkg.author = { id: 'jmjuanes', name: 'Josemi Juanes', email: 'josemijuanes@gmail.com' };

//Build directory
pkg.directory = './build';

//Repository
pkg.repository = 'https://github.com/jviz/module-ideogram';

//Dependencies
pkg.dependencies = { jviz: 'dev' };

//Build tasks
pkg.build = [ 'build:js', 'build:scss', 'build:data' ];

//Tasks
pkg.tasks =
{
  //Build js files
  'build:js': [  { name: 'src', args: src_js }, { name: 'concat', args: 'ideogram.js' }, { name: 'dest', args: './' } ],

  //Build sass files
  'build:scss': [ { name: 'src', args: src_scss }, { name: 'sass' }, { name: 'dest', args: './' } ],

  //Build the data files
  'build:data': [ { name: 'src', args: src_data }, { name: 'dest', args: './data/' } ]
};

//Exports
module.exports = pkg;
