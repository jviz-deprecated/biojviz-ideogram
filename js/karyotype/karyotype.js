//Karyotype object
jviz.modules.ideogram_karyotype = function(opt)
{
  //Check the options
  if(typeof opt !== 'object'){ var opt = {}; }

  //Save the ideogram ID
  this._id = (typeof opt.id === 'undefined') ? jviz.misc.getID({ prefix: 'ideogram-karyotype', length: 5 }) : opt.id;

  //Save the ideogram class
  this._class = (typeof opt.class === 'undefined') ? 'jviz-modules-ideogram-karyotype' : opt.class;

  //Parent element
  this._parent = opt.parent;

  //Default layout width
  this._width = (typeof opt.width !== 'undefined') ? opt.width : '100%';

  //Default canvas height
  this._height = (typeof opt.height !== 'undefined') ? opt.height : 120;

  //Canvas object
  this._canvas = {};
  this._canvas.id = this._id + '-canvas'; //Canvas ID
  this._canvas.parent = this._parent; //Parent canvas ID
  this._canvas.width = this._width; //Canvas width
  this._canvas.height = this._height; //Canvas height
  this._canvas.layers = 5; //Number of layers
  this._canvas.margin = { top: 10, bottom: 20, left: 40, right: 40 }; //Canvas margin
  this._canvas.el = null; //Canvas element

  //Chromosome info
  this._chromosome = {};
  this._chromosome.width = 15; //Chromosome width
  this._chromosome.height = 0; //Chromosome height
  this._chromosome.radius = 6; //Chromosome radius
  this._chromosome.layer = 2; //Chromosome layer
  this._chromosome.positions = []; //Chromosome positions
  this._chromosome.max = 0; //Max chromosome size
  this._chromosome.margin = 0; //Chromosome margin

  //Chromosome text info
  this._text = {};
  this._text.font = jviz.font.default; //Text font
  this._text.size = '11px'; //Text size
  this._text.color = jviz.colors.blue2.hex; //Chromosomes text color
  this._text.align = 'center'; //Chromosomes text align
  this._text.margin = 5; //Chromosomes text margin top

  //Chromosomes hover
  this._hover = {};
  this._hover.index = -1; //Hover chromosome index
  this._hover.margin = { top: 10, bottom: 20, left: 10, right: 10 }; //Hover margin
  this._hover.color = jviz.colors.white.hex; //Hover background color
  this._hover.opacity = 1.0; //Hover background color opacity
  this._hover.radius = 10; //Hover radius

  //Fill object
  this._fill = {};

  //Fill chromosome
  this._fill.chromosome = {};
  this._fill.chromosome.color = jviz.colors.blue2.hex; //Chromosome fill color
  this._fill.chromosome.opacity = 0.5; //Chromosome fill opacity

  //Centromere
  this._fill.centromere = {};
  this._fill.centromere.color = jviz.colors.blue2.hex; //Centromere fill color
  this._fill.centromere.opacity = 0.8; //Centromere fill opacity

  //Build the karyotype element
  this.build();

  //Return this
  return this;
};
