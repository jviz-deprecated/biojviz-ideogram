//Draw a chromosome
jviz.modules.ideogram.prototype.chromosomeDraw = function()
{
  //Show loading
  this.loading(true);

  //Clear all layers
  this._canvas.clear();

  //Check the actual chromosome
  if(this._chromosome.now < 0){ return; }

  //Get the draw zone
  var draw = this._canvas.draw();

  //Get the middle canvas
  var canvas = this._canvas.layer(this._chromosome.layer);

  //Clear the canvas
  canvas.Clear();

  //Get the chromosome info
  var chr = this._genome.chromosomes[this._chromosome.now];

  //Get the mark for this chromosome
  //var marks = this.GetMarks(chr.name);
  var marks = [];

  //Save the chromosome scale
  this._chromosome.scale = draw.width / chr.length;

  //Save the chromosome width
  this._chromosome.width = draw.width;

  //Calculate the chromosome position x
  this._chromosome.posx = draw.margin.left;

  //Calculate the chromosome position y
  this._chromosome.posy = draw.margin.top + (draw.height - this._chromosome.height) / 2;

  //Get the chromosome x point
  var chr_x = this._chromosome.posx;

  //Get the chromosome y point
  var chr_y = this._chromosome.posy;

  //Get the chromosome width
  var chr_width = this._chromosome.width;

  //Get the chromosome height
  var chr_height = this._chromosome.height;

  //Get the chromosome radius
  var chr_radius = this._chromosome.radius;

  //Draw the chromosome rectangle
  canvas.Rect({ x: chr_x, y: chr_y, width: chr_width, height: chr_height, radius: chr_radius });

  //Chromosome rectangle fill
  canvas.Fill({ color: this._fill.chromosome.color, opacity: this._fill.chromosome.opacity });

  //Check for draw the centromere
  if(typeof chr.centromere !== 'undefined')
  {
    //Calculate the centromere start point
    var cent_start = Math.floor(chr.centromere[0] * this._chromosome.scale);

    //Calculate the centromere end
    var cent_end = Math.floor(chr.centromere[1] * this._chromosome.scale);

    //Calculate the centromere width
    var cent_width = Math.abs(cent_end - cent_start);

    //Clear the centromere rectangle
    canvas.Clear({ x: cent_start, y: chr_y, width: cent_width, height: chr_height });

    //Create the centromere points
    var p = [];

    //Add the centromere top start
    p.push([ cent_start, chr_y ]);

    //Add the centromere top middle
    p.push([ cent_start + cent_width/2, chr_y + chr_height/2 ]);

    //Add the centromere top end
    p.push([ cent_end, chr_y ]);

    //Add the centromere bottom end
    p.push([ cent_end, chr_y + chr_height ]);

    //Add the centromere bottom middle
    p.push([ cent_start + cent_width/2, chr_y + chr_height/2 ]);

    //Add the centromere bottom start
    p.push([ cent_start, chr_y + chr_height ]);

    //Add the lines
    canvas.Line(p);

    //Add the fill
    canvas.Fill({ color: this._fill.centromere.color, opacity: this._fill.centromere.opacity });
  }

  //Calculate the regions label position y
  this._chromosome.regions.label.posy = this._chromosome.posy + this._chromosome.height + this._chromosome.regions.label.margin;

  //Get the regions for this chromosome
  var regions = (typeof this._regions.list[chr.name] === 'undefined') ? [] : this._regions.list[chr.name];

  //Initialize the chromosome regions positions list
  this._chromosome.regions.list = [];

  //Read all the regions
  for(var i = 0; i < regions.length; i++)
  {
    //Get the region
    var region = regions[i];

    //Calculate the start position
    var rect_start = this._chromosome.posx + region.start * this._chromosome.scale;

    //Calculate the end position
    var rect_end = this._chromosome.posx + region.end * this._chromosome.scale;

    //Calculate the width
    var rect_width = Math.max(1, rect_end - rect_start);

    //Save the rectangle height
    var rect_height = this._chromosome.height;

    //Save the Y position
    var rect_y = this._chromosome.posy;

    //Draw the region
    canvas.Rect({ x: rect_start, y: rect_y, width: rect_width, height: rect_height });

    //Fill the region
    canvas.Fill({ color: this._chromosome.regions.fill, opacity: this._chromosome.regions.opacity });

    //Save the region start coordinate
    region.pstart = rect_start;

    //Save the region end coordinate
    region.pend = rect_end;

    //Save the middle point
    region.pmiddle = (region.pstart + region.pend) / 2;

    //Marks count
    var marks_count = 0;

    //Read all the marks
    for(var j = 0; j < marks.length; j++)
    {
      //Get the mark
      var mark = marks[j];

      //Check if mark is on the region
      if(region.end < mark.start || mark.end < region.start){ continue; }

      //Increment the counter
      marks_count = marks_count + 1;
    }

    //Save the marks count
    region.marks = marks_count;

    //Save the region position
    this._chromosome.regions.list.push(region);

    //Check for add the preview label
    if(this._chromosome.regions.preview.active === true)
    {
      //Add the preview label
      this.regionsDrawLabel(this._chromosome.regions.preview.layer, i, this._chromosome.regions.preview.opacity);
    }

    //Check for draw the marks preview
    if(this._marks.chromosomes.preview.active === true)
    {
      //Draw the mark this.marks.chromosomes.opacity
      //this.ChromosomeDrawMarksIndex(canvas_down, i, this._marks.chromosomes.preview.opacity);
    }
  }

  //Calculate the utils position y start
  this._chromosome.utils.posy_start = this._chromosome.posy;

  //Calculate the utils position y end
  this._chromosome.utils.posy_end = this._chromosome.posy + this._chromosome.height;

  //Calculate the up zone
  this._chromosome.utils.up = this._chromosome.posy;

  //Calculate the down zone
  this._chromosome.utils.down = this._height - this._chromosome.utils.posy_end;

  //Calculate the position coordinate y
  this._chromosome.position.posy = this._chromosome.posy - this._chromosome.position.margin;

  //Reset the hover region
  this._chromosome.regions.label.hover = -1;

  //Hide the loading
  this.loading(false);
};

