# name: DiscourseTeamNumberLinks
# about:
# version: 0.1
# authors: bmartus
# url: https://github.com/bmartus


register_asset "stylesheets/common/discourse-team-number-links.scss"


enabled_site_setting :discourse_team_number_links_enabled

PLUGIN_NAME ||= "DiscourseTeamNumberLinks".freeze

after_initialize do
  
  # see lib/plugin/instance.rb for the methods available in this context
  

  module ::DiscourseTeamNumberLinks
    class Engine < ::Rails::Engine
      engine_name PLUGIN_NAME
      isolate_namespace DiscourseTeamNumberLinks
    end
  end

  

  
  require_dependency "application_controller"
  class DiscourseTeamNumberLinks::ActionsController < ::ApplicationController
    requires_plugin PLUGIN_NAME

    before_action :ensure_logged_in

    def list
      render json: success_json
    end
  end

  DiscourseTeamNumberLinks::Engine.routes.draw do
    get "/list" => "actions#list"
  end

  Discourse::Application.routes.append do
    mount ::DiscourseTeamNumberLinks::Engine, at: "/discourse-team-number-links"
  end
  
end
