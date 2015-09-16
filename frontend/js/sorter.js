var Sorter = (function () {

  function trueData(el, dataAttrib) {
    return el instanceof jQuery ?
      el.data(dataAttrib) === '' :
      $(el).data(dataAttrib) === '';
  }

  function click(e) {
    e.preventDefault();

    var $this = $(e.target).parent('dd');

    e.data.this.process($this);
  }

  function onSelectChange() {
    var $that = $(this).find('option:selected');
    this.process($that);
  }

  function Sorter(el, itemEl, sortFn) {
    this.$sorts = $(el);
    this.sort = sortFn;
    this.$select = this.$sorts.find('select');

    this.asc = false;
    this.desc = false;

    this.$ = {
      button: {
        asc: this.$sorts.find('dd[data-sort-asc]'),
        desc: this.$sorts.find('dd[data-sort-desc]'),
        reset: this.$sorts.find('dd[data-reset-sort]')
      },
      select: {
        asc: this.$select.find('option[data-sort-asc]'),
        desc: this.$select.find('option[data-sort-desc]'),
        none: this.$select.find('option[data-reset-sort]')
      }
    };

    this.$sorts.on('click', itemEl, {this: this}, click);
    this.$select.change(onSelectChange.bind(this));
  }

  Sorter.prototype.process = function(that) {
    this.$sorts.find('.active').removeClass('active');

    if(trueData(that, 'sort-asc') && !this.asc) {
      this.sortBy('asc');
    } else if (trueData(that, 'sort-desc') && !this.desc) {
      this.sortBy('desc');
    } else {
      this.sortBy(false);
    }
  }

  Sorter.prototype.sortBy = function(dir /* 'asc', 'desc', or false */) {
    this.asc = this.desc = false;
    if (dir) {
      this[dir] = true;
      this.$.button[dir].addClass('active');
      this.$.select[dir].attr('Selected', true);
      this.sort('price', this.asc);
    } else {
      this.$.select.none.attr('Selected', true);
      this.sort('', '');
    }
  }

  return Sorter;
}());
