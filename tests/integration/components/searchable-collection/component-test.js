import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('searchable-collection', 'Integration | Component | searchable collection', {
  integration: true
});

test('it renders a default state', function(assert) {
  this.set('collection', Ember.A(['apples', 'bananas', 'oranges']));

  this.render(hbs`
    {{#searchable-collection collection as |search|}}
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
  this.set('collection', Ember.A(['apples', 'bananas', 'oranges']));

  this.render(hbs`
    {{#searchable-collection collection query="kirby" as |search|}}
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
  this.set('collection', Ember.A(['apples', 'bananas', 'oranges']));

  this.render(hbs`
    {{#searchable-collection collection query="Apples" as |search|}}
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
  this.set('collection', Ember.A(['apples', 'bananas', 'oranges']));

  this.render(hbs`
    {{#searchable-collection collection query="GES" as |search|}}
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
  this.set('collection', Ember.A(['apples', 'bananas', 'oranges']));

  this.render(hbs`
    {{#searchable-collection collection query="GES" matchCase=true as |search|}}
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
  this.set('collection', Ember.A(['apples', 'bananas', 'oranges']));

  this.render(hbs`
    {{#searchable-collection collection query="apples" as |search|}}
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
  this.set('collection', Ember.A([
    {
      name: "apples",
      opinion: "okay"
    },
    {
      name: "bananas",
      opinion: "gross"
    },
    {
      name: "oranges",
      opinion: "awesome"
    }
  ]));

  this.set('searchableProperties', Ember.A(['name', 'opinion']));

  this.render(hbs`
    {{#searchable-collection collection query="apples" searchableProperties=searchableProperties as |search|}}
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
