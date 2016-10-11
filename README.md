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

### Events

#### ideogram.on('click:chromosome', handler)

Emit the `handler` function when the user clicks on a chromosome on the ideogram. The `handler` function will be called with the following arguments:
- `name`: the chromosome name.
- `index`: the index of the chromosome on the genome list.


## License

[MIT LICENSE](./LICENSE) &copy; The Jviz Team.
