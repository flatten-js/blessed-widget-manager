export default class WidgetManager {
  constructor() {
    this.widget = {}
    this.property = this._OptionTemplate()
  }

  _OptionTemplate() {
    let OptionTemplate = class {
      constructor() {}

      register(name, data) {
        this[name] = data
      }
    }

    OptionTemplate.prototype.apply = (target, names) => {
      names = [].concat(names)
      const widget = this.widget[target]
      names.forEach(name => widget[name] = OptionTemplate[name](widget))
    }

    return OptionTemplate = new OptionTemplate()
  }

  register(name, widget) {
    this.widget[name] = widget
  }

  exec(name, opts = {}) {
    this._narrow(opts).forEach(widget => widget[name]())
  }

  _narrow({ only, except = [] }) {
    only = only && [].concat(only)
    except = [].concat(except)

    if (only) return only.map(name => this.widget[name])

    return Object.keys(this.widget).reduce((acc, cur) => {
      if (except.includes(cur)) return acc
      return [...acc, this.widget[cur]]
    }, [])
  }
}
