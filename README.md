# ember-searchable-collection

[![Build Status](https://travis-ci.org/gmurphey/ember-searchable-collection.svg?branch=master)](https://travis-ci.org/gmurphey/ember-searchable-collection)

**This addon is deprecated.** TL;DR: You can use (ember-search-helper)[https://github.com/gmurphey/ember-search-helper] instead. Slightly longer version: users quickly encountered issues when this addon was so prescriptive about the input component used. I've re-written the functionality as a (helper)[https://github.com/gmurphey/ember-search-helper] that's hopefully a bit more flexible for your project.

The `searchable-collection` component offers simple search functionality with a minimal UI.

**NOTE**: the `searchable-collection` component uses contextual components, and requires Ember 2.3 or higher.

```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  fruits: Ember.A(['apples', 'oranges', 'bananas']);
});
```

```hbs
{{#searchable-collection fruits as |search|}}
  <p>
    {{!-- search input --}}
    {{search.field}}
  </p>

  <p>
  {{#each search.results as |fruit|}}
    {{fruit}}<br>
  {{/each}}
  </p>
{{/searchable-collection}}
```

For more complex collection members, we're able to define which properties are queryable using the `searchableProperties` property:

```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  fruits: Ember.A([{
    name: 'apples',
    opinion: 'good'
  }, {
    name: 'oranges',
    opinion: 'awesome'
  }, {
    name: 'bananas',
    opinion: 'meh'
  }]),

  searchableProperties: Ember.A(['name', 'opinion'])
});
```

```hbs
{{#searchable-collection fruits searchableProperties=searchableProperties as |search|}}
  {{search.field}}

  <p>
  {{#each search.results as |fruit|}}
    {{fruit.name}} ({{fruit.opinion}})<br>
  {{/each}}
  </p>
{{/searchable-collection}}
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
