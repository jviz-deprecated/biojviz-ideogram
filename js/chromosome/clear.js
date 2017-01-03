//Clear the chromosome panel
jviz.modules.ideogram.prototype.chromosomeClear = function()
{
  //Read all the layers
  for(var i = 0; i < this._canvas.layers; i++)
  {
    //Clear this layer
    this.chromosomeClearLayer(i);
  }

  //Continue
  return this;
};

//Clear a chromosome layer
jviz.modules.ideogram.prototype.chromosomeClearLayer = function(id)
{
  //Get the draw
  var draw = this._chromosome.draw;

  //Get the canvas layer
  var canvas = this._canvas.el.layer(id);

  //Clear the canvas
  canvas.Clear({ x: 0, y: draw.top, width: draw.real_width, height: draw.real_height });

  //Exit
  return this;
};
