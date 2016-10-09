//Draw the ideogram
jviz.modules.ideogram.prototype.draw = function(chr)
{
  //Check the genomes
  if(this.hasGenome() === false){ return this; }

  //Set loading as true
  this.loading(true);

  //Check the chromosome
  if(typeof chr === 'undefined'){ var chr = this._chromosome.now; }

  //Reset the actual chromosome
  this._chromosome.now = chr;

  //Check the chromosome to draw
  (chr === -1) ? this.drawKaryotypes() : this.drawChromosome();

  //Return this
  return this;
};
