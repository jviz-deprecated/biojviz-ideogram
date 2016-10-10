//Ideogram object
// Arguments:
// - opt: an object with the following keys:
//   - id: the ideogram ID
//   - class: the ideogram class
//   - parent: the ideogram parent element (mandatory)
//   - width: ideogram width. Default is 100%
//   - height: ideogram height. Default is 160px
//
jviz.modules.ideogram = function(opt)
{
  //Check the options
  if(typeof opt !== 'object'){ var opt = {}; }

  //Save the ideogram ID
  this._id = (typeof opt.id === 'undefined') ? jviz.utils.getID({ prefix: 'ideogram', length: 5 }) : opt.id;

  //Save the ideogram class
  this._class = (typeof opt.class === 'undefined') ? 'jviz-modules-ideogram' : opt.class;

  //Parent element
  this._parent = opt.parent;

  //Number of layers
  this._layers = 5;

  //Title
  this._title = 'Ideogram';

  //Detail
  this._detail = '';

  //Loading
  this._loading = false;

  //Margins
  this._margins = { top: 10, bottom: 20, left: 40, right: 40 };

  //Default layout width
  this._width = (typeof opt.width !== 'undefined') ? opt.width : '100%';

  //Default canvas height
  this._height = (typeof opt.height !== 'undefined') ? opt.height : 120;

  //Build the element
  jviz.dom.append(this._parent, { _tag: 'div', id: this._id, class: this._class });

  //Build the panel
  this._panel = new jviz.components.panel({ id: this._id + '-panel', parent: this._id, title: this._title, detail: this._detail });

  //Build the canvas layers
  this._canvas = new jviz.components.canvas({ id: this._id + '-canvas', parent: this._panel.body().id, layers: this._layers, width: this._width, height: this._height, margin: this._margins });

  //Genome object
  this._genome = {};
  this._genome.name = ''; //Genome name
  this._genome.assembly = ''; //Genome assembly
  this._genome.chromosomes = []; //Genome chromosomes

  //Regions list
  this._regions = {};
  this._regions.list = {}; //Regions list
  this._regions.name = 'Regions'; //Regions name

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

  //Preview view
  this._preview = {};
  this._preview.positions = []; //Preview positions
  this._preview.margin = 0; //Preview margin
  this._preview.max = 0; //Preview max chromosome size
  this._preview.layer = 2; //Preview draw layer
  this._preview.foot = 'No chromosome selected'; //Default foot text

  //Preview chromosomes
  this._preview.chromosome = {};
  this._preview.chromosome.width = 15; //Preview chromosome width
  this._preview.chromosome.height = 0; //Preview chromosome height
  this._preview.chromosome.radius = 6; //Preview chromosome radius

  //Preview text
  this._preview.text = {};
  this._preview.text.font = 'Asap'; //Text font
  this._preview.text.size = '11px'; //Text size
  this._preview.text.color = jviz.colors.blue2.hex; //Chromosomes text color
  this._preview.text.align = 'center'; //Chromosomes text align
  this._preview.text.margin = 5; //KChromosomes text margin top

  //Preview chromosomes hover
  this._preview.hover = {};
  this._preview.hover.index = -1; //Hover chromosome index
  this._preview.hover.margin = { top: 10, bottom: 20, left: 10, right: 10 }; //Hover margin
  this._preview.hover.color = jviz.colors.white.hex; //Hover background color
  this._preview.hover.opacity = 1.0; //Hover background color opacity
  this._preview.hover.radius = 10; //Hover radius

  //Chromosome
  this._chromosome = {};
  this._chromosome.posx = 0; //Chromosome position x
  this._chromosome.posy = 0; //Chromosome position y
  this._chromosome.width = 0; //Chromsome width
  this._chromosome.height = 50; //Chromosome height
  this._chromosome.now = -1; //Actual chromosome
  this._chromosome.scale = 1; //Chromosome scale
  this._chromosome.radius = 20; //Chromosome radius
  this._chromosome.layer = 2; //Chromosome draw layer

  //Chromosome util positions
  this._chromosome.utils = {};
  this._chromosome.utils.posy_start = 0; //Position y start
  this._chromosome.utils.posy_end = 0; //Position y end
  this._chromosome.utils.up = 0; //Up zone
  this._chromosome.utils.down = 0; //Down zone

  //Chromosome position
  this._chromosome.position = {};
  this._chromosome.position.width = 80; //Position width
  this._chromosome.position.height = 20; //Position height
  this._chromosome.position.posx = 0; //Position x
  this._chromosome.position.posy = 0; //Position y
  this._chromosome.position.radius = 5; //Position radius
  this._chromosome.position.margin = 26; //Position margin
  this._chromosome.position.fill = jviz.colors.blue2.hex; //Position fill color
  this._chromosome.position.triangle = 6; //Triangle width
  this._chromosome.position.layer = 1; //Position layer

  //Chromosome position text
  this._chromosome.position.text = {};
  this._chromosome.position.text.color = jviz.colors.white.hex; //Position text color
  this._chromosome.position.text.font = 'Asap'; //Position text font
  this._chromosome.position.text.size = '11px'; //Position text size
  this._chromosome.position.text.align = 'center'; //Position text align
  this._chromosome.position.text.margin = 4; //Position text margin

  //Chromosome regions
  this._chromosome.regions = {};
  this._chromosome.regions.list = []; //Regions list
  this._chromosome.regions.fill = jviz.colors.red2.hex; //Regions color
  this._chromosome.regions.opacity = 0.8; //Regions opacity
  this._chromosome.regions.click = 3; //Regions click margin

  //Chromosome regions label
  this._chromosome.regions.label = {};
  this._chromosome.regions.label.posx = 0; //Regions label position x
  this._chromosome.regions.label.posy = 0; //Regions label position y
  this._chromosome.regions.label.width = 70; //Regions label width
  this._chromosome.regions.label.height = 18; //Regions label height
  this._chromosome.regions.label.margin = 6; //Regions label margin
  this._chromosome.regions.label.radius = 5; //Regions label radius
  this._chromosome.regions.label.fill = jviz.colors.red2.hex; //Regions label color
  this._chromosome.regions.label.opacity = 1.0; //Regions label opacity
  this._chromosome.regions.label.layer = 3; //Regions label canvas layer
  this._chromosome.regions.label.triangle = 6; //Regions label triangle
  this._chromosome.regions.label.hover = -1; //Regions label hover now

  //Chromosome regions label text
  this._chromosome.regions.label.text = {};
  this._chromosome.regions.label.text.font = 'Asap'; //Label regions text font
  this._chromosome.regions.label.text.size = '10px'; //Label regions text size
  this._chromosome.regions.label.text.align = 'center'; //Label regions text align
  this._chromosome.regions.label.text.color = jviz.colors.white.hex; //Label regions text color
  this._chromosome.regions.label.text.margin = 3; //Label regions text margin

  //Chromosome regions preview
  this._chromosome.regions.preview = {};
  this._chromosome.regions.preview.layer = 0; //Preview chromosome regions layer
  this._chromosome.regions.preview.active = true; //Preview chromosome regions active
  this._chromosome.regions.preview.opacity = 0.3; //Preview chromosome regions opacity

  //Marks
  this._marks = {};
  this._marks.list = {}; //Marks list
  this._marks.fill = jviz.colors.purple2.hex; //Marks fill color
  this._marks.triangle = 5; //Triangle width

  //Marks for karyotypes
  this._marks.karyotypes = {};
  this._marks.karyotypes.width = 25; //Mark for karyotypes width
  this._marks.karyotypes.height = 17; //Mark for karyotypes height
  this._marks.karyotypes.margin = 22; //Mark for karyotypes margin
  this._marks.karyotypes.radius = 5; //Mark for karyotypes radius
  this._marks.karyotypes.triangle = 1; //Mark for karyotyopes triangle margin
  this._marks.karyotypes.text = 2; //Marks for karyotypes text margin

  //Marks for chromosomes
  this._marks.chromosomes = {};
  this._marks.chromosomes.width = 25; //Mark for chromosomes width
  this._marks.chromosomes.height = 17; //Mark for chromosomes height
  this._marks.chromosomes.margin = 22; //Mark for chromosomes margin
  this._marks.chromosomes.radius = 5; //Mark for chromosomes radius
  this._marks.chromosomes.triangle = 1; //Mark for chromosomes triangle margin
  this._marks.chromosomes.text = 2; //Marks for chromosomes text margin
  this._marks.chromosomes.opacity = 1.0; //Marks for chromosomes default opacity

  //Marks for chromosomes preview
  this._marks.chromosomes.preview = {};
  this._marks.chromosomes.preview.active = true; //Chromosomes marks preview active
  this._marks.chromosomes.preview.opacity = 0.3; //Chromosomes marks preview opacity

  //Marks text
  this._marks.text = {};
  this._marks.text.x = 0; //Marks text position x
  this._marks.text.y = 0; //Marks text position y
  this._marks.text.text = ''; //Marks text text
  this._marks.text.font = 'Asap'; //Marks text font
  this._marks.text.size = '12px'; //Marks text size
  this._marks.text.color = '#ffffff'; //Marks text color
  this._marks.text.align = 'center'; //Marks text align

  //Add the events
  this.events();

  //Check the genomes
  if(typeof opt.genome === 'object'){ this.genome(opt.genome); }

  //Check the regions
  if(typeof opt.regions === 'object'){ this.regions(opt.regions); }

  //Return this
  return this;
};
