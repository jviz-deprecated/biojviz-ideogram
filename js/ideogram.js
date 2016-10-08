//Ideogram object
// Arguments:
// - opt: an object with the following keys:
//   - id: the ideogram ID
//   - class: the ideogram class
//   - parent: the ideogram parent element (mandatory)
//   - width: ideogram width. Default is 100%
//   - height: ideogram height. Default is 160px
jviz.modules.ideogram = function(opt)
{
  //Check the options
  if(typeof opt !== 'object'){ var opt = {}; }

  //Save the ideogram ID
  this._id = (typeof opt.id === 'undefined') ? jviz.utils.getID({ prefix: 'ideogram', length: 5 }) : opt.id;

  //Save the ideogram class
  this._class = (typeof opt.class === 'undefined') ? 'jviz-modules-editable-list' : opt.class;

  //Parent element
  this._parent = opt.parent;

  //Number of layers
  this._layers = 5;

  //Default layout width
  this._width = (typeof opt.width !== 'undefined') ? opt.width : '100%';

  //Default canvas height
  this._height = (typeof opt.height !== 'undefined') ? opt.height : 160;

  //Build the element
  jviz.dom.append(this._parent, { _tag: 'div', id: this._id, class: this._class });

  //Build the panel
  this._panel = new jviz.components.panel({ id: this._id + '-panel', parent: this._id });

  //Build the canvas layers
  this._canvas = new jviz.components.canvas({ id: this._id + '-canvas', parent: this._panel.body().id, layers: this._layers, width: this._width, height: this._height });

  //
  //Return this
  return this;
};
