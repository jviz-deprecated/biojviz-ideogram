//Get chromosomes
jviz.modules.ideogram.prototype.getChromosomes = function()
{
  //Return the chromosomes list
  return this._genome.chromosomes;
};

//Get regions by chromosome
jviz.modules.ideogram.prototype.getRegions = function(chr)
{
  //Check for undefined chromosome
  if(typeof chr === 'undefined'){ return jviz.console.error('Undefined chromosome name', []); }

  //Check for unknown chromosome
  if(this._regions.list[chr] === 'undefined'){ return []; }

  //Return the regions for this chromosome
  return this._regions.list[chr];
};

//Get marked regions by chromosome
jviz.modules.ideogram.prototype.getMarks = function(chr)
{
  //Get the regions for this chromosomes
  var regions = this.getRegions(chr);

  //Filter the regions list
  regions.filter(function(el)
  {
    //Filter the regions
    return (el.mark === true) ? true : false;
  });

  //Return the parsed list
  return regions;
};
