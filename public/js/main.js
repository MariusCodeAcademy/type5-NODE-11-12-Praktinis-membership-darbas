// get elemtns
const membCardsContainer = document.querySelector('.cards-container');
const newMembership = document.querySelector('.new-membership');
const btnAdd = document.querySelector('.btn-add');
let buttonText = 'Add Membership';
btnAdd.textContent = buttonText;

btnAdd.onclick = toggleFormAndCards;

function toggleFormAndCards() {
  buttonText = !newMembership.classList.contains('hide')
    ? 'Add Users'
    : 'Show Users';
  btnAdd.textContent = buttonText;
  // console.log('showFormFlag ===', showFormFlag);
  newMembership.classList.toggle('hide');
  membCardsContainer.classList.toggle('hide');
}

const URL = 'http://localhost:3000/memberships';

function makeCards(data, dest) {
  // eslint-disable-next-line no-param-reassign
  dest.innerHTML = data
    // eslint-disable-next-line arrow-body-style
    .map((card) => {
      return `
      <article class="card members">
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

membCardsContainer.addEventListener('click', async (event) => {
  // console.log(event.target.className);
  if (event.target.classList.contains('btn-delete')) {
    const membershipID = event.target.dataset.id;
    console.log('membershipID ===', membershipID);
    await fetch(`${URL}/${membershipID}`, {
      method: 'DELETE',
    });
    getMemberships();
  }
});

getMemberships();

document.forms[0].addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const newMembershipDataJson = JSON.stringify(Object.fromEntries(fd));
  const resp = await fetch(URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: newMembershipDataJson,
  });
  const result = await resp.json();
  if (result.success) {
    getMemberships();
    toggleFormAndCards();
  }
});
