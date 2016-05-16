import Ember from 'ember';
import layout from './template';

const {
  get,
  computed,
  isEmpty
} = Ember;

export default Ember.Component.extend({
  layout,
  collection: [],
  searchableProperties: [],
  query: '',

  filteredCollection: computed('query', 'collection.[]', 'searchableProperties.[]', function() {
    let query = get(this, 'query');
    let collection = get(this, 'collection');
    let searchableProperties = get(this, 'searchableProperties');

    if (isEmpty(query)) {
      return collection;
    }

    return collection.filter((item) => {
      if (!isEmpty(searchableProperties)) {
        return searchableProperties.some((prop) => {
          return (get(item, prop).indexOf(query) !== -1);
        });
      } else {
        return (item.indexOf(query) !== -1);
      }
    });
  })
});
