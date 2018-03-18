class BuildsController < ApplicationController
  # GET /builds.json
  def index
    @project = CircleCi::Project.new "naichilab", "unityroom"
    @builds = @project.recent_builds.body

    render json: @builds
  end

  # GET /builds/1.json
  def show
    @build = CircleCi::Build.new 'naichilab', 'unityroom', "github", params[:id].to_i
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_build
      @build = Build.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def build_params
      params.fetch(:build, {})
    end
end
