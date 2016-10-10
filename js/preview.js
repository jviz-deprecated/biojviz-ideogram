//Calculate the chromosomes margin
jviz.modules.ideogram.prototype.previewMargin = function()
{
  //Get the canvas draw zone
  var draw = this._canvas.draw();

  //Calculate free space
	var free = draw.width - this._genome.chromosomes.length * this._preview.chromosome.width;

	//Get the margin
	this._preview.margin = free / (this._genome.chromosomes.length - 1);
};

//Draw the preview
jviz.modules.ideogram.prototype.previewDraw = function()
{
  //Show loading
  this.loading(true);

  //Clear all layers
  this._canvas.clear();

  //Get the canvas draw zone
  var draw = this._canvas.draw();

  //Calculate the margin
  this.previewMargin();

  //Get the middle layer
  var canvas = this._canvas.layer(this._preview.layer);

  //Clear the canvas
  canvas.Clear();

  //Reset the karyotypes positions
  this._preview.positions = [];

  //Draw all the karyotypes
  for(var i = 0; i < this._genome.chromosomes.length; i++)
  {
    //Get the chromosome
    var chr = this._genome.chromosomes[i];

    //Get the mark for this chromosome
    //var marks = this.GetMarks(ch.id).length;
    var marks = 0;

    //Get the chromosome width
    var width = this._preview.chromosome.width;

    //Get the chromosome height
    var height = draw.height * (chr.length / this._preview.max);

    //Get the chromosome position x
    var posx = draw.margin.left + (i + 0) * this._preview.margin + i * this._preview.chromosome.width;

    //Get the chromosome position y
    var posy = draw.margin.top + draw.height - height;

    //Get the chromosome radius
    var radius = this._preview.chromosome.radius;

    //Draw the chromosome
    canvas.Rect({ x: posx, y: posy, width: width, height: height, radius: radius });

    //Set the chromsome fill color
    canvas.Fill({ color: this._fill.chromosome.color, opacity: this._fill.chromosome.opacity });

    //Save the position
    this._preview.positions.push({ x: posx, y: posy, width: width, height: height });

    //Check for draw the centromere
    if(typeof chr.centromere !== 'undefined')
    {
      //Centromere width
      var cent_width = this._preview.chromosome.width;

      //Centromere start
      var cent_start = draw.height * (chr.centromere[0] / this._preview.max);

      //Centromere end
      var cent_end = draw.height * (chr.centromere[1] / this._preview.max);

      //Centromere height
      var cent_height = Math.abs(cent_end - cent_start);

      //Centromere position x
      var cent_x = posx;

      //Centromere position y
      var cent_y = draw.margin.top + draw.height - cent_start;

      //Clear the centromere region
      canvas.Clear({ x: cent_x, y: cent_y, width: cent_width, height: cent_height });

      //Centromere points
      var cent = [];

      //Add the top point
      cent.push([cent_x, cent_y]);

      //Add the middle point
      cent.push([cent_x + cent_width / 2, cent_y + cent_height / 2]);

      //Add the end point
      cent.push([cent_x, cent_y + cent_height]);

      //Add the end right
      cent.push([cent_x + cent_width, cent_y + cent_height]);

      //Add the middle right
      cent.push([cent_x + cent_width / 2, cent_y + cent_height / 2]);

      //Add the top right
      cent.push([cent_x + cent_width, cent_y]);

      //Draw the lines
      canvas.Line(cent);

      //Add the fill color
      canvas.Fill({ color: this._fill.centromere.color, opacity: this._fill.centromere.opacity });
    }

    //Get the chromosome name
    var text_txt = chr.name;

    //Get the text position x
    var text_x = posx + this._preview.chromosome.width / 2;

    //Get the text position y
    var text_y = draw.margin.top + draw.height + this._preview.text.margin;

    //Get the text color
    var text_color = this._preview.text.color;

    //Get the text size
    var text_size = this._preview.text.size;

    //Get the text font
    var text_font = this._preview.text.font;

    //Get the text align
    var text_align = this._preview.text.align;

    //Draw the chromosome title
    canvas.Text({ x: text_x, y: text_y, text: text_txt, color: text_color, size: text_size, font: text_font, align: text_align });

    //Get the regions for this chromosome
    var regions = (typeof this._regions.list[chr.name] === 'undefined') ? [] : this._regions.list[chr.name];

    //Read all the regions
    for(var j = 0; j < regions.length; j++)
    {
      //Get the region
      var re = regions[j];

      //Region start
      var re_start = draw.height * (re.start / this._preview.max);

      //Region end
      var re_end = draw.height * (re.end / this._preview.max);

      //Region width
      var re_width = this._preview.chromsome.width;

      //Region height
      var re_height = Math.max(Math.abs(re_end - re_start), 1);

      //Region position x
      var re_x = posx;

      //Region position y
      var re_y = draw.margin.top + draw.height - re_start;

      //Draw the region
      canvas.Rect({ x: re_x, y: re_y, width: re_width, height: re_height });

      //Region fill
      canvas.Fill({ color: this._chromosome.regions.fill, opacity: this._chromosome.regions.opacity });
    }

    //Check the number of marks
    if(marks === 0){ continue; }

    //Get the mark rectangle position x
    var mark_x = posx + this._preview.width / 2 - this._marks.karyotypes.width / 2;

    //Get the mark rectange position y
    var mark_y = posy - this._marks.karyotypes.margin;

    //Get the mark rectange radius
    var mark_radius = this._marks.karyotypes.radius;

    //Get the mark width
    var mark_width = this._marks.karyotypes.width;

    //Get the mark rectangle height
    var mark_height = this._marks.karyotypes.height;

    //Draw the rectangle
    canvas.Rect({ x: mark_x, y: mark_y, width: mark_width, height: mark_height, radius: mark_radius });

    //Set the rectangle color
    canvas.Fill({ color: this._marks.fill });

    //Update the text position x
    this._marks.text.x = posx + this._preview.chromosome.width / 2;

    //Update the text position y
    this._marks.text.y = mark_y + this._marks.karyotypes.text;

    //Update the text
    this._marks.text.text = marks.toString();

    //Draw the text
    canvas.Text(this._marks.text);

    //Update the mark position x
    mark_x = posx + this._preview.width / 2;

    //Update the mark position y
    mark_y = mark_y + this._marks.karyotypes.height - this._marks.karyotypes.triangle;

    //Initialize the triangle array
    var tri = [];

    //Add the first point
    tri.push([ mark_x - this._marks.triangle, mark_y ]);

    //Add the middle point
    tri.push([ mark_x, mark_y + this._marks.triangle ]);

    //Add the first point
    tri.push([ mark_x + this._marks.triangle, mark_y ]);

    //Add the line
    canvas.Line(tri);

    //Add the fill color
    canvas.Fill(this._marks.fill);
  }

  //Reset the karyotypes hover
  this._preview.hover.index = -1;

  //Set loading as false
  this.loading(false);

  //Draw the test zone
  this._canvas.drawTest();
};

