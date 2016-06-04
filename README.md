# ember-searchable-collection

[![Build Status](https://travis-ci.org/gmurphey/ember-searchable-collection.svg?branch=master)](https://travis-ci.org/gmurphey/ember-searchable-collection)

The `searchable-collection` component offers simple search functionality with a minimal, flexible UI.

**NOTE**: the `searchable-collection` component uses contextual components, and requires Ember 2.3 or higher.

```hbs
{{#searchable-collection (array "apples" "oranges" "bananas") as |search|}}
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

```hbs
{{#searchable-collection
  (array
    (hash
      name="apples"
      opinion="good"
    )
    (hash
      name="oranges"
      opinion="awesome"
    )
    (hash
      name="bananas"
      opinion="meh"
    )
  )
  searchableProperties=(array "name" "opinion")
as |search|}}
  {{search.field}}

  {{#each search.results as |fruit|}}
    {{fruit.name}} ({{fruit.opinion}})
  {{/each}}
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
