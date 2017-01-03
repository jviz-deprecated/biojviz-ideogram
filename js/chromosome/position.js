//Display a chromosome position
jviz.modules.ideogram.prototype.chromosomePosition = function(x, y)
{
  //Get the second layer
  var canvas = this._canvas.el.layer(this._chromosome.position.layer);

  //Clear
  this.chromosomeClearLayer(this._chromosome.position.layer);

  //Rectangle position x
  var rect_x = x - this._chromosome.position.width/2;

  //Rectangle position y
  var rect_y = this._chromosome.position.posy;

  //Rectangle width
  var rect_width = this._chromosome.position.width;

  //Rectangle height
  var rect_height = this._chromosome.position.height;

  //Rectangle radius
  var rect_radius = this._chromosome.position.radius;

  //Draw the rectangle
  canvas.Rect({ x: rect_x, y: rect_y, width: rect_width, height: rect_height, radius: rect_radius });

  //Draw the fill color
  canvas.Fill(this._chromosome.position.fill);

  //Get the real position
  var text_text = Math.floor((x - this._chromosome.posx) / this._chromosome.scale);

  //Format the real position
  text_text = jviz.math.format(text_text, '.');

  //Text position x
  var text_x = x;

  //Text position y
  var text_y = this._chromosome.position.posy + this._chromosome.position.text.margin;

  //Text align
  var text_align = this._chromosome.position.text.align;

  //Text color
  var text_color = this._chromosome.position.text.color;

  //Text font
  var text_font = this._chromosome.position.text.font;

  //Text size
  var text_size = this._chromosome.position.text.size;

  //Draw the text
  canvas.Text({ text: text_text, x: text_x, y: text_y, align: text_align, color: text_color, font: text_font, size: text_size });

  //Initialize the triangle array
  var tri = [];

  //Calculate the y position
  var py = this._chromosome.position.posy + this._chromosome.position.height;

  //Add the first point
  tri.push([ x - this._chromosome.position.triangle, py ]);

  //Add the middle point
  tri.push([ x, py + this._chromosome.position.triangle ]);

  //Add the first point
  tri.push([ x + this._chromosome.position.triangle, py ]);

  //Add the line
  canvas.Line(tri);

  //Add the fill color
  canvas.Fill(this._chromosome.position.fill);

  //Create the position line
  canvas.Line([[ x, py ], [ x, this._chromosome.posy + this._chromosome.height ]]);

  //Add the line stroke
  canvas.Stroke(this._chromosome.position.fill);
};