//Get the chromosome
jviz.modules.ideogram.prototype.previewFindChromosome = function(x, y)
{
  //Get the actual draw
  var draw = this._canvas.draw();

  //Check for click on the margin left
  if(x < draw.margin.left + 0 * this._preview.margin){ return -1; }

  //Check for click on the margin right
  if(draw.margin.left + draw.width - 0 * this._preview.margin < x){return -1; }

  //Check for click on the margin top
  if(y < draw.margin.top){ return -1; }

  //Check for click on the margin bottom
  if(draw.margin.top + draw.height < y){ return -1; }

  //Read all the chromosomes positions
  for(var i = 0; i < this._preview.positions.length; i++)
  {
    //Get the position
    var pos = this._preview.positions[i];

    //Check the left position x
    if(x < pos.x){ return -1; }

    //Check the right position x
    if(pos.x + pos.width < x){ continue; }

    //Return the chromosome index
    return i;
  }

  //Default, return -1
  return -1;
};

//Clicked on a chromosome
jviz.modules.ideogram.prototype.previewClick = function(x, y)
{
  //Get the chromosome index
  var index = this.previewFindChromosome(x, y);

  //Check for undefined chromosome
  if(index === -1){ return; }

  //Draw this chromosome
  this.draw(index);
};

//Draw the karyotypes hover
jviz.modules.ideogram.prototype.previewMove = function(x, y)
{
  //Get the hover chromosome
  var index = this.previewFindChromosome(x, y);

  //Check the index
  if(index === this._preview.hover.index){ return; }

  //Update the index
  this._preview.hover.index = index;

  //Get the canvas
  var canvas = this._canvas.layer(1);

  //Clear the canvas
  canvas.Clear();

  //Check for no chromosome
  //if(index === -1){ return this.removeCursor('hand'); }
  if(index === -1){ return; }

  //Get the chromosome position
  var chr = this._preview.positions[index];

  //Calculate the hover position x
  var rect_x = chr.x - this._preview.hover.margin.left;

  //Calculate the hover position y
  var rect_y = chr.y - this._preview.hover.margin.top;

  //Calculate the hover width
  var rect_width = chr.width + this._preview.hover.margin.left + this._preview.hover.margin.right;

  //Calculate the hover height
  var rect_height = chr.height + this._preview.hover.margin.top + this._preview.hover.margin.bottom;

  //Get the hover radius
  var rect_radius = this._preview.hover.radius;

  //Draw
  canvas.Rect({ x: rect_x, y: rect_y, width: rect_width, height: rect_height, radius: rect_radius });

  //Set the fill color
  canvas.Fill({ color: this._preview.hover.color, opacity: this._preview.hover.opacity });

  //Add the hand cursor
  //this.CursorSet('hand');
};

//Preview mouse leave
jviz.modules.ideogram.prototype.previewLeave = function()
{
  //Update the index
  this._preview.hover.index = -1;

  //Clear the canvas layer
  this._canvas.layer(1).Clear();
};
