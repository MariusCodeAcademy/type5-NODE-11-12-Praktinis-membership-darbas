// get elemtns
const URL = 'http://localhost:3000/users';
const membCardsContainer = document.querySelector('.cards-container');
const newMembership = document.querySelector('.new-membership');
const btnAdd = document.querySelector('.btn-add');
const btnSort = document.querySelector('.btn-sort');
const sortOrder = document.querySelector('.btn-sort span');
const membershipSelectEl = document.getElementById('membership-select');
let buttonText = 'Add Users';
btnAdd.textContent = buttonText;

btnAdd.onclick = toggleFormAndCards;
btnSort.onclick = toggleSortCards;

function toggleSortCards() {
  const sort = sortOrder.textContent.toLowerCase();
  console.log('sortOrder ===', sort);
  getUsers(`${URL}/${sort}`);
  if (sort === 'desc') sortOrder.textContent = 'ASC';
  else sortOrder.textContent = 'DESC';
}

function toggleFormAndCards() {
  buttonText = !newMembership.classList.contains('hide')
    ? 'Add Users'
    : 'Show Users';
  btnAdd.textContent = buttonText;
  // console.log('showFormFlag ===', showFormFlag);
  newMembership.classList.toggle('hide');
  membCardsContainer.classList.toggle('hide');
}

async function getSelectOptions() {
  const resp = await fetch('http://localhost:3000/memberships');
  const fetchData = await resp.json();
  console.log('fetchData ===', fetchData);
  fetchData.data.forEach(({ _id, name }) => {
    const optionEl = document.createElement('option');
    optionEl.value = _id;
    optionEl.textContent = name;
    // console.log(optionEl);
    membershipSelectEl.append(optionEl);
  });
}

getSelectOptions();

function makeCards(data, dest) {
  // eslint-disable-next-line no-param-reassign
  dest.innerHTML = data
    // eslint-disable-next-line arrow-body-style
    .map((card) => {
      return `
      <article class="card">
        <h3>${card.name} ${card.surname}</h3>
        <p>Email: ${card.email}</p>
        <p>Membership: ${card.membership}</p>
      </article>
    `;
    })
    .join('');
}

async function getUsers(address = URL) {
  const resp = await fetch(address);
  const fetchData = await resp.json();
  console.log('fetchData ===', fetchData);
  makeCards(fetchData.data, membCardsContainer);
}

getUsers();

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
    getUsers();
    toggleFormAndCards();
  }
});
