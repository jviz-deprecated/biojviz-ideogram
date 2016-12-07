//Build the menu
jviz.modules.ideogram.prototype.menu = function()
{
  //Get the menu container id
  //var id = this._panel.head().content.id;

  //Reset the menu content
  //jviz.dom.empty(id);

  //Add the table button
  //jviz.dom.append(id, { id: this._menu.table.id, class: this._menu.table.class, _html: this._menu.table.text });

  //Add the background image
  //jviz.dom.style(id, 'background-image', this._menu.table.img);

  //Add the preview button
  //jviz.dom.append(id, { id: this._menu.preview.id, class: this._menu.preview.class, _html: this._menu.preview.text });

  //Add the background image
  //jviz.dom.style(id, 'background-image', this._menu.preview.img);

  //Add the table button
  this._panel.addBtn(this._menu.table);

  //Add the preview button
  this._panel.addBtn(this._menu.preview);

  //Save this
  var self = this;

  //Add the preview button icon event
  jviz.dom.event(this._menu.preview.id, 'click', function(e){ return self.menuClickPreview(); });

  //Add the table button icon event
  //jviz.dom.event(this._menu.table.id, 'click', function(e){ return self.menuClickTable(); });
};

//Click on the preview button
jviz.modules.ideogram.prototype.menuClickPreview = function()
{
  //Emit the event
  this._events.emit('click:btn:preview');

  //Draw the preview view
  this.draw(-1);
};

//Click on the table button
jviz.modules.ideogram.prototype.menuClickTable = function()
{
  //Emit the event
  this._events.emit('click:btn:table');
};
