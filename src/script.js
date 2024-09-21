const apiKey = '21ecb67ddc0b32432472d45066c126a0'

function mostrarAlerta(msg){
    document.getElementById('alerta').innerHTML= msg
}

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário

    const nomeCidade = document.getElementById('city_name').value;

    if (!nomeCidade) {
        return mostrarAlerta('Digite o nome de uma cidade.'); // Exibe um alerta se não houver nome
    }

    const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(nomeCidade)}&appid=${apiKey}&units=metric&lang=pt-br`
    const results = await fetch(apiUrl);
    const json = await results.json()

    if (json.cod === 200) {
        showInfo({
            cidade: json.name,
            pais: json.sys.country,
            temperatura: json.main.temp,
            temperaturaMx: json.main.temp_max,
            temperaturaMn: json.main.temp_min,
            descricao: json.weather[0].description,
            icon: json.weather[0].icon,
            velVento: json.wind.speed,
            umidade: json.main.humidity,

        })
    }else{
        mostrarAlerta('Digite uma cidade valida')
    }
});
function showInfo(json) {
    mostrarAlerta(''); // Limpa qualquer alerta anterior

    // Atualiza os elementos com as informações do clima
    document.getElementById('cidade').innerHTML = `${json.cidade} - ${json.pais}`;
    document.getElementById('temperatura').innerHTML = `${json.temperatura.toFixed(0)} °C`;
    document.getElementById('img').setAttribute('src', `https://openweathermap.org/img/wn/10d@2x.png`);
    document.getElementById('descricao').innerHTML = json.descricao;
    document.getElementById('maxtemp').innerHTML = `${json.temperaturaMx.toFixed(0)} °C`;
    document.getElementById('mintemp').innerHTML = `${json.temperaturaMn.toFixed(0)} °C`;
    document.getElementById('vento').innerHTML = `${json.velVento.toFixed(1)} m/s`;
    document.getElementById('umidade').innerHTML = `${json.umidade}%`;
}
