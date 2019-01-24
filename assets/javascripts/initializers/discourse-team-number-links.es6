import { withPluginApi } from "discourse/lib/plugin-api";

function initializeDiscourseTeamNumberLinks(api) {

  api.registerConnectorClass('user-card-post-names', 'team-links', {
    setupComponent(args, component) {
      component.set('teamLinks', args.model.get('teamLinks'));
    }
  });
  
  api.registerConnectorClass('user-profile-primary', 'team-links', {
    setupComponent(args, component) {
      component.set('teamLinks', args.model.get('teamLinks'));
    }
  });

  api.registerConnectorClass('user-card-before-badges', 'team-links', {
    setupComponent(args, component) {
      component.set('teamLinks', args.user.get('teamLinks'));
    }
  });

  api.modifyClass('model:user', {
    teamLinks: function() {
      const siteUserFields = Discourse.Site.currentProp('user_fields');
      if (!Ember.isEmpty(siteUserFields)) {

        const frcTeamNumberField = siteUserFields.filterBy('name', 'FRC Team Number')[0]
        const ftcTeamNumberField = siteUserFields.filterBy('name', 'FTC Team Number')[0]
        const vrcTeamNumberField = siteUserFields.filterBy('name', 'VRC Team Number')[0]

        if (!frcTeamNumberField && !ftcTeamNumberField && !vrcTeamNumberField) {
          return null;
        }

        const frcUserFieldId = frcTeamNumberField.get('id');
        const ftcUserFieldId = ftcTeamNumberField.get('id');
        const vrcUserFieldId = vrcTeamNumberField.get('id');

        const userFields = this.get('user_fields');

        if (userFields && userFields[frcUserFieldId] && parseInt(userFields[frcUserFieldId])>0) {
          const frcImage = "<img src='https://www.chiefdelphi.com/uploads/default/original/3X/1/7/17596652d2f744b32039e37a5270d29acb8366fa.png' class='tba-icon'>";
          const frcUrl = "https://www.thebluealliance.com/team/" + parseInt(userFields[frcUserFieldId]);
          const frcLink = "<a href='"+frcUrl+"' target='_blank'>"+parseInt(userFields[frcUserFieldId])+"</a>";
        } else {
          const frcLink = null;
          const frcImage = null;
        }

        if (userFields && userFields[ftcUserFieldId] && parseInt(userFields[ftcUserFieldId])>0) {
          const ftcImage = "<img src='https://www.chiefdelphi.com/uploads/default/original/3X/2/8/28620db110b9efbec70fe6c7ce801488e2ef60a6.png' class='toa-icon'>";
          const ftcUrl = "http://theorangealliance.org/teams/" + parseInt(userFields[ftcUserFieldId]);
          const ftcLink = "<a href='"+ftcUrl+"' target='_blank'>"+parseInt(userFields[ftcUserFieldId])+"</a>";
        } else {
          const ftcLink = null;
          const ftcImage = null;
        } 

        if (userFields && userFields[vrcUserFieldId] && parseInt(userFields[vrcUserFieldId])>0) {
          const vrcImage = "<img src='https://www.chiefdelphi.com/uploads/default/original/3X/2/8/28620db110b9efbec70fe6c7ce801488e2ef60a6.png' class='vrc-icon'>";
          const vrcUrl = "https://www.thebluealliance.com/team/" + parseInt(userFields[vrcUserFieldId]);
          const vrcLink = "<a href='"+vrcUrl+"' target='_blank'>"+parseInt(userFields[vrcUserFieldId])+"</a>";
        }  else {
          const vrcLink = null;
          const vrcImage = null;
        }

        return Ember.Object.create({ 
          frcLink, frcImage, 
          ftcLink, ftcImage, 
          vrcLink, vrcImage 
        });

      }
    }.property('user_fields.@each.value')
  });
  
}

export default {
  name: "discourse-team-number-links",

  initialize() {
    withPluginApi("0.8.24", initializeDiscourseTeamNumberLinks);
  }
};
