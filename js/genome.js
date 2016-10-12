//Manage Genome
jviz.modules.ideogram.prototype.genome = function(data)
{
  //Check the data
  if(typeof data !== 'object'){ return this._genome; }

  //Check the genome name
  if(typeof data.name !== 'string'){ return jviz.console.error('Undefined genome name', null); }

  //Check the genome assembly
  if(typeof data.assembly !== 'string'){ return jviz.console.error('Undefined genome assembly', null); }

  //Check the genome chromosomes
  if(typeof data.chromosomes !== 'object'){ return jviz.console.error('Undefined genome chromosomes list', null); }

  //Check for array
  if(jviz.is.array(data.chromosomes) === false){ data.chromosomes = [ data.chromosomes ]; }

  //Set loading as true
  this.loading(true);

  //Save the genome name
  this._genome.name = data.name;

  //Save the genome assembly
  this._genome.assembly = data.assembly;

  //Save the genome chromosomes
  this._genome.chromosomes = data.chromosomes;

  //Reset the karyotypes max size
  this._preview.max = 1;

  //Save this
  var self = this;

  //Read all the chromosomes
  this._genome.chromosomes.map(function(chr, index)
  {
    //Add the chromosome index
    chr.index = index;

    //Check the chromosome length
    if(self._preview.max < chr.length){ self._preview.max = chr.length; }

    //Return the new chromosome object
    return chr;
  });

  //Update the ideogram detail
  this._panel.detail(this._genome.name + ' ' + this._genome.assembly);

  //Draw the data
  this.draw(this._chromosome.now);
};

//Get genome data from ajax
jviz.modules.ideogram.prototype.genomeAjax = function(opt)
{
  //Check the options
  if(typeof opt !== 'object'){ return this; }

  //Save this
  var self = this;

  //Reset the source data
  this._genome.chromosomes = [];



};

//Check if has genomes
jviz.modules.ideogram.prototype.hasGenome = function()
{
  //Return if has genome data
  return (this._genome.chromosomes.length === 0) ? false : true;
};
