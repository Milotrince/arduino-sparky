let index = 0
let stages = []

function setDataText(newData={}) {
  Object.assign(data, newData)
  let s = ''
  for (let [key, value] of Object.entries(data)) {
    s += `<span><br/>${key}: ${value}</span>`
  }
  $('#data').html(s)
}

async function type(text) {
  typed = ''
  for (let c of text) {
    if (c === '\n') {
      typed += '</br>'
    } else {
      typed += c
    }
    setText(typed)
    await sleep(40)
  }
}

function setText(text) {
  $('#text').html(text)
}

function getInput(callback) {
  $p = $('<p>> </p>').appendTo('#text')
  let $input = $('<input/>').attr({
    type: 'text',
    id: 'input',
    name: 'input',
    autocorrect: 'off',
    autocapitalize: 'off',
    autocomplete: 'off'
  })
  $input.appendTo($p)
  $input.focus()
  $(document).click(function() { $("#input").focus() });
  $input.on('keyup', function (e) {
    if (e.keyCode === 13) {
      callback($input.val())
    }
  })
}

async function presentStage() {
  if (stages.length > index) {
    let s = stages[index]

    if (s.type) {
      await type(s.text)
    } else {
      setText(s.text)
    }

    if (s.input) {
      getInput(s.action)
    } else {
      s.action()
    }
  } else {
    console.error(`Tried to present stage that doesn't exist (index:${index})`)
  }
}

function nextStage() {
  index += 1
  presentStage()
}