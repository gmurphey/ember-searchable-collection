import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('searchable-collection', 'Integration | Component | searchable collection', {
  integration: true
});

test('it renders a default state', function(assert) {
  this.render(hbs`
    {{#searchable-collection collection=(array "apples" "bananas" "oranges") as |search|}}
      {{search.field}}

      {{#if search.results}}
        <ul>
          {{#each search.results as |result|}}
            <li>{{result}}</li>
          {{/each}}
        </ul>
      {{/if}}
    {{/searchable-collection}}
  `);

  assert.equal(this.$('input').val(), '');
  assert.equal(this.$('ul li').length, 3);
});

test('it can have zero results', function(assert) {
  this.render(hbs`
    {{#searchable-collection query="kirby" collection=(array "apples" "bananas" "oranges") as |search|}}
      {{search.field}}

      {{#unless search.results}}
        <p>No results.</p>
      {{/unless}}
    {{/searchable-collection}}
  `);

  assert.equal(this.$('input').val(), 'kirby');
  assert.equal(this.$('p').text().trim(), 'No results.');
});

test('it renders a searching state', function(assert) {
  this.render(hbs`
    {{#searchable-collection query="Apples" collection=(array "apples" "bananas" "oranges") as |search|}}
      {{search.field}}

      {{#if search.results}}
        <ul>
          {{#each search.results as |result|}}
            <li>{{result}}</li>
          {{/each}}
        </ul>
      {{/if}}
    {{/searchable-collection}}
  `);

  assert.equal(this.$('input').val(), 'Apples');
  assert.equal(this.$('ul li').length, 1);
  assert.equal(this.$('ul li:eq(0)').text().trim(), 'apples');
});

test('the results can match partial queries', function(assert) {
  this.render(hbs`
    {{#searchable-collection query="GES" collection=(array "apples" "bananas" "oranges") as |search|}}
      {{search.field}}

      {{#if search.results}}
        <ul>
          {{#each search.results as |result|}}
            <li>{{result}}</li>
          {{/each}}
        </ul>
      {{/if}}
    {{/searchable-collection}}
  `);

  assert.equal(this.$('ul li').length, 1);
  assert.equal(this.$('ul li:eq(0)').text().trim(), 'oranges');
});

test('the results can be forced to match the case of the query', function(assert) {
  this.render(hbs`
    {{#searchable-collection query="GES" collection=(array "apples" "bananas" "oranges") matchCase=true as |search|}}
      {{search.field}}

      {{#if search.results}}
        <ul>
          {{#each search.results as |result|}}
            <li>{{result}}</li>
          {{/each}}
        </ul>
      {{else}}
        <p>No results.</p>
      {{/if}}
    {{/searchable-collection}}
  `);

  assert.equal(this.$('ul li').length, 0);
  assert.equal(this.$('p').text().trim(), 'No results.');
});

test('the results change when the query changes', function(assert) {
  this.render(hbs`
    {{#searchable-collection query="apples" collection=(array "apples" "bananas" "oranges") as |search|}}
      {{search.field}}

      {{#if search.results}}
        <ul>
          {{#each search.results as |result|}}
            <li>{{result}}</li>
          {{/each}}
        </ul>
      {{/if}}
    {{/searchable-collection}}
  `);

  assert.equal(this.$('ul li').length, 1);
  assert.equal(this.$('ul li:eq(0)').text().trim(), 'apples');

  this.$('input').val('bananas');
  this.$('input').trigger('change');

  assert.equal(this.$('ul li').length, 1);
  assert.equal(this.$('ul li:eq(0)').text().trim(), 'bananas');
});

test('searchableProperties can be an array of synchronous props', function(assert) {
  this.render(hbs`
    {{#searchable-collection
      query="apples"
      collection=(array
        (hash
          name="apples"
          opinion="okay")
        (hash
          name="bananas"
          opinion="gross")
        (hash
          name="oranges"
          opinion="awesome")
      )
      searchableProperties=(array "name" "opinion")
    as |search|}}
      {{search.field}}

      {{#if search.results}}
        <ul>
          {{#each search.results as |result|}}
            <li>{{result.name}} ({{result.opinion}})</li>
          {{/each}}
        </ul>
      {{/if}}
    {{/searchable-collection}}
  `);

  assert.equal(this.$('ul li').length, 1);
  assert.equal(this.$('ul li:eq(0)').text().trim(), 'apples (okay)');

  this.$('input').val('awesome');
  this.$('input').trigger('change');

  assert.equal(this.$('ul li').length, 1);
  assert.equal(this.$('ul li').text().trim(), 'oranges (awesome)');
});

test('it can accept a custom search action', function(assert) {
  assert.expect(4);

  this.on('search', function(query, collection, props) {
    assert.equal(query, 'kirby');
    assert.deepEqual(collection, ['apples', 'bananas', 'oranges']);
    assert.deepEqual(props, []);

    return collection.slice(0, 2);
  });

  this.render(hbs `
    {{#searchable-collection
      search=(action "search")
      query="kirby"
      collection=(array "apples" "bananas" "oranges")
    as |search|}}
      {{search.field}}

      <ul>
        {{#each search.results as |result|}}
        <li>{{result}}</li>
        {{/each}}
      </ul>
    {{/searchable-collection}}
  `);

  assert.equal(this.$('ul li').length, 2);
});
