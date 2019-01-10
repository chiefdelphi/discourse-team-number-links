# Team Number Links
Adds a clickable team numbers in a user's profile via a Discourse plugin for FRC (TBA), FTC (TOA), and VRC (RE) team numbers.

This functionality is currently added by inserting custom CSS and JavaScript on each theme, as seen below:


## CSS Added

```css
.public-user-field.team-number { display: none; }
h3.user-card-public-field { clear: both; }
.ember-view.tba-link > div.public-user-fields { margin-top:0; margin-bottom:0; }
.tba-icon { height:1.2em; width:1.2em; }
.public-user-fields { margin-bottom:0; }
```

## JS Added

```js
<script type="text/discourse-plugin" version="0.8.7">
    api.registerConnectorClass('user-profile-primary', 'tba-link', {
      setupComponent(args, component) {
        component.set('tbaLink', args.model.get('tbaLink'));
      }
    });

    api.registerConnectorClass('user-card-before-badges', 'tba-link', {
      setupComponent(args, component) {
        component.set('tbaLink', args.user.get('tbaLink'));
      }
    });

    api.modifyClass('model:user', {
      tbaLink: function() {
          const siteUserFields = Discourse.Site.currentProp('user_fields');
          if (!Ember.isEmpty(siteUserFields)) {
            const teamNumberField = siteUserFields.filterBy('name', 'Team Number')[0]
            if (!teamNumberField) {
              return null;
            }
            const userFieldId = teamNumberField.get('id');
            const userFields = this.get('user_fields');
            if (userFields && userFields[userFieldId] && parseInt(userFields[userFieldId])>0) {
              const img = "<img src='/uploads/default/original/3X/1/7/17596652d2f744b32039e37a5270d29acb8366fa.png' class='tba-icon'>";
              const url = "https://www.thebluealliance.com/team/" + parseInt(userFields[userFieldId]);
              const link = "<a href='"+url+"' target='_blank'>"+parseInt(userFields[userFieldId])+"</a>";
              return Ember.Object.create({ link, image: img });
            } else {
              return null;
            }
          }
      }.property('user_fields.@each.value')
    });
</script>

<script type='text/x-handlebars' data-template-name='/connectors/user-profile-primary/tba-link'>
  {{#if tbaLink}}
    <div class="public-user-fields">
      <div class="public-user-field">
        <span class="user-field-name">{{{tbaLink.image}}}</span>
        <span class="user-field-value">{{{tbaLink.link}}}</span>
      </div>
    </div>
  {{/if}}
</script>

<script type='text/x-handlebars' data-template-name='/connectors/user-card-before-badges/tba-link'>
  {{#if tbaLink}}
    <div class="public-user-fields">
      <div class="public-user-field">
        <span class="user-field-name">{{{tbaLink.image}}}</span>
        <span class="user-field-value">{{{tbaLink.link}}}</span>
      </div>
    </div>
  {{/if}}
</script>
```
