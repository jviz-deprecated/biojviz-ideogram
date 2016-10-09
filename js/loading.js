//Set/enable the loading
jviz.modules.ideogram.prototype.loading = function(value)
{
  //Check the value
  if(typeof value !== 'boolean'){ return this._loading; }

  //Check the value
  (value === true) ? this._panel.showLoading() : this._panel.hideLoading();

  //Save the value
  this._loading = value;

  //Return this
  return this;
};
