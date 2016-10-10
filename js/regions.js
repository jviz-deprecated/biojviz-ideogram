//Set the regions
jviz.modules.ideogram.prototype.regions = function(data)
{
  //Check for undefined data
  if(typeof data === 'undefined'){ return this._regions.list; }

  //Set loading as true
  this.loading(true);

  //Reset the regions list
  this.regions.list = {};

  //Read all the regions
  for(var i = 0; i < data.length; i++)
  {
    //Get the region
    var region = data[i];

    //Check if chromosome exists
    if(typeof this.regions.list[region.chromosome] === 'undefined')
    {
      //Create the chromosome
      this.regions.list[region.chromosome] = [];
    }

    //Check the region name or label
    region.name = (typeof region.name === 'undefined') ? 'Region ' + i : region.name;

    //Check the region label
    region.label = (typeof region.label === 'undefined') ? region.name : region.label;

    //Parse the start position
    region.start = parseInt(region.start);

    //Parse the end position
    region.end = parseInt(region.end);

    //Save the region
    this.regions.list[region.chromosome].push(region);
  }

  //Draw the preview
  this.draw(-1);

  //Return this
  return this;
};

//Get the regions by ajax connection
jviz.modules.ideogram.prototype.regionsAjax = function(opt)
{
  //Check the options
  if(typeof opt === 'undefined'){ return this; }
};

//Check over region
jviz.modules.ideogram.prototype.regionOver = function(x, y)
{
  //Check if user is hover the chromosome
  if(this.chromosomeOver(x, y) === false){ return -1; }

  //Save the margin
  var margin = this._chromosome.regions.click;

  //Find the region
  for(var i = 0; i < this._chromosome.regions.list.length; i++)
  {
    //Get the region
    var region = this._chromosome.regions.list[i];

    //Check the left position
    if(x < region.pstart - margin){ return -1; }

    //Check the right position
    if(region.pend + margin < x){ continue; }

    //Return the region index
    return i;
  }

  //Default, return -1
  return -1;
};

//Draw the region label
jviz.modules.ideogram.prototype.regionsDrawLabel = function(layer, index, opacity)
{
  //Check the opacity
  if(typeof opacity === 'undefined'){ var opacity = 1.0; }

  //Get the canvas layer
  var canvas = this._canvas.layer(canvas_layer);

  //Get the region info
  var region = this._chromosome.regions.list[index];

  //Get the rectangle position x
  var rect_x = region.pmiddle - this._chromosome.regions.label.width / 2;

  //Get the rectangle position y
  var rect_y = this._chromosome.regions.label.posy;

  //Get the rectangle width
  var rect_width = this._chromosome.regions.label.width;

  //Get the rectangle height
  var rect_height = this._chromosome.regions.label.height;

  //Get the rectangle radius
  var rect_radius = this._chromosome.regions.label.radius;

  //Draw the rectangle
  canvas.Rect({ x: rect_x, y: rect_y, width: rect_width, height: rect_height, radius: rect_radius });

  //Draw the rectangle fill
  canvas.Fill({ color: this._chromosome.regions.label.fill, opacity: opacity });

  //Create the label triangle
  var tri = [];

  //Add the start point
  tri.push([ region.pmiddle - this._chromosome.regions.label.triangle, rect_y ]);

  //Add the middle point
  tri.push([ region.pmiddle, rect_y - this._chromosome.regions.label.triangle ]);

  //Add the end point
  tri.push([ region.pmiddle + this._chromosome.regions.label.triangle, rect_y ]);

  //Draw the lines
  canvas.Line(tri);

  //Fill the triangle
  canvas.Fill({ color: this._chromosome.regions.label.fill, opacity: opacity });

  //Get the text
  var text_text = region.name;

  //Get the text position x
  var text_x = region.pmiddle;

  //Get the text position y
  var text_y = this._chromosome.regions.label.posy + this._chromosome.regions.label.text.margin;

  //Get the text font
  var text_font = this._chromosome.regions.label.text.font;

  //Get the text size
  var text_size = this._chromosome.regions.label.text.size;

  //Get the text align
  var text_align = this._chromosome.regions.label.text.align;

  //Get the text color
  var text_color = this._chromosome.regions.label.text.color;

  //Draw the text
  canvas.Text({ text: text_text, x: text_x, y: text_y, font: text_font, color: text_color, size: text_size, align: text_align });
};
