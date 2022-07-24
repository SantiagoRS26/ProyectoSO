let container = document.querySelector(".main-container");
let numeroMarcos = 4;
let referencias = [2, 3, 4, 1, 2, 3, 4, 7, 8, 2];

let referenciasObjs = [
    {
        numeroReferencia: 2,
        referencias: 0,
    },
    {
        numeroReferencia: 3,
        referencias: 0,
    },
    {
        numeroReferencia: 4,
        referencias: 0,
    },
    {
        numeroReferencia: 1,
        referencias: 0,
    },
    {
        numeroReferencia: 2,
        referencias: 0,
    },
    {
        numeroReferencia: 3,
        referencias: 0,
    },
    {
        numeroReferencia: 4,
        referencias: 0,
    },
    {
        numeroReferencia: 7,
        referencias: 0,
    },
    {
        numeroReferencia: 8,
        referencias: 0,
    },
    {
        numeroReferencia: 2,
        referencias: 0,
    },
];


/*Funcion que genera la tabla*/
function generarTablaOptimo() {
    let numeroFallos=0;
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

    /***************************OPTIMO*****************************************/

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
                        celdaFallos.textContent="X"
                        celda.textContent = paginasActuales[x].numeroReferencia;
                        
                    }
                    paginasActuales.forEach(element => {
                        element.referencias++;
                    });
                    numeroFallos++;
                    break;
                } else {
                    /*NO HAY MARCOS DISPONIBLES */
                    /*ALGORITMO OPTIMO*/
                    /*Busca el indice de la pagina mas lejana*/
                    let mayor = 0;
                    let copiaPaginasAct=[];
                    for(let y=0;y<paginasActuales.length;y++){
                        let indice = referenciasObjs.map(function (e) { return e.numeroReferencia; }).indexOf(paginasActuales[y].numeroReferencia, i)
                        if(indice<0){
                            mayor=indice;
                            break;
                        }
                        if (indice > mayor) {
                            mayor = indice
                        }
                    }
                    if(mayor>=0){
                        /*Hay una pagina en la lista de referencias*/
                        let paginaSeleccionada = referenciasObjs[mayor].numeroReferencia;
                        let indicePaginasActuales = paginasActuales.map(function (e) { return e.numeroReferencia; }).indexOf(paginaSeleccionada);
                        paginasActuales[indicePaginasActuales].numeroReferencia = pagina;
                        paginasActuales[indicePaginasActuales].referencias=0;
    
                        for (let x = 0; x < paginasActuales.length; x++) {
                            let celda = document.querySelector(`.celda-${x}-${i + 1}`);
                            celda.textContent = paginasActuales[x].numeroReferencia;
                            let celdaFallos = document.querySelector(`.celda-${numeroMarcos}-${i + 1}`);
                            celdaFallos.textContent="X"
                            
                        }
                        paginasActuales.forEach(element => {
                            element.referencias++;
                        });
                        numeroFallos++;
                        break;
                    }else{
                        /*No hay una pagina en la lista, SE APLICA FIFO*/
                        let copiaPaginasAct = paginasActuales.slice();
                        copiaPaginasAct.sort((a,b)=>{
                            return b.referencias-a.referencias;
                        });
                        let paginaSeleccionada = copiaPaginasAct[0].numeroReferencia;
                        let indicePaginasActuales = paginasActuales.map(function (e) { return e.numeroReferencia; }).indexOf(paginaSeleccionada);
                        paginasActuales[indicePaginasActuales].numeroReferencia = pagina;
                        paginasActuales[indicePaginasActuales].referencias=0;
                        for (let x = 0; x < paginasActuales.length; x++) {
                            let celda = document.querySelector(`.celda-${x}-${i + 1}`);
                            celda.textContent = paginasActuales[x].numeroReferencia;
                            let celdaFallos = document.querySelector(`.celda-${numeroMarcos}-${i + 1}`);
                            celdaFallos.textContent="X"
                            
                        }
                        paginasActuales.forEach(element => {
                            element.referencias++;
                        });
                        numeroFallos++;
                        break;

                    }
                }
            } else {
                /**NO HAY FALLO */
                for (let x = 0; x < paginasActuales.length; x++) {
                    let celda = document.querySelector(`.celda-${x}-${i + 1}`);
                    celda.textContent = paginasActuales[x].numeroReferencia;
                    let celdaFallos = document.querySelector(`.celda-${numeroMarcos}-${i + 1}`);
                    celdaFallos.textContent="V"
                }
                paginasActuales.forEach(element => {
                    element.referencias++;
                });
                break;
            }
        }

        /*************************************************************************/
    }
    let numeroFallosP = document.createElement("p");
    let indicador1 = document.createElement("p");
    let rendimiento = document.createElement("p");
    numeroFallosP.textContent=`Numero de fallos ${numeroFallos}`;
    indicador1.textContent=`Indicador 1: #fallos/referencias ${numeroFallos/referenciasObjs.length}`;
    rendimiento.textContent=`Rendimiento: ${(numeroFallos/referenciasObjs.length)*100}%`
    container.appendChild(numeroFallosP);
    container.appendChild(indicador1);
    container.appendChild(rendimiento);
}
generarTablaOptimo();

