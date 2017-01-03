//Build the ideogram component
jviz.modules.ideogram.prototype.build = function()
{
  //Append the module
  jviz.dom.append(this._parent, { id: this._id, class: this._class });

  //Add the panel parent
  this._panel.parent = this._id;

  //Build the panel
  this._panel.el = new jviz.components.panel(this._panel);

  //Add the canvas parent
  this._canvas.parent = this._panel.el.body();

  //Build the canvas layer
  this._canvas.el = new jviz.components.canvas(this._canvas);

  //Exit
  return this;
};
