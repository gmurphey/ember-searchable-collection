import Ember from 'ember';
import layout from './template';

const {
  get,
  computed,
  isEmpty
} = Ember;

const defaultSearch = function(query, collection, searchableProperties) {
  if (isEmpty(query)) {
    return collection;
  }

  return collection.filter((item) => {
    if (!isEmpty(searchableProperties)) {
      return searchableProperties.some((prop) => {
        return (String(get(item, prop)).indexOf(query) !== -1);
      });
    } else {
      return (String(item).indexOf(query) !== -1);
    }
  });
};

export default Ember.Component.extend({
  layout,
  collection: [],
  searchableProperties: [],
  query: '',

  filteredCollection: computed('query', 'collection.[]', 'searchableProperties.[]', function() {
    let query = get(this, 'query');
    let collection = get(this, 'collection');
    let searchableProperties = get(this, 'searchableProperties');
    let search = get(this, 'search') || defaultSearch;

    return search(query, collection, searchableProperties);
  })
});
