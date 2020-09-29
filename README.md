# blessed-widget-manager
A centralized management module for [blessed](https://github.com/chjj/blessed) widgets.

## Install
```
$ npm i blessed-widget-manager

# OR

$ yarn add blessed-widget-manager
```

## Example
```js
const blessed = require('blessed')

// usable
// const contrib = require('blessed-contrib')


const WidgetManager = require('blessed-widget-manager')
const wm = new WidgetManager()

// Shorthands
// const wm = new (require('blessed-widget-manager'))()


// Register a customized method
wm.property.register('spliceLine', widget => {
  return (i, line) => {
    if (widget.getLine(i)) widget.deleteLine(i)
    widget.insertLine(i, line)
  }
})


const screen = blessed.screen({
  smartCSR: true,
  title: 'my window title'
})


// Register a widget
wm.register('box1', blessed.box({ ... }))
wm.register('box2', blessed.box({ ... }))
wm.register('box3', blessed.box({ ... }))


// Refer to a registered widget
wm.widget.box1.setContent('Hello')


// NG
// wm.widget.box1.spliceLine(0, 'splice text')
// wm.widget.box2.spliceLine(0, 'splice text')
// ...

// Apply a customized method
wm.property.apply('box1', 'spliceLine')

// OK
wm.widget.box1.spliceLine(0, 'splice text')

// NG
// wm.widget.box2.spliceLine(0, 'splice text')
// ...


// Executing a method of a registered widget
wm.exec('hide', { except: 'box1' })

// equal to the below
// wm.widget.box2.hide()
// wm.widget.box3.hide()


screen.render();
```