//Check over chromosome zone
jviz.modules.ideogram.prototype.chromosomeOver = function(x, y)
{
  //Check the x coordinate
  if(x < this._chromosome.posx || this._chromosome.posx + this._chromosome.width < x){ return false; }

  //Check the y coordinate
  //if(y < this._chromosome.posy || this._chromosome.posy + this._chromosome.height < y){ return false; }

  //Return true
  return true;
};

//Chromosome click
jviz.modules.ideogram.prototype.chromosomeClick = function(x, y)
{
  //Check for click over the zone
  if(this.chromosomeOver(x, y) === false){ return; }

  //Find the region
  var index = this.regionOver(x, y);

  //Check for undefined region
  if(index === -1){ return; }

  //Open the region
};

//Chromosome move
jviz.modules.ideogram.prototype.chromosomeMove = function(x, y)
{
  //Check if is over the zone
  if(this.chromosomeOver(x, y) === false){ return; }

  //Draw the position
  this.positionDraw(x, y);

  //Check the region
  var index = this.regionOver(x, y);

  //Check for different index
  if(index === this._chromosome.regions.label.hover){ return; }

  //Update the index
  this._chromosome.regions.label.hover = index;

  //Clear the canvas
  //canvas.Clear({ x: 0, y: this.chromosome.utils.posy_end, width: this.width, height: this.chromosome.utils.down });
  this._canvas.layer(this._chromosome.regions.label.layer).Clear();

  //Check for null index
  //if(index < 0) { return this.CursorRemove('hand'); }
  if(index < 0){ return; }

  //Draw the region
  this.regionsDrawLabel(this._chromosome.regions.label.layer, index, this._chromosome.regions.label.opacity);

  //Draw the marks
  //this.ChromosomeDrawMarksIndex(canvas, index, this.marks.chromosomes.opacity);

  //Add the hand cursor
  //this.CursorSet('hand');
};

//Chromosome leave
jviz.modules.ideogram.prototype.chromosomeLeave = function()
{

};
