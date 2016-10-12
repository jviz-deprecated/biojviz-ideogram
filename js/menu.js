//Build the menu
jviz.modules.ideogram.prototype.menu = function()
{
  //Get the menu container id
  var id = this._panel.head().content.id;

  //Reset the menu content
  jviz.dom.empty(id);

  //Add the table button
  jviz.dom.append(id, { id: this._menu.table.id, class: this._menu.table.class, _html: this._menu.table.text });

  //Add the background image
  //jviz.dom.style(id, 'background-image', this._menu.table.img);

  //Add the preview button
  jviz.dom.append(id, { id: this._menu.preview.id, class: this._menu.preview.class, _html: this._menu.preview.text });

  //Add the background image
  //jviz.dom.style(id, 'background-image', this._menu.preview.img);

  //Save this
  var self = this;

  //Add the preview button icon event
  jviz.mouse.down(this._menu.preview.id, function(e){ return self.draw(-1); });

  //Add the table button icon event
  //jviz.mouse.down(this._menu.table.id, function(e){ return self.table(); });
};
