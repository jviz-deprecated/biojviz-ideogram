//Draw the karyotype
jviz.modules.ideogram.prototype.karyotypeDraw = function()
{
  //Show loading
  this.loading(true);

  //Get the canvas draw zone
  var draw = this._karyotype.draw;

  //Calculate the margin
  this._karyotype.margin = (draw.width - this._genome.length * this._karyotype.chromosome.width) / (this._genome.length - 1);

  //Get the middle layer
  var canvas = this._canvas.el.layer(this._karyotype.draw.layer);

  //Clear the karyotype zone
  this.karyotypeClear(this._karyotype.draw.layer);

  //Reset the karyotypes positions
  this._karyotype.positions = [];

  //Draw all the karyotypes
  for(var i = 0; i < this._genome.chromosomes.length; i++)
  {
    //Get the chromosome
    var chr = this._genome.chromosomes[i];

    //Get the mark for this chromosome
    //var marks = this.GetMarks(ch.id).length;
    var marks = 0;

    //Get the chromosome width
    var chr_width = this._karyotype.chromosome.width;

    //Get the chromosome height
    var chr_height = draw.height * (chr.length / this._karyotype.max);

    //Get the chromosome position x
    var chr_x = draw.margin.left + (i + 0) * this._karyotype.margin + i * this._karyotype.chromosome.width;

    //Get the chromosome position y
    var chr_y = draw.margin.top + draw.height - chr_height;

    //Get the chromosome radius
    var chr_radius = this._karyotype.chromosome.radius;

    //Draw the chromosome
    canvas.Rect({ x: chr_x, y: chr_y, width: chr_width, height: chr_height, radius: chr_radius });

    //Set the chromsome fill color
    canvas.Fill({ color: this._fill.chromosome.color, opacity: this._fill.chromosome.opacity });

    //Save the position
    this._karyotype.positions.push({ x: chr_x, y: chr_y, width: chr_width, height: chr_height });

    //Check for draw the centromere
    if(typeof chr.centromere !== 'undefined')
    {
      //Centromere width
      var cent_width = this._karyotype.chromosome.width;

      //Centromere start
      var cent_start = draw.height * (chr.centromere[0] / this._karyotype.max);

      //Centromere end
      var cent_end = draw.height * (chr.centromere[1] / this._karyotype.max);

      //Centromere height
      var cent_height = Math.abs(cent_end - cent_start);

      //Centromere position x
      var cent_x = chr_x;

      //Centromere position y
      var cent_y = draw.margin.top + draw.height - chr_height + cent_start;

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
    var text_x = chr_x + this._karyotype.chromosome.width / 2;

    //Get the text position y
    var text_y = draw.margin.top + draw.height + this._karyotype.text.margin;

    //Get the text color
    var text_color = this._karyotype.text.color;

    //Get the text size
    var text_size = this._karyotype.text.size;

    //Get the text font
    var text_font = this._karyotype.text.font;

    //Get the text align
    var text_align = this._karyotype.text.align;

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
      var re_start = draw.height * (re.start / this._karyotype.max);

      //Region end
      var re_end = draw.height * (re.end / this._karyotype.max);

      //Region width
      var re_width = this._karyotype.chromosome.width;

      //Region height
      var re_height = Math.max(Math.abs(re_end - re_start), 1);

      //Region position x
      var re_x = chr_x;

      //Region position y
      var re_y = draw.margin.top + draw.height - chr_height + re_start;

      //Draw the region
      canvas.Rect({ x: re_x, y: re_y, width: re_width, height: re_height });

      //Region fill
      canvas.Fill({ color: this._chromosome.regions.fill, opacity: this._chromosome.regions.opacity });
    }

    //Check the number of marks
    if(marks === 0){ continue; }

    //Get the mark rectangle position x
    var mark_x = chr_x + this._karyotype.width / 2 - this._marks.karyotypes.width / 2;

    //Get the mark rectange position y
    var mark_y = chr_y - this._marks.karyotypes.margin;

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
    this._marks.text.x = posx + this._karyotype.chromosome.width / 2;

    //Update the text position y
    this._marks.text.y = mark_y + this._marks.karyotypes.text;

    //Update the text
    this._marks.text.text = marks.toString();

    //Draw the text
    canvas.Text(this._marks.text);

    //Update the mark position x
    mark_x = posx + this._karyotype.width / 2;

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
  this._karyotype.hover.index = -1;

  //Set loading as false
  this.loading(false);

  //Add the foot info
  //this.foot(this._foot.default);
};

//Get the chromosome
jviz.modules.ideogram.prototype.karyotypeOver = function(x, y)
{
  //Get the actual draw
  var draw = this._karyotype.draw;

  //Check for click on the margin left
  if(x < draw.margin.left + 0 * this._karyotype.margin){ return -1; }

  //Check for click on the margin right
  if(draw.margin.left + draw.width - 0 * this._karyotype.margin < x){return -1; }

  //Check for click on the margin top
  if(y < draw.margin.top){ return -1; }

  //Check for click on the margin bottom
  if(draw.margin.top + draw.height < y){ return -1; }

  //Read all the chromosomes positions
  for(var i = 0; i < this._karyotype.positions.length; i++)
  {
    //Get the position
    var pos = this._karyotype.positions[i];

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

//Clicked down on a chromosome
jviz.modules.ideogram.prototype.karyotypeDown = function(x, y)
{
  //Get the chromosome index
  var index = this.karyotypeOver(x, y);

  //Check for undefined chromosome
  if(index === -1){ return; }

  //Get the chromosome info
  var chr = this._genome.chromosomes[index];

  //Emit the event
  var result = this._events.emit('click:chromosome', chr.name, index);

  //Check for undefined result
  if(result === false){ return; }

  //Open this chromosome
  this.chromosome(index);
};

//Draw the karyotypes hover
jviz.modules.ideogram.prototype.karyotypeMove = function(x, y)
{
  //Get the hover chromosome
  var index = this.karyotypeOver(x, y);

  //Check the index
  if(index === this._karyotype.hover.index){ return; }

  //Update the index
  this._karyotype.hover.index = index;

  //Get the canvas
  var canvas = this._canvas.el.layer(this._karyotype.hover.layer);

  //Clear the layer
  this.karyotypeClear(this._karyotype.hover.layer);

  //Check for no chromosome
  if(index === -1)
  {
    //Reset the foot content
    //this.foot(this._foot.default);

    //Remove the pointer cursor
    jviz.cursor.remove('pointer');

    //Exit
    return;
  }

  //Get the chromosome position
  var chr = this._karyotype.positions[index];

  //Calculate the hover position x
  var rect_x = chr.x - this._karyotype.hover.margin.left;

  //Calculate the hover position y
  var rect_y = chr.y - this._karyotype.hover.margin.top;

  //Calculate the hover width
  var rect_width = chr.width + this._karyotype.hover.margin.left + this._karyotype.hover.margin.right;

  //Calculate the hover height
  var rect_height = chr.height + this._karyotype.hover.margin.top + this._karyotype.hover.margin.bottom;

  //Get the hover radius
  var rect_radius = this._karyotype.hover.radius;

  //Draw
  canvas.Rect({ x: rect_x, y: rect_y, width: rect_width, height: rect_height, radius: rect_radius });

  //Set the fill color
  canvas.Fill({ color: this._karyotype.hover.color, opacity: this._karyotype.hover.opacity });

  //Get the chromosome name
  var chr_name = this._genome.chromosomes[index].name;

  //Get the regions on chromosome
  var chr_regions = (typeof this._regions.list[chr_name] !== 'undefined') ? this._regions.list[chr_name].length : 0;

  //Update the foot content
  //this.foot(this._foot.chromosome.replace('{chromosome}', chr_name).replace('{regions}', chr_regions));

  //Add the pointer cursor
  jviz.cursor.set('pointer');
};

//Preview mouse leave
jviz.modules.ideogram.prototype.karyotypeLeave = function()
{
  //Update the index
  this._karyotype.hover.index = -1;

  //Clear the hover layer
  this.karyotypeClear(this._karyotype.hover.layer);
};

//Draw an empty karyotype
jviz.modules.ideogram.prototype.karyotypeEmpty = function()
{
  //Clear the karyotype view
  this.karyotypeClear(this._karyotype.draw.layer);

  //Exit
  return this;
};

//Clear the karyotype
jviz.modules.ideogram.prototype.karyotypeClear = function(id)
{
  //Get the draw zone
  var draw = this._karyotype.draw;

  //Get the layer
  var canvas = this._canvas.el.layer(id);

  //Clear a rectangle
  canvas.Clear({ x: 0, y: draw.top, width: draw.real_width, height: draw.real_height });

  //Continue
  return this;
};
