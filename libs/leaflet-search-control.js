L.Control.Search = L.Control.extend({
  options: {
    // topright, topleft, bottomleft, bottomright
    position: 'topleft',
    placeholder: 'Search...'
  },
  initialize: function (options /*{ data: {...}  }*/) {
    // constructor
    L.Util.setOptions(this, options);
  },
  onAdd: function (map) {
    // happens after added to map
    var container = L.DomUtil.create('div', 'search-container');
    this.form = L.DomUtil.create('form', 'form', container);
    var group = L.DomUtil.create('div', 'form-group', this.form);
    this.input = L.DomUtil.create('input', 'form-control input-sm', group);
    this.input.type = 'text';
    this.input.placeholder = this.options.placeholder;
    this.results = L.DomUtil.create('div', 'list-group', group);
    L.DomEvent.addListener(this.input, 'keyup', this.keyup, this);
    L.DomEvent.addListener(this.form, 'submit', this.submit, this);
    L.DomEvent.disableClickPropagation(container);
    return container;
  },
  onRemove: function (map) {
    // when removed
    L.DomEvent.removeListener(this._input, 'keyup', this.keyup, this);
    L.DomEvent.removeListener(form, 'submit', this.submit, this);
  },
  keyup: function(e) {
    if (e.keyCode === 38 || e.keyCode === 40) {
      // do nothing
    } else {
      this.results.innerHTML = '';
      if (this.input.value.length > 2) {
        if(e.keyCode === 13){
          //enter was pressed
          alert(this.input.value + " was selected");
        } else {
          var value = this.input.value;

          var a = L.DomUtil.create('a', 'list-group-item');
          a.href = '';
          a.setAttribute('data-result-name', value);
          a.innerHTML = value;
          this.results.appendChild(a);
          L.DomEvent.addListener(a, 'click', this.itemSelected, this);
          return a;
        }
      }
    }
  },
  itemSelected: function(e) {
    L.DomEvent.preventDefault(e);
    var elem = e.target;
    var value = elem.innerHTML;
    this.input.value = elem.getAttribute('data-result-name');
    alert(value + " was selected");
    this.results.innerHTML = '';
  },
  submit: function(e) {
    L.DomEvent.preventDefault(e);
  }
});

L.control.search = function(id, options) {
  return new L.Control.Search(id, options);
}