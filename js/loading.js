//Set/enable the loading
jviz.modules.ideogram.prototype.loading = function(value)
{
  //Check the value
  if(typeof value !== 'boolean'){ return this._loading; }

  //Check the value
  (value === true) ? this._panel.el.showLoading() : this._panel.el.hideLoading();

  //Save the value
  this._loading = value;

  //Return this
  return this;
};

//Show loading
jviz.modules.ideogram.prototype.showLoading = function(){ return this.loading(true); };

//Hide loading
jviz.modules.ideogram.prototype.hideLoading = function(){ return this.loading(false); };

//Check if is loading
jviz.modules.ideogram.prototype.isLoading = function(){ return this._loading; };
