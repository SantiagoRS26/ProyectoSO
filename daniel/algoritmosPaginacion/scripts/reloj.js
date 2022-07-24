let container = document.querySelector(".main-container");
let numeroMarcos = 3;

let referenciasObjs = [
    {
        numeroReferencia: 2,
        contadorReloj: 1,
        referencias:0,
    },
    {
        numeroReferencia: 3,
        contadorReloj: 1,
        referencias:0,
    },
    {
        numeroReferencia: 2,
        contadorReloj: 1,
        referencias:0,
    },
    {
        numeroReferencia: 1,
        contadorReloj: 1,
        referencias:0,
    },
    {
        numeroReferencia: 5,
        contadorReloj: 1,
        referencias:0,
    },
    {
        numeroReferencia: 2,
        contadorReloj: 1,
        referencias:0,
    },
    {
        numeroReferencia: 4,
        contadorReloj: 1,
        referencias:0,
    },
    {
        numeroReferencia: 5,
        contadorReloj: 1,
        referencias:0,
    },
    {
        numeroReferencia: 3,
        contadorReloj: 1,
        referencias:0,
    },
    {
        numeroReferencia: 2,
        contadorReloj: 1,
        referencias:0,
    },
    {
        numeroReferencia: 5,
        contadorReloj: 1,
        referencias:0,
    },
    {
        numeroReferencia: 2,
        contadorReloj: 1,
        referencias:0,
    }

];


/*Funcion que genera la tabla*/
function generarTablaReloj() {
    let numeroFallos = 0;
    //let puntero = 1;
    let tableContainer = document.createElement("table");
    let headTable = document.createElement("thead");
    let bodyTable = document.createElement("tbody");

    let primerTr = document.createElement("tr");
    let primerTh = document.createElement("th");
    primerTh.textContent = "Marcos";
    primerTr.appendChild(primerTh);

    /*Llenar referencias*/
    for (let i = 0; i < referenciasObjs.length; i++) {
        let thReferencias = document.createElement("th");
        thReferencias.textContent = `${referenciasObjs[i].numeroReferencia}`;
        primerTr.appendChild(thReferencias);
    }
    /*Llenar toda la tabla*/
    for (let i = 0; i < numeroMarcos + 1; i++) {
        let filas = document.createElement("tr");
        for (let j = 0; j < referenciasObjs.length + 1; j++) {
            let celda = document.createElement("td");
            celda.classList.add(`celda-${i}-${j}`);
            celda.textContent = " ";
            filas.appendChild(celda);
        }
        bodyTable.appendChild(filas);
    }

    headTable.appendChild(primerTr);
    tableContainer.appendChild(headTable);
    tableContainer.appendChild(bodyTable);
    container.appendChild(tableContainer);

    /*Poner etiquetas de Marco 1, Marco 2,...Marco n y Fallos */
    for (let i = 0; i < numeroMarcos; i++) {
        let m1 = document.querySelector(`.celda-${i}-0`);
        m1.textContent = `Marco ${i + 1}`;
    }
    let celFallos = document.querySelector(`.celda-${numeroMarcos}-0`);
    celFallos.textContent = "Fallos ";


    /**********************************RELOJ****************************************/
    let paginasActuales = [];
    for (let i = 0; i < referenciasObjs.length; i++) {
        for (let j = 0; j < numeroMarcos; j++) {
            let pagina = referenciasObjs[i].numeroReferencia;
            if (paginasActuales.map(function (e) { return e.numeroReferencia; }).indexOf(pagina) < 0) {
                /*FALLO PERO QUEDAN MARCOS*/
                if (paginasActuales.length < numeroMarcos) {
                    paginasActuales.push(referenciasObjs[i]);
                    for (let x = 0; x < paginasActuales.length; x++) {
                        let celda = document.querySelector(`.celda-${x}-${i + 1}`);
                        let celdaFallos = document.querySelector(`.celda-${numeroMarcos}-${i + 1}`);
                        celdaFallos.textContent = "X"
                        celda.textContent = `${paginasActuales[x].numeroReferencia},${paginasActuales[x].contadorReloj}`;
                    }
                    paginasActuales.forEach(element => {
                        element.referencias++;
                    });
                    numeroFallos++;
                    break;
                } else {
                    /*NO HAY MARCOS - ALGORITMO RELOJ*/
                    let copiaPaginasAct = paginasActuales.slice();
                    copiaPaginasAct.sort((a,b)=>{
                        if(b.contadorReloj!=a.contadorReloj){
                            return a.contadorReloj-b.contadorReloj;
                        }else{
                            return b.referencias-a.referencias;
                        }
                    });
                    let puntero = paginasActuales.map(function (e) { return e.numeroReferencia; }).indexOf(copiaPaginasAct[0].numeroReferencia);
                    for(k=puntero;k<paginasActuales.length;k++){
                        paginasActuales[k].contadorReloj=0;
                    }
                    let paginaSeleccionada = paginasActuales[puntero].numeroReferencia;
                    let indicePaginasActuales = paginasActuales.map(function (e) { return e.numeroReferencia; }).indexOf(paginaSeleccionada);
                    paginasActuales[indicePaginasActuales].numeroReferencia = pagina;
                    paginasActuales[indicePaginasActuales].contadorReloj=1;
                    paginasActuales[indicePaginasActuales].referencias=0;
                    for (let x = 0; x < paginasActuales.length; x++) {
                        let celda = document.querySelector(`.celda-${x}-${i + 1}`);
                        celda.textContent = `${paginasActuales[x].numeroReferencia},${paginasActuales[x].contadorReloj}`;
                        let celdaFallos = document.querySelector(`.celda-${numeroMarcos}-${i + 1}`);
                        celdaFallos.textContent="X"
                            
                    }
                    numeroFallos++;
                    break;
                }
            } else {
                /**NO HAY FALLO */
                let posPag = paginasActuales.map(function (e) { return e.numeroReferencia; }).indexOf(pagina);
                paginasActuales[posPag].contadorReloj=1;
                paginasActuales[posPag].referencias++;

                for (let x = 0; x < paginasActuales.length; x++) {
                    let celda = document.querySelector(`.celda-${x}-${i + 1}`);
                    celda.textContent = `${paginasActuales[x].numeroReferencia},${paginasActuales[x].contadorReloj}`;
                    let celdaFallos = document.querySelector(`.celda-${numeroMarcos}-${i + 1}`);
                    celdaFallos.textContent = "V"
                }
                break;
            }
        }
        /******************************************************************************/
    }
}

generarTablaReloj();