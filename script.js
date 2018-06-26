let beerData = [];
let highABVData = [];
const beerApiEndpoint = 'https://api.punkapi.com/v2/beers';
const highABVBeerApiEndpoint = lowestABV => `https://api.punkapi.com/v2/beers?abv_gt=${lowestABV}`;

const beerList = document.getElementById("beers");
const beerListButton = document.getElementById("beerList");
const clearListButton = document.getElementById("clearList");
const highABVButton = document.getElementById("highABV");
const clearHighABVButton = document.getElementById("clearHighABV");

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function createBeerList(data, targetUl, listType) {
  let beers = data;
  return beers.map(beer => {
    let li = createNode('li'),
    img = createNode('img'),
    hr = createNode('hr'),
    div = createNode('div'),
    span = createNode('span');
    hr.style.clear = 'both';
    img.src = beer.image_url;
    img.style.width = '60px';
    img.style.float = 'left';
    div.innerHTML = beer.name;
    if (listType == 'full') {
      span.innerHTML = `${beer.name} ${beer.tagline} ${beer.description}`;
    } else if (listType == 'highABV') {
      span.innerHTML = `${beer.name} ${beer.abv}`;
    }
    append(li, img);
    append(li, div);
    append(li, span);
    append(li, hr);
    append(targetUl, li);
  })
}

function getBeers() {
  if (beerData.length) {
    console.log('already have the data, just returning it')
    let promise = Promise.resolve(beerData)
    return promise;
  } else {
    console.log('gotta blast')
    return fetch(beerApiEndpoint)
      .then(function(resp) {
        return resp.json()
      })
      .then((data) => {
        beerData = data;
        return beerData;
      })
      .catch(error => {
        console.log((error));
      });
  }
}

function getHighABVBeers(lowestABV) {
  if (highABVData.length) {
    console.log('already have the high ABV beers, just returning it')
    let promise = Promise.resolve(highABVData)
    return promise;
  } else {
    console.log('gotta blast')
    return fetch(highABVBeerApiEndpoint(lowestABV))
      .then(function(resp) {
        return resp.json()
      })
      .then((data) => {
        highABVData = data;
        return highABVData;
      })
      .catch(error => {
        console.log((error));
      });
  }
}

function clearBeers() {
  beerList.innerHTML = "";
}

beerListButton.addEventListener('click', () => {
  const beerPromise = getBeers();

  beerPromise.then((data) => { 
    createBeerList(data, beerList, 'full');
  });
});

clearListButton.addEventListener('click', clearBeers);

highABVButton.addEventListener('click', () => {
  const beerPromise = getHighABVBeers(7);

  beerPromise.then((data) => {
    createBeerList(data, beerList, 'highABV');
  });
});

clearHighABVButton.addEventListener('click', clearBeers);
