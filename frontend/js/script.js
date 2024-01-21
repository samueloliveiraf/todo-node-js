document.getElementById('getAllClientsButton').addEventListener('click', function() {
    fetch('http://localhost:3332/clients')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar todos os clientes: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('allClientsResult').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('allClientsResult').textContent = error.message;
        });
});


document.getElementById('createClientForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const fone = document.getElementById('fone').value;
    const coord_x = parseFloat(document.getElementById('coord_x').value);
    const coord_y = parseFloat(document.getElementById('coord_y').value);

    fetch('http://localhost:3332/client-create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, fone, coord_x, coord_y })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao criar cliente: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('createClientResult').textContent = 'Cliente criado com sucesso: ' + JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('createClientResult').textContent = error.message;
        });
});


document.getElementById('getOptimizedRouteButton').addEventListener('click', function() {
    fetch('http://localhost:3332/clients-optimeze')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na otimização da rota: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('optimizedRouteResult').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('optimizedRouteResult').textContent = error.message;
        });
});


document.getElementById('findClientForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('searchEmail').value;
    const fone = document.getElementById('searchFone').value;
    const name = document.getElementById('searchName').value;

    fetch('http://localhost:3332/client-find', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, fone, name })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar cliente: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('findClientResult').textContent = 'Cliente encontrado: ' + JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('findClientResult').textContent = error.message;
        });
});