//Calculate the karyotypes margin
jviz.modules.ideogram.prototype.marginKaryotypes = function()
{
  //Get the canvas draw zone
  var draw = this._canvas.draw();

  //Calculate free space
	var free = draw.width - this._genome.chromosomes.length * this._karyotypes.width;

	//Get the margin
	this._karyotypes.margin = free / (this._genome.chromosomes.length - 1);
};

//jvizToolKaryotypeTrack draw karyotypes
jviz.modules.ideogram.prototype.drawKaryotypes = function()
{
  //Get the canvas draw zone
  var draw = this._canvas.draw();

  //Calculate the margin
  this.marginKaryotypes();

  //Get the middle layer
  var canvas = this._canvas.layer(2);

  //Clear the canvas
  canvas.Clear();

  //Reset the karyotypes positions
  this._karyotypes.positions = [];

  //Draw all the karyotypes
  for(var i = 0; i < this._genome.chromosomes.length; i++)
  {
    //Get the chromosome
    var chr = this._genome.chromosomes[i];

    //Get the mark for this chromosome
    //var marks = this.GetMarks(ch.id).length;
    var marks = 0;

    //Get the chromosome width
    var width = this._karyotypes.width;

    //Get the chromosome height
    var height = draw.height * (chr.length / this._karyotypes.max);

    //Get the chromosome position x
    var posx = draw.margin.left + (i + 0) * this._karyotypes.margin + i * this._karyotypes.width;

    //Get the chromosome position y
    var posy = draw.margin.top + draw.height - height;

    //Get the chromosome radius
    var radius = this._karyotypes.radius;

    //Draw the chromosome
    canvas.Rect({ x: posx, y: posy, width: width, height: height, radius: radius });

    //Set the chromsome fill color
    canvas.Fill({ color: this._fill.chromosome.color, opacity: this._fill.chromosome.opacity });

    //Save the position
    this._karyotypes.positions.push({ x: posx, y: posy, width: width, height: height });

    //Check for draw the centromere
    if(typeof chr.centromere !== 'undefined')
    {
      //Centromere width
      var cent_width = this._karyotypes.width;

      //Centromere start
      var cent_start = draw.height * (chr.centromere[0] / this._karyotypes.max);

      //Centromere end
      var cent_end = draw.height * (chr.centromere[1] / this._karyotypes.max);

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
    var text_x = posx + this._karyotypes.width / 2;

    //Get the text position y
    var text_y = draw.margin.top + draw.height + this._karyotypes.text.margin;

    //Get the text color
    var text_color = this._karyotypes.text.color;

    //Get the text size
    var text_size = this._karyotypes.text.size;

    //Get the text font
    var text_font = this._karyotypes.text.font;

    //Get the text align
    var text_align = this._karyotypes.text.align;

    //Draw the chromosome title
    canvas.Text({ x: text_x, y: text_y, text: text_txt, color: text_color, size: text_size, font: text_font, align: text_align });

    //Get the regions for this chromosome
    var regions = (typeof this._regions[chr.id] === 'undefined') ? [] : this._regions[chr.id];

    //Read all the regions
    for(var j = 0; j < regions.length; j++)
    {
      //Get the region
      var re = regions[j];

      //Region start
      var re_start = draw.height * (re.start / this._karyotypes.max);

      //Region end
      var re_end = draw.height * (re.end / this._karyotypes.max);

      //Region width
      var re_width = this._karyotypes.width;

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
    var mark_x = posx + this._karyotypes.width / 2 - this._marks.karyotypes.width / 2;

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
    this._marks.text.x = posx + this._karyotypes.width / 2;

    //Update the text position y
    this._marks.text.y = mark_y + this._marks.karyotypes.text;

    //Update the text
    this._marks.text.text = marks.toString();

    //Draw the text
    canvas.Text(this._marks.text);

    //Update the mark position x
    mark_x = posx + this._karyotypes.width / 2;

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
  this._karyotypes.hover.hover = -1;

  //Set loading as false
  this.loading(false);
};
