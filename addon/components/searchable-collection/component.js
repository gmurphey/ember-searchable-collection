import Ember from 'ember';
import layout from './template';

const {
  get,
  computed,
  isEmpty
} = Ember;

const search = function(query, collection, searchableProperties, matchCase) {
  let testValue = function(value, matchCase) {
    value = String(value);

    if (!matchCase) {
      value = value.toLowerCase();
    }

    return (value.indexOf(query) !== -1);
  };

  if (!matchCase) {
    query = query.toLowerCase();
  }

  if (isEmpty(query)) {
    return collection;
  }

  return collection.filter((item) => {
    if (!isEmpty(searchableProperties)) {
      return searchableProperties.some((prop) => {
        return testValue(get(item, prop), matchCase);
      });
    } else {
      return testValue(item, matchCase);
    }
  });
};

let searchableCollection = Ember.Component.extend({
  layout,
  tagName: '',
  collection: [],
  searchableProperties: [],
  query: '',
  matchCase: false,

  filteredCollection: computed('query', 'collection.[]', 'searchableProperties.[]', 'matchCase', function() {
    let query = get(this, 'query');
    let collection = get(this, 'collection');
    let searchableProperties = get(this, 'searchableProperties');
    let matchCase = get(this, 'matchCase');

    return search(query, collection, searchableProperties, matchCase);
  })
});

searchableCollection.reopenClass({
  positionalParams: ['collection']
});

export default searchableCollection;
