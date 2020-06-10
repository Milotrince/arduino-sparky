function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}


function post(route, data={}) {
  return fetch(route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(data)
  })
  .then((response) => {
    if (response.ok) {
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json()
      } else {
        return response
      }
    } else {
      throw new Error('server responded with not ok')
    }
  })
}

if (typeof module != 'undefined') {
  module.exports = {
    sleep, post
  }
}