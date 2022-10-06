const id = id => document.getElementById(id);
// const tags = tag => document.getElementsByTagName(tag);

let state = {
    url: '',
    method: 'GET',
    headers: { mode: 'no-cors' },
    parameters: {}
};

[
    { name: 'url', type: 'text' },
    { name: 'method', type: 'text' }
].forEach(({ name, type }) =>
    id(name).addEventListener('change', e => {
        state[name] = e.target.value;
    })
);

id('add-header').addEventListener('click', e => {
    e.preventDefault();
    state.headers[id('header-name').value] = id('header-value').value;
    id('header-name').value = '';
    id('header-value').value = '';
    console.log(state);
});

id('add-parameter').addEventListener('click', e => {
    e.preventDefault();
    state.parameters[id('parameter-name').value] = id('parameter-value').value;
    id('parameter-name').value = '';
    id('parameter-value').value = '';
    console.log(state);
});

id('request-form').addEventListener('submit', async e => {
    e.preventDefault();
    const res = await fetch(state.url, {
        method: state.method,
        headers: state.headers
    });
    const status = res.status;
    const text = await res.text();

    const response = (id(
        'response'
    ).innerHTML = `Code: ${status}<br />${text}`);
});

// https://reqres.in/api/users
