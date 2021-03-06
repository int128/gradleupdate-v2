import domain.GradleUpdate

assert params.full_name

final renderBadge = { String message, String fill ->
    final left = 47
    // unknown (7) -> 62
    // x.x.x   (5) -> 42
    // x.x     (3) -> 30
    final c = message.size()
    final right = c.power(2) / 4 + c * 5 + 12
    final width = left + right
    final rightCentral = width - right / 2 - 1

    response.contentType = 'image/svg+xml'
    response.addHeader('Cache-Control', 'no-cache')
    response.addHeader('Expires', '-1')

    html.svg(xmlns: 'http://www.w3.org/2000/svg', width: width, height: 20) {
        linearGradient(id: 'a', x2: 0, y2: '100%') {
            stop(offset: 0, 'stop-color': '#bbb', 'stop-opacity': 0.1)
            stop(offset: 1, 'stop-opacity': 0.1)
        }
        rect(rx: 3, width: width, height: 20, fill: '#555')
        rect(rx: 3, x: left, width: right, height: 20, fill: fill)
        path(fill: fill, d: "M${left} 0h4v20h-4z")
        rect(rx: 3, width: width, height: 20, fill: 'url(#a)')
        g(fill: '#fff', 'text-anchor': 'middle', 'font-family': 'DejaVu Sans,Verdana,Geneva,sans-serif', 'font-size': '11') {
            text(x: 23.5, y: 15, fill: '#010101', 'fill-opacity': 0.3, 'Gradle')
            text(x: 23.5, y: 14, 'Gradle')
            text(x: rightCentral, y: 15, fill: '#010101', 'fill-opacity': 0.3, message)
            text(x: rightCentral, y: 14, message)
        }
    }
}

final gradleUpdate = new GradleUpdate()
final status = gradleUpdate.getGradleWrapperStatusOrNull(params.full_name, params.branch)
if (status) {
    if (status.checkUpToDate()) {
        renderBadge(status.currentVersion.string, '#4c1')
    } else {
        renderBadge(status.currentVersion.string, '#e05d44')
    }
} else {
    renderBadge('unknown', '#9f9f9f')
}
