//Build the Karyotype
jviz.modules.ideogram_karyotype.prototype.build = function()
{
  //Append the module
  jviz.dom.append(this._parent, { id: this._id, class: this._class });

  //Build the canvas layer
  this._canvas.el = new jviz.components.canvas(this._canvas);

  //Return this
  return this;
};
