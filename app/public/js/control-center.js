const menu = [
  {
    name: 'Drive Station',
    route: '/drive' 
  },

  {
    name: 'Example',
    route: '/mycode/example' 
  },
]

stages = [
  {
    text: "Choose a menu:",
    type: true,
    input: true,
    action: function(input) {
      window.location.href = 'input'
    }
  }
]

presentStage()