const formulario = document.getElementById('formulario');
const resultado = document.getElementById('resultado');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultado.innerHTML = 'Carregando...';

    const make = document.getElementById('marca').value.trim();
    const model = document.getElementById('modelo').value.trim();
    const year = document.getElementById('ano').value.trim();

    if (!make || !model) {
        resultado.innerHTML = '<p style="color:red;">Informe marca e modelo</p>';
        return;
    }

    let url = `http://localhost:3000/carros?make=${make}&model=${model}`;
    if (year) url += `&year=${year}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
        const data = await response.json();

        if (!data || data.length === 0) {
            resultado.innerHTML = '<p>Nenhum veículo encontrado.</p>';
            return;
        }

        resultado.innerHTML = '';
        data.forEach(veiculo => {
            resultado.innerHTML += `
                <h2>${veiculo.make} ${veiculo.model} ${veiculo.version || ''} (${veiculo.year})</h2>
                <img src="${veiculo.image || ''}" alt="${veiculo.model}" width="300">
                <div><strong>Motor:</strong> ${veiculo.engine || 'N/D'}</div>
                <div><strong>Transmissão:</strong> ${veiculo.transmission || 'N/D'}</div>
                <div><strong>Combustível:</strong> ${veiculo.fuel_type || 'N/D'}</div>
                <div><strong>Potência:</strong> ${veiculo.horsepower || 'N/D'} HP</div>
                <div><strong>Torque:</strong> ${veiculo.torque || 'N/D'}</div>
                <div><strong>Código do motor:</strong> ${veiculo.engine_code || 'N/D'}</div>
                <hr>
            `;
        });

    } catch(error) {
        resultado.innerHTML = `<p style="color:red;">Erro: ${error.message}</p>`;
    }
});
