post '/api/exchange-oauth-token', forward: '/api/exchange-oauth-token.groovy'

get  '/api/latestGradle', forward: '/api/get-latest-gradle.groovy'
get  '/api/pullRequests/@owner/@repo', forward: '/api/find-pull-requests-by-full-name.groovy?full_name=@owner/@repo'
post '/api/@owner/@repo/update', forward: '/api/create-pull-request-for-update-gradle.groovy?full_name=@owner/@repo'

get '/@owner/@repo/status.svg', forward: '/render/repository-badge-get.groovy?full_name=@owner/@repo'
