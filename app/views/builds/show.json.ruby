body = @build.get.body
artifacts = @build.artifacts.body
return body.merge({artifacts: artifacts}).to_json
