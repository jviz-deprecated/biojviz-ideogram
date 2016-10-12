//Manage foot messages
jviz.modules.ideogram.prototype.foot = function(text)
{
  //Check for undefined text
  if(typeof text === 'undefined'){ var text = ' '; }
  
  //Set the foot content
  this._panel.footContent(text);
};
