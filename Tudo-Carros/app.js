// app.js
const formulario = document.getElementById('formulario');
const resultado = document.getElementById('resultado');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultado.innerHTML = 'Carregando...';

    const vin = document.getElementById('vin').value.trim();
    const make = document.getElementById('marca').value.trim();
    const model = document.getElementById('modelo').value.trim();
    const year = document.getElementById('ano').value.trim();

    let url = '';
    if (vin) {
        url = `http://localhost:3000/carros/vin/${vin}`;
    } else if (make && model && year) {
        url = `http://localhost:3000/carros?make=${make}&model=${model}&year=${year}`;
    } else {
        resultado.innerHTML = '<p style="color:red;">Informe VIN ou Marca/Modelo/Ano</p>';
        return;
    }

    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error('Erro na requisição: ' + response.status);
        const data = await response.json();

        if (!data) {
            resultado.innerHTML = '<p>Nenhum veículo encontrado.</p>';
            return;
        }

        resultado.innerHTML = `
            <h2>${data.make || ''} ${data.model || ''} (${data.year || ''})</h2>
            <img src="${data.image || ''}" alt="${data.model}" width="300">
            <div><strong>Motor:</strong> ${data.engine || 'N/D'}</div>
            <div><strong>Transmissão:</strong> ${data.transmission || 'N/D'}</div>
            <div><strong>Combustível:</strong> ${data.fuel_type || 'N/D'}</div>
            <div><strong>Potência:</strong> ${data.horsepower || 'N/D'} HP</div>
            <div><strong>Torque:</strong> ${data.torque || 'N/D'}</div>
            <div><strong>Código do motor:</strong> ${data.engine_code || 'N/D'}</div>
        `;
    } catch(error) {
        resultado.innerHTML = `<p style="color:red;">Erro: ${error.message}</p>`;
    }
});
