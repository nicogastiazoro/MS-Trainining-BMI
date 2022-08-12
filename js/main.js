class IMC {
    constructor(ind) {
      this.value = ind.bmi;
      this.status = ind.health;
    }
}



const contenedor = document.getElementById("main");
const divImc = document.getElementById("div-imc");


document.getElementById("btn-calc").addEventListener("click", function () {
//LIMPIO EL RESULTADO
divImc.innerHTML = "" ;

//ACA VOY A TRAERME LOS DATOS CARGADOS
    let height = document.getElementById("input-height").value;
    let weight = document.getElementById("input-weight").value;

//ACA VOY A CALCULAR LOS VALORES Y MOSTRAR EN PANTALLA
    let imc = consultIMC(weight,height);

})

const createCard = (imc) => {
    const divCard = document.createElement('div');
    const divCardHeader = document.createElement('div');
    const divCardBody = document.createElement('div');
    const hCardTitle = document.createElement('h5');
    const pCardText = document.createElement('p');

    divCardHeader.setAttribute("class","card-header");
    divCardHeader.append(`IMC`);
    divCardBody.setAttribute("class","card-body");
    hCardTitle.setAttribute("class","card-title");
    hCardTitle.append(`${imc.toFixed(1)}`);
    pCardText.setAttribute("class","card-text");

    if(imc.toFixed(1)<18.5) {
        divCard.setAttribute("class","card text-bg-danger mb-3");
        pCardText.append(`Su Indice de Masa Corporal(IMC) se encuentra por debajo de los rangos normales.`)
    }else if(imc.toFixed(1)<=25){
        divCard.setAttribute("class","card text-bg-success mb-3");
        pCardText.append(`Su Indice de Masa Corporal(IMC) se encuentra dentro de los rangos normales.`)
    }else if(imc.toFixed(1)<=29.9){
        divCard.setAttribute("class","card text-bg-warning mb-3");
        pCardText.append(`Su Indice de Masa Corporal(IMC) se encuentra levemente excedido de los rangos normales.`)
    }else {
        divCard.setAttribute("class","card text-bg-danger mb-3");
        pCardText.append(`Su Indice de Masa Corporal(IMC) es elevado y supera los rangos normales.`)
    }

    divCardBody.append(hCardTitle);
    divCardBody.append(pCardText);
    divCard.append(divCardHeader);
    divCard.append(divCardBody);
    divImc.append(divCard);

} 

const consultIMC = (w,h) => {
    let imc = 0;
    let status = "";
    bmiAPI(w,h);
}

const bmiAPI = (w,h) => {
    Swal.fire({
        didOpen: () => {
          Swal.showLoading()
          const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '9605d34c44msh5cc9d0703bda740p1e0655jsnc948eacdfc91',
                'X-RapidAPI-Host': 'mega-fitness-calculator1.p.rapidapi.com'
            }
        };
          fetch(`https://mega-fitness-calculator1.p.rapidapi.com/bmi?weight=${w}&height=${h}`, options)
          .then(response => response.json())
          .then(data => {
              createCard(data.info.bmi);
              paintTable(data.info.health);
              swal.close();
              saveInfo(data.info);
          })
          .catch(err => console.error(err));
          
        },
      })
}

const saveInfo = (data) => {
    
    let date = new Date();
    let shortDate = date.toLocaleDateString();
    let info = [];
    info.push(data);

    if(localStorage.getItem(shortDate)){
        let infoDownload = JSON.parse(localStorage.getItem(shortDate));
        localStorage.removeItem(shortDate);
        let infoUpload = JSON.stringify(info.concat(infoDownload));
        localStorage.setItem(shortDate,infoUpload);
        console.log("Datos guardados de forma exitosa");
    }else{
        let infoUpload = JSON.stringify(info);
        localStorage.setItem(shortDate,infoUpload);
        console.log("Datos guardados de forma exitosa");
    }
}

const paintTable = (health) => {
    const uW = document.getElementById("tr-UW");
    const nW = document.getElementById("tr-NW");
    const oW = document.getElementById("tr-OW");
    const o1 = document.getElementById("tr-O1");
    const o2 = document.getElementById("tr-O2");
    const o3 = document.getElementById("tr-O3");

    uW.removeAttribute("class");
    nW.removeAttribute("class");
    oW.removeAttribute("class");
    o1.removeAttribute("class");
    o2.removeAttribute("class");
    o3.removeAttribute("class");

    if(health == "Under Weight"){
        uW.setAttribute("class","table-active");
    }else if(health == "Normal Weight"){
        nW.setAttribute("class","table-active");
    }else if(health == "Over Weight"){
        oW.setAttribute("class","table-active");
    }else if(health == "Obesity class I"){
        o1.setAttribute("class","table-active");
    }else if(health == "Obesity class II"){
        o2.setAttribute("class","table-active");
    }else if(health == "Obesity class III"){
        o3.setAttribute("class","table-active");
    }
}

