//Open a chromosome
jviz.modules.ideogram.prototype.chromosome = function(id)
{
  //Check for undefined
  if(typeof id === 'undefined'){ return this; }

  //Check for integer
  if(typeof id === 'number')
  {
    //Save the chromosome
    this._chromosome.now = id;

    //Draw and exit
    return this.draw();
  }

  //Find the chromosome name
  for(var i = 0; i < this._genome.chromosomes.length; i++)
  {
    //Get the chromosome
    var chr = this._genome.chromosomes[i];

    //Check the chromosome name
    if(chr.name !== id){ continue; }

    //Save the actual chromosome
    this._chromosome.now = i;

    //Draw the chromosome
    return this.draw();
  }

  //Display error
  jviz.console.error('Chromosome ' + id + ' not found', null);

  //Exit
  return this;
};

//Draw a chromosome
jviz.modules.ideogram.prototype.chromosomeDraw = function()
{
  //Show loading
  this.loading(true);

  //Display in console
  console.log('Draw chromosome ' + this._chromosome.now);

  //Check the actual chromosome
  if(this._chromosome.now < 0){ return this.chromosomeEmpty(); }

  //Get the draw zone
  var draw = this._chromosome.draw;

  //Get the middle canvas
  var canvas = this._canvas.el.layer(this._chromosome.draw.layer);

  //Clear the chromosome view
  this.chromosomeClear(this._chromosome.draw.layer);

  //Get the chromosome info
  var chr = this._genome.chromosomes[this._chromosome.now];

  //Save the chromosome scale
  this._chromosome.scale = draw.width / chr.length;

  //Save the chromosome width
  this._chromosome.width = draw.width;

  //Calculate the chromosome position x
  this._chromosome.posx = draw.margin.left;

  //Calculate the chromosome position y
  this._chromosome.posy = draw.top + draw.margin.top + (draw.height - this._chromosome.height) / 2;

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

  //Update the foot content
  this._panel.el.footContent(this._chromosome.foot.replace('{c}', chr.name).replace('{r}', regions.length));

  //Exit
  return this;
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

//Chromosome click down
jviz.modules.ideogram.prototype.chromosomeDown = function(x, y)
{
  //Check for click over the zone
  if(this.chromosomeOver(x, y) === false){ return; }

  //Find the region
  var index = this.regionOver(x, y);

  //Check for undefined region
  if(index === -1){ return; }

  //Get the chromosome info
  var chr = this._genome.chromosomes[this._chromosome.now];

  //Get the region info
  var region = this._chromosome.regions.list[index];

  //Call the event
  this._events.emit('click:region', region.name, chr.name, region.start, region.end, index);
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
  this._canvas.el.layer(this._chromosome.regions.label.layer).Clear();

  //Check for null index
  if(index < 0)
  {
    //Remove the pointer cursor
    jviz.cursor.remove('pointer');

    //Exit
    return;
  }

  //Draw the region
  this.regionsDrawLabel(this._chromosome.regions.label.layer, index, this._chromosome.regions.label.opacity);

  //Draw the marks
  //this.ChromosomeDrawMarksIndex(canvas, index, this.marks.chromosomes.opacity);

  //Add the pointer cursor
  jviz.cursor.set('pointer');
};

//Chromosome leave
jviz.modules.ideogram.prototype.chromosomeLeave = function()
{

};

//Draw an empty chromosome
jviz.modules.ideogram.prototype.chromosomeEmpty = function()
{
  //Clear the chromosome view
  this.chromosomeClear(this._chromosome.draw.layer);

  //Continue
  return this;
};

//Clear the chromosome panel
jviz.modules.ideogram.prototype.chromosomeClear = function(id)
{
  //Get the draw
  var draw = this._chromosome.draw;

  //Get the canvas layer
  var canvas = this._canvas.el.layer(id);

  //Clear the canvas
  canvas.Clear({ x: 0, y: draw.top, width: draw.real_width, height: draw.real_height });

  //Exit
  return this;
};
