import entity.PullRequestForLatestGradleWrapper
import groovy.json.JsonBuilder

assert params.full_name

def pullRequests = PullRequestForLatestGradleWrapper.findAll {
    select all from 'PullRequestForLatestGradleWrapper'
    where fullName == params.full_name
}

response.contentType = 'application/json'
println new JsonBuilder(pullRequests)
