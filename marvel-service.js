function MarvelService() {
  var key = 'apikey=5f820ca1703816f14d360d770f6435e8';
  var baseUrl = 'http://gateway.marvel.com/v1/public/'

  var marvelCharacters = [];
  var myCharacters = [];

  this.getMarvelCharacters = function () {
    return JSON.parse(JSON.stringify(marvelCharacters))
  }

  this.getMyCharacters = function () {
    return JSON.parse(JSON.stringify(myCharacters))
  }

  this.addToMyCharacters = function (id) {
    for (var i = 0; i < marvelCharacters.length; i++) {
      var character = marvelCharacters[i];
      if (id == character.id) {
        myCharacters.push(character)
        marvelCharacters.splice(i, 1)
      }
    }
    // callWhenDone(myCharacters)
  }

  this.removeMyCharacter = function (id, callWhenDone) {
    for (var i = 0; i < myCharacters.length; i++) {
      var character = myCharacters[i];
      if (id == character.id) {
        marvelCharacters.push(character)
        myCharacters.splice(i, 1)
      }
    }
    callWhenDone(myCharacters)
  }

  this.getCharacters = function (callWhenDone) {
    //Use &offset=Number to add pagination
    $.get(baseUrl + 'characters?' + "limit=10&offset=1450&" + key, function (response) {
      marvelCharacters = response.data.results;
      callWhenDone(marvelCharacters)
    })
  }
}
