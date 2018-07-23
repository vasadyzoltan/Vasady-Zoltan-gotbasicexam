function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
    var userDatas = JSON.parse(xhttp.responseText)[2].data;
    caracterList(userDatas);
}

getData('json/characters.json', successAjax);

function searchToCaracter() {
    var inputValue = document.querySelector('#search-text').value;
    var list = document.querySelectorAll('.character-list .character-item');
    for (var i = 0; i < list.length; i++) {
        if (list[i].spaceship.name.toLowerCase().indexOf(inputValue.toLowerCase()) < 0) {
            list[i].style.display = 'none';
        } else {
            list[i].style.display = 'block';
        }
    }
}

document.querySelector('#search-button').onclick = searchToCaracter;

function caracterList(listSource) {
    var container = document.querySelector('.character-list');
    var listDiv = createListDiv(container);
    for (let i = 0; i < listSource.length; i++) {
        makingcharacters(listDiv, listSource[i]);
    }
}
// Ha igaz az, hogy nem létezik a listDiv akkor létrehozzuk
function createListDiv(container) {
    var listDiv = container.querySelector('.list-div');
    if (!listDiv) {
        listDiv = document.createElement('div');
        listDiv.className = 'list-div';
        container.appendChild(listDiv);
    }
    return listDiv;
}

// A keresés után a főoldalon megjelenő szereplő-adatok
function makingcharacters(list, spaceship) {
    var itemDiv = document.createElement('div');
    itemDiv.className = 'character-item';
    itemDiv.spaceship = spaceship; // Itt íródnak ki a szereplők adatai!
    itemDiv.onclick = function () { // klikkelés után. 
        createOneCharacter(this.spaceship);
    }

    // Itt írja ki az összes szereplő adat divekben
    var span = document.createElement('span');
    span.innerHTML = spaceship.name;

    var img = document.createElement('img');
    img.src = spaceship.portrait;
    img.alt = spaceship.name;
    img.onerror = function (ev) {
        ev.target.src = 'assets/arya.png';
    }

    itemDiv.appendChild(span);
    itemDiv.appendChild(img);
    list.appendChild(itemDiv);
}

function createOneCharacter(spaceship) {
    var container = document.querySelector('.one-character');
    var listDiv = createListDiv(container);
    listDiv.innerHTML = '';

    var img = document.createElement('img');
    img.src = spaceship.picture;
    img.onerror = function (ev) {
        ev.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png';
    }

    var title = document.createElement('h3');
    title.innerHTML = spaceship.name + '<br>' + '<br>' + spaceship.bio;

    var cim = document.createElement('img');
    cim.src = 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Logo_Game_of_Thrones.png';
    cim.classList.add('got');

    listDiv.appendChild(cim);
    listDiv.appendChild(img);
    listDiv.appendChild(title);

    document.getElementById('search-text').value = 'Search a caracter';
}
