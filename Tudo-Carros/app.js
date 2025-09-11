const formulario = document.getElementById('formulario');
const resultado = document.getElementById('resultado');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultado.innerHTML = 'Carregando...';

    const make = document.getElementById('marca').value.trim();
    const model = document.getElementById('modelo').value.trim();
    const year = document.getElementById('ano').value.trim();
    const version = document.getElementById('version').value.trim();

    if (!make || !model) {
        resultado.innerHTML = '<p style="color:red;">Informe marca e modelo</p>';
        return;
    }
//c
    let url = `https://tudo-carros.onrender.com/carros?make=${make}&model=${model}`;
    if (year) url += `&year=${year}`;
    if (version) url += `&version=${version}`;

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

            

            <section class="imgs" id="header">



                <div class="img_content">
                    <img src="${veiculo.image1 || ''}" alt="${veiculo.model}" width="300">
                    <img src="${veiculo.image2 || ''}" alt="${veiculo.model}" width="300">
                    <img src="${veiculo.image3 || ''}" alt="${veiculo.model}" width="300">
                    <img src="${veiculo.image4 || ''}" alt="${veiculo.model}" width="300">
                </div>
                
                <h2 >${veiculo.make} ${veiculo.model} ${veiculo.version || ''} (${veiculo.year})</h2>

            </section>


            <section id="content">

             <div class="cont" id="geral">
                <p class="title">GERAL</p>


                
                <div><strong>Motor:</strong> ${veiculo.engine || 'N/D'}</div>
                <div><strong>Versão:</strong> ${veiculo.version || 'N/D'}</div>
                <div><strong>Ano de fabricação:</strong> ${veiculo.year || 'N/D'}</div>
                <div><strong>Preço:</strong> ${veiculo.price || 'N/D'}</div>
                <div><strong>Seguro:</strong> ${veiculo.insurance || 'N/D'}</div>
                <div><strong>Valor médio de manutenção:</strong> ${veiculo.maintenance || 'N/D'}</div>
                <div><strong>Carroceria:</strong> ${veiculo.body_work || 'N/D'}</div>
                <div><strong>Imposto anual:</strong> ${veiculo.impost || 'N/D'}</div>
                <div><strong>Procedencia:</strong> ${veiculo.origin || 'N/D'}</div>


            </div>

                


            <div class="cont" id="engine">

               <div><strong>Motor:</strong> ${veiculo.engine || 'N/D'}</div>
                <div><strong>Combustivel:</strong> ${veiculo.fuel_type || 'N/D'}</div>
                <div><strong>Potência:</strong> ${veiculo.horsepower || 'N/D'} HP</div>
                <div><strong>Torque:</strong> ${veiculo.torque || 'N/D'}</div>
                <div><strong>Código do motor:</strong> ${veiculo.engine_code || 'N/D'}</div>
                <div><strong>Instalação:</strong> ${veiculo.engine_install || 'N/D'}</div>
              
                <div><strong>Alimentação:</strong> ${veiculo.engine_aspiration || 'N/D'}</div>
              
                <div><strong>Quantidade de cilindros:</strong> ${veiculo.cilinder || 'N/D'}</div>
              
                

            </div>


            <div class="cont" id="transmission">

            <p class="title">Trasmissão<p>


            <div><strong>Quantidade de marchas:</strong> ${veiculo.transmission || 'N/D'}</div>
            <div><strong>Tração:</strong> ${veiculo.traction || 'N/D'}</div>
            <div><strong>Tipo de trasmissão:</strong> ${veiculo.trasmission_type || 'N/D'}</div>
            
            
            
            
            </div>

            </div>



            <div class="cont" id="suspencion">

            <p class="title"> Suspensão <p>
                <div><strong>Suspenção dianteira:</strong> ${veiculo.front_susp || 'N/D'}</div>
                <div><strong>Suspenção traseira:</strong> ${veiculo.back_susp || 'N/D'}</div>

            </div>



            <div class="cont" id="breck">
            <p class="title">Freios<p>
                <div><strong>Freios dianteiros:</strong> ${veiculo.front_breck || 'N/D'}</div>
                <div><strong>Freios Traseiros:</strong> ${veiculo.back_breck || 'N/D'}</div>


            </div>



            <div class="cont" id="tires">
            <p class="title">Pneus<p>
                <div><strong>Pneus dianteiros</strong> ${veiculo.front_tires || 'N/D'}</div>
                <div><strong>Pneus Traseiros:</strong> ${veiculo.back_tires || 'N/D'}</div>


            </div>



             <div  class="cont" id="Dimensions">
             <p class="title">Dimensões<p>
                <div><strong>Comprimento:</strong> ${veiculo.length || 'N/D'}</div>
                <div><strong>Largura:</strong> ${veiculo.with || 'N/D'}</div>
                <div><strong>Altura:</strong> ${veiculo.heigth || 'N/D'}</div>
                <div><strong>Peso:</strong> ${veiculo.weigth || 'N/D'}</div>



            </div>




            <div class="cont" id="performance">
            <p class="title">Desenpenho<p>
                <div><strong>0 a 100km/h:</strong> ${veiculo.aceleration || 'N/D'}</div>
                <div><strong>Velocidade Máxima:</strong> ${veiculo.max_speed || 'N/D'}</div>



                </div>


            </section>

                
                
                
            `;
        });

    } catch (error) {
        resultado.innerHTML = `<p style="color:red;">Erro: ${error.message}</p>`;
    }
});
