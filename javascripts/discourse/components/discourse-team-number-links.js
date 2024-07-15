import Component from "@glimmer/component";

export default class CustomHeaderLinks extends Component {
  get link() {
    const siteUserFields = Discourse.Site.currentProp('user_fields');
    if (!Ember.isEmpty(siteUserFields)) {
        const teamNumberField = siteUserFields.filterBy('name', 'FRC Team Number')[0]
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
  }
}