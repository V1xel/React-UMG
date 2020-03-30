"use strict";

const ReactUMGClassMap = require('./ReactUMGClassMap');
const ClassMap = JavascriptLibrary.GetDerivedClasses(Widget, [], true)
const { set_attrs, set_attr } = require('./set_attrs');

function registerComponent(key, cls) {
  class klass {
    static createUmgElement(element, instantiator) {
      let elem = instantiator(cls);
      let props = _.pickBy(element.props, (v, k) => k != 'children')
      set_attrs(elem, props)
      return elem
    }

    static applyProperty(umgElem, value, key) {
      if (!umgElem) return;
      if (key != 'children') {
        set_attr(umgElem, key, value)
      }
    }
  }
  ReactUMGClassMap[key] = klass;
}

ClassMap.Results.forEach(cls => {
  const [last] = JavascriptLibrary.GetClassPathName(cls).split('.').reverse();
  const [key] = last.split('_');
  registerComponent('U' + key, cls)
})

module.exports = {
  Register: registerComponent
};