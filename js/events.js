//Add the events
jviz.modules.ideogram.prototype.events = function()
{
  //Get the last layer ID
  var id = this._canvas.layerID(this._layers - 1);

  //Save this
  var self = this;

  //Add the mouse down event
  jviz.mouse.down(id, function(e, x, y)
  {
    //Check the chromosome
    (self._chromosome.now === -1) ? self.previewClick(x,y) : self.chromosomeClick(x,y);
  });

  //Add the mouse over event
  jviz.mouse.move(id, function(e, x, y)
  {
    //Check the chromosome
    (self._chromosome.now === -1) ? self.previewMove(x,y) : self.chromosomeMove(x,y);
  });

  //Add the mouse leave event
  jviz.mouse.leave(id, function(e, x, y)
  {
    //Check the chromosome
    (self._chromosome.now === -1) ? self.previewLeave() : self.chromosomeLeave();
  });

  //Add the resize event
  $(window).resize(function()
  {
    //Resize the canvas element
    self._canvas.resize();

    //Draw again
    self.draw(self._chromosome.now);
  });
};