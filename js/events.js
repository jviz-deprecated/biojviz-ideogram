//Add the events
jviz.modules.ideogram.prototype.events = function()
{
  //Get the last layer ID
  var id = this._canvas.el.layerID(this._canvas.layers - 1);

  //Save this
  var self = this;

  //Add the mouse down event
  jviz.commons.mouse.down(id, function(e, x, y)
  {
    //Check for loading
    if(self.loading() === true){ return; }

    //Check the chromosome
    (self._chromosome.now === -1) ? self.karyotypeClick(x,y) : self.chromosomeClick(x,y);
  });

  //Add the mouse over event
  jviz.commons.mouse.move(id, function(e, x, y)
  {
    //Check for loading
    if(self.loading() === true){ return; }

    //Check the chromosome
    (self._chromosome.now === -1) ? self.karyotypeMove(x,y) : self.chromosomeMove(x,y);
  });

  //Add the mouse leave event
  jviz.commons.mouse.leave(id, function(e, x, y)
  {
    //Check for loading
    if(self.loading() === true){ return; }

    //Check the chromosome
    (self._chromosome.now === -1) ? self.karyotypeLeave() : self.chromosomeLeave();
  });

  //Add the resize event
  $(window).resize(function()
  {
    //Resize the ideogram
    self.resize();
  });
};

//Register events
jviz.modules.ideogram.prototype.on = function(name, listener)
{
  //Register the event
  this._events.add(name, listener);

  //Continue
  return this;
};
