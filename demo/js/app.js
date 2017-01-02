//Ideogram element
var el = null;

//Document ready function
jviz.dom.ready(function()
{
  //Table options
  var opt = { parent: 'test', id: 'myIdeogram' };

  //Set the genome data
  opt.genome = test_genome;

  //Save the regions
  opt.regions = test_regions;

  //Initialize the table
  el = new jviz.modules.ideogram(opt);

  //Add the click chromosome event
  el.on('click:chromosome', function(name, index){ console.log('Open chromosome ' + name); });

  //Add the click region event
  el.on('click:region', function(name, chromosome, start, end){ console.log('Open region ' + name); });
});
