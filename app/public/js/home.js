post('/app/mycode', {})
  .then((files) => {
    files.unshift('drive')
    let lines = []
    for (let path of files) {
      lines.push(`<a href='/${path}'>/${path}</a>`)
    }
    $('#text').html(lines.join('<br/>'))
  })