// get elemtns
const membCardsContainer = document.querySelector('.cards-container');

const URL = 'http://localhost:3000/memberships';

function makeCards(data, dest) {
  // eslint-disable-next-line no-param-reassign
  dest.innerHTML = data
    // eslint-disable-next-line arrow-body-style
    .map((card) => {
      return `
      <article class="card">
        <h3>$${card.price.toFixed(2)} ${card.name}</h3>
        <p>${card.description}</p>
        <div class="hr"></div>
        <button class="btn btn-delete" data-id="${card._id}">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      </article>
    `;
    })
    .join('');
}

async function getMemberships() {
  const resp = await fetch(URL);
  const fetchData = await resp.json();
  console.log('fetchData ===', fetchData);
  makeCards(fetchData.data, membCardsContainer);
}

getMemberships();
