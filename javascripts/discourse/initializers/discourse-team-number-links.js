import { apiInitializer } from "discourse/lib/api";
import TeamNumberLinks from "../components/discourse-team-number-links";

export default apiInitializer("1.14.0", (api) => {
  api.renderInOutlet("user-profile-primary", TeamNumberLinks);
  api.renderInOutlet("user-card-before-badges", TeamNumberLinks);
});
