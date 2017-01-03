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

  //Save the genome ID
  this._genome.id = data.id;

  //Save the genome chromosomes
  this._genome.chromosomes = data.chromosomes;

  //Save the number of chromosomes
  this._genome.length = data.chromosomes.length;

  //Reset the karyotypes max size
  this._karyotype.max = 1;

  //Save this
  var self = this;

  //Read all the chromosomes
  this._genome.chromosomes.map(function(chr, index)
  {
    //Add the chromosome index
    chr.index = index;

    //Check the chromosome length
    if(self._karyotype.max < chr.length){ self._karyotype.max = chr.length; }

    //Return the new chromosome object
    return chr;
  });

  //Update the ideogram detail
  this._panel.el.detail(this._genome.name);

  //Draw the data
  this.draw();
};

//Check if has genomes
jviz.modules.ideogram.prototype.hasGenome = function()
{
  //Return if has genome data
  return (this._genome.chromosomes.length === 0) ? false : true;
};
