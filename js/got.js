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
    showSpaceshipList(userDatas);
}

getData('json/characters.json', successAjax);

function searchShip() {
    var inputValue = document.querySelector('#search-text').value;
    var list = document.querySelectorAll('.spaceship-list .spaceship-item');
    for (var i = 0; i < list.length; i++) {
        if (list[i].spaceship.name.toLowerCase().indexOf(inputValue.toLowerCase()) < 0) {
            list[i].style.display = 'none';
        } else {
            list[i].style.display = 'block';
        }
    }
}


document.querySelector('#search-button').onclick = searchShip;

/**
 *
 * @param {Array} listSource array of spaceships
 */

function showSpaceshipList(listSource) {
    var container = document.querySelector('.spaceship-list');
    var listDiv = createListDiv(container);
    for (let i = 0; i < listSource.length; i++) {
        createSpaceShip(listDiv, listSource[i]);
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



