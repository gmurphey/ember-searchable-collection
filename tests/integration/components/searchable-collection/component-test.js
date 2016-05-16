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

  assert.equal(this.$('input').val(), 'apples');
  assert.equal(this.$('ul li').length, 1);
  assert.equal(this.$('ul li:eq(0)').text().trim(), 'apples');
});

test('the results can match partial queries', function(assert) {
  this.render(hbs`
    {{#searchable-collection query="ges" collection=(array "apples" "bananas" "oranges") as |search|}}
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
