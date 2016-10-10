//Draw the ideogram
jviz.modules.ideogram.prototype.draw = function(chr)
{
  //Check the genomes
  if(this.hasGenome() === false){ return this; }

  //Set loading as true
  this.loading(true);

  //Check the chromosome
  if(typeof chr === 'undefined'){ var chr = this._chromosome.now; }

  //Check the chromosome value
  if(chr < -1 || this._genome.chromosomes.length <= chr)
  {
    //Get the max chromosome index
    var index_max = this._genome.chromosomes.length - 1;

    //Display error
    jviz.console.error('Invalid chromosome index' + chr + '. It must be between -1 and ' + index_max);

    //Exit
    return this;
  }

  //Reset the actual chromosome
  this._chromosome.now = chr;

  //Check the chromosome to draw
  (chr === -1) ? this.previewDraw() : this.chromosomeDraw();

  //Return this
  return this;
};
