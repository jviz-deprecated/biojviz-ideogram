//Ideogram resize
jviz.modules.ideogram.prototype.resize = function()
{
  //Resize the canvas element
  this._canvas.el.resize();

  //Get the draw element
  var draw = this._canvas.el.draw();

  //Save the karyotype view real width
  this._karyotype.draw.real_width = draw.width;

  //Save the karyotype view real height
  this._karyotype.draw.real_width = draw.height / 2;

  //Calculate the new width
  this._karyotype.draw.width = draw.width - this._karyotype.draw.margin.left - this._karyotype.draw.margin.right;

  //Calculate the new height
  this._karyotype.draw.height = (draw.height / 2) - this._karyotype.draw.margin.top - this._karyotype.draw.margin.bottom;

  //Update the karyotype draw top
  this._karyotype.draw.top = 0;

  //Save the chromosome view real width
  this._chromosome.draw.real_width = draw.width;

  //Save the chromosome view real height
  this._chromosome.draw.real_height = draw.height / 2;

  //Calculate the new width
  this._chromosome.draw.width = draw.width - this._chromosome.draw.margin.left - this._chromosome.draw.margin.right;

  //Calculate the new height
  this._chromosome.draw.height = (draw.height / 2) - this._chromosome.draw.margin.top - this._chromosoe.draw.margin.bottom;

  //Update the chromosome draw top
  this._chromosome.draw.top = this._karyotype.draw.real_height;

  //Draw again
  this.draw();

  //Exit
  return this;
};
