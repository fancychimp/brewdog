let beerData = [];
const beerApiEndpoint = 'https://api.punkapi.com/v2/beers';

const beerList = document.getElementById("beers");
const beerListButton = document.getElementById("beerList");
const clearListButton = document.getElementById("clearList");


function createNode(element) {
  return document.createElement(element);
}


function append(parent, el) {
  return parent.appendChild(el);
}


function creatBeerList(data, targetUl) {
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
    span.innerHTML = `${beer.tagline} ${beer.description}`;
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
    return Promise.resolve(beerData);
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


function clearBeers() {
  beerList.innerHTML = "";
}


beerListButton.addEventListener('click', () => {
  const beerPromise = getBeers();

  beerPromise.then((data) => { 
    creatBeerList(data, beerList);
  });
});


clearListButton.addEventListener('click', clearBeers);