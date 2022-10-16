const id = (id) => document.getElementById(id);
// const tags = tag => document.getElementsByTagName(tag);

let state = {
  url: '',
  method: 'GET',
  headers: { mode: 'no-cors' },
  parameters: {},
};

[
  { name: 'url', type: 'text' },
  { name: 'method', type: 'text' },
].forEach(({ name, type }) =>
  id(name).addEventListener('change', (e) => {
    state[name] = e.target.value;
  })
);

// Bug Fixing

// id('add-header').addEventListener('click', (e) => {
//   e.preventDefault();
//   state.headers[id('header-name').value] = id('header-value').value;
//   id('header-name').value = '';
//   id('header-value').value = '';
//   console.log(state);
// });

// id('add-parameter').addEventListener('click', (e) => {
//   e.preventDefault();
//   state.parameters[id('parameter-name').value] = id('parameter-value').value;
//   id('parameter-name').value = '';
//   id('parameter-value').value = '';
//   console.log(state);
// });

id('request-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch(state.url, {
    method: state.method,
    headers: state.headers,
  });
  const status = res.status;
  const text = await res.text();

  const response = (id('response').innerHTML = `Code: ${status}<br />${text}`);
});

// https://reqres.in/api/users

// -----------------------------------------------

// Adding Multiple Headers and Multiple Parameters

document
  .getElementById('add-parameter')
  .addEventListener('click', function (e) {
    e.preventDefault();
    let arr = [...document.getElementById('parameters').querySelectorAll('tr')];
    let el = document.getElementById('parameters').querySelector('tr');
    let param = `
        <tr id=${arr.length + 1}>
        <td><input type="text" id="parameter-name" /></td>
        <td><input type="text" id="parameter-value" />&nbsp;<span
        class="cancel"
        >✖</span
      ></td>
        </tr>`;
    document
      .getElementById('parameters')
      .insertAdjacentHTML('beforeend', param);
  });

document.getElementById('add-header').addEventListener('click', function () {
  let arr = [...document.getElementById('headers').querySelectorAll('tr')];
  let header = `
    <tr id=${arr.length + 1} >
        <td><input type="text" id="header-name" /></td>
        <td><input type="text" id="header-value" />&nbsp;<span
        class="cancel"
        >✖</span
      ></td>
    </tr>
    `;

  document.getElementById('headers').insertAdjacentHTML('beforeend', header);
});

// -----------------------------------------------------------

// Added deleting parameter and deleting header feature

let remove = function (e, str) {
  if (!e.target.classList.contains('cancel')) return;

  let id = +e.target.closest('tr').id;
  let names = [
    ...document.getElementById(`${str}s`).querySelectorAll(`#${str}-name`),
  ].map((mov) => mov.value);

  let values = [
    ...document.getElementById(`${str}s`).querySelectorAll(`#${str}-value`),
  ].map((mov) => mov.value);

  names = names.filter((_, i) => i + 1 !== id);
  values = values.filter((_, i) => i + 1 !== id);

  let arr = [
    ...document.getElementById(`${str}s`).querySelectorAll('tr'),
  ].filter((mov) => Number(mov.id) != id);

  arr = arr.map((mov, i) => {
    mov.id = i + 1 + '';

    mov.querySelector(`#${str}-value`).value = values[i];
    mov.querySelector(`#${str}-name`).value = names[i];
    return mov;
  });

  document.getElementById(`${str}s`).innerHTML = '';

  arr.forEach((mov) => {
    document.getElementById(`${str}s`).insertAdjacentElement('beforeend', mov);
  });
};

document.getElementById('parameters').addEventListener('click', function (e) {
  remove(e, 'parameter');
});

document.getElementById('headers').addEventListener('click', function (e) {
  remove(e, 'header');
});
