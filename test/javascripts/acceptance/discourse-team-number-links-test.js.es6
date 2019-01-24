import { acceptance } from "helpers/qunit-helpers";

acceptance("DiscourseTeamNumberLinks", { loggedIn: true });

test("DiscourseTeamNumberLinks works", async assert => {
  await visit("/admin/plugins/discourse-team-number-links");

  assert.ok(false, "it shows the DiscourseTeamNumberLinks button");
});
