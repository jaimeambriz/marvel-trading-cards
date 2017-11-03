function MarvelController() {
  var marvelService = new MarvelService()


  marvelService.getCharacters(ready)

  function ready(data) {

    updateMarvel(data)

  }


  function updateMarvel(list) {
    var elem = document.getElementById('marvel-characters')
    elem.innerHTML = ''
    var marvelTemplate = ''
    for (var i in list) {
      var character = list[i];
      character.thumbnail.path = character.thumbnail.path.replace('http:', '')
      marvelTemplate += `
      <div class="col-sm-2 card">
      <img src="${character.thumbnail.path}.${character.thumbnail.extension}" width="100">
      <h3>${character.name}</h3>
      <div>
      <button class="btn-success" id="${character.id}" onclick="app.controllers.marvelController.add('${character.id}')">Add to Team</button>
      </div>
      </div>
      `
      elem.innerHTML = marvelTemplate
    }

  }

  // this.add = function add(id) {
  //   marvelService.addToMyCharacters(id) 
  //   updateMyCharacters(marvelService.getMyCharacters())
  // }

  this.add = function add(id) {
    marvelService.addToMyCharacters(id)
    updateMarvel(marvelService.getMarvelCharacters())
    updateMyCharacters(marvelService.getMyCharacters())
  }

  this.remove = function remove(id) {
    marvelService.removeMyCharacter(id, updateMyCharacters)
    updateMarvel(marvelService.getMarvelCharacters())
  }
  // this.add = function add(id) {
  //   marvelService.addToMyCharacters(id) 
  //   var characters = marvelService.getMyCharacters()
  //   updateMyCharacters(characters)
  // }

  function updateMyCharacters(list) {
    var elem = document.getElementById('my-characters')
    elem.innerHTML = ''
    var marvelTemplate = ''
    for (var i in list) {
      var character = list[i];
      character.thumbnail.path = character.thumbnail.path.replace('http:', '')
      marvelTemplate += `
    <div class="col-sm-2 card">
      <img src="${character.thumbnail.path}.${character.thumbnail.extension}" width="100">
      <h3>${character.name}</h3>
      <div>
        <button class="btn-success" id="${character.id}" onclick="app.controllers.marvelController.remove('${character.id}')">Remove form Team</button>
      </div>
    </div>
    `
      elem.innerHTML = marvelTemplate
    }

  }

}

