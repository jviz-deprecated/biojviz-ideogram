# Ideogram

A **jviz** module to build an ideogram.

## Installation

Use the **jviz CLI** for installing this module:

```
jviz install ideogram
```

## Reference

- [Options](#options): a compilation with all the options that you can provide to the **ideogram constructor**.
- [API](#api): all the commands to manipulate the ideogram.
- [Events](#events): the **ideogram module** emits events when the user interacts with the tool. Here we present all the events available.

### Options

### API

#### ideogram.chromosome(index)

Open the provided chromosome. The `index` argument must be a string with the chromosome name.

#### ideogram.getChromosomes()

Return an array with all the chromosomes.

#### ideogram.getRegions(name)

Return an array with all the regions for a given chromosome. The `name` argument must be an string with the name of the wanted chromosome.

#### ideogram.getMarks(name)

Return an array with the marked regions. The `name` argument must be an string with the name of the wanted chromosome.


### Events

#### ideogram.on('click:chromosome', handler)

Emit the `handler` function when the user clicks on a chromosome on the ideogram. The `handler` function will be called with the following arguments:
- `name`: the chromosome name.
- `index`: the index of the chromosome on the genome list.

#### ideogram.on('click:region', handler)

Emit the `handler` function when the user clicks on a region. The `handler` function will be called with the following arguments:
- `name`: region name.
- `chromosome`: chromosome where the region is located.
- `start`: region start position.
- `end`: region end position.

#### ideogram.on('click:btn:preview', handler)

Emit the `handler` function when the user clicks on the preview button.

#### ideogram.on('click:btn:table', handler)

Emit the `handler` function when the user clicks on the table button.

## License

[MIT LICENSE](./LICENSE) &copy; The Jviz Team.
