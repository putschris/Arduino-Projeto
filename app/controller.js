const express = require('express');
const { ArduinoData } = require('./serial');
const router = express.Router();
let arduinoId = [];
const db = require('./db').Arduino;

//configurações de exibições e dados pro BD
let contExecucao = 0;
let valorParaExibirCabecalho = 20;
let leituraData = "";
let leituraHora = "";
let leituraTemperatura = 0;
let leituraUmidade = 0;
let leituraCO2 = 0;

let month = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Aph": 4,
    "May": 5,
    "Jun": 6,
    "jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12
}

let jan = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let feb = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
let mar = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let aph = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
let may = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let jun = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
let jul = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let aug = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let sep = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,30];
let oct = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let nov = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,30];
let dec = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

db.getAllArduinos()
    .then(resultados => {
        for (let i = 0; i < resultados.length; i++) {
            arduinoId.push(resultados[i].serieBox);
        }
        setInterval(() => {

            let date = new Date();
            let da = date.toString().split(' ');
            // let hora = `${da[4]}`;
            leituraData = `${da[3]}/${month[da[1]]}/${da[2]}`;
            leituraHora = `${da[4]}`;
            
            db.getAllMeasurement()
                .then(results => {

                    let inserts = [];
                    let m = jan;
                    for (let j = 0; j < m.length; j++) 
                    {
                        for (let i = 0; i < arduinoId.length; i++) 
                        {
                        //recebe valores lidos dos sensores
                        let variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 5);
                        leituraTemperatura = parseInt(ArduinoData.List1[ArduinoData.List1.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 20);
                        leituraUmidade = parseInt(ArduinoData.List2[ArduinoData.List2.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 50);
                        leituraCO2 = parseInt(ArduinoData.List3[ArduinoData.List3.length - 1] + variacao);

                            leituraData = `${da[3]}/${1}/${m[j]}`;

                            //valida os valores lidos
                            leituraTemperatura = isNaN(leituraTemperatura) ? 0 : leituraTemperatura;
                            leituraUmidade = isNaN(leituraUmidade) ? 0 : leituraUmidade;
                            leituraCO2 = isNaN(leituraCO2) ? 0 : leituraCO2;

                            inserts.push(db.insertMeasurement({
                                temp: leituraTemperatura,
                                umi: leituraUmidade,
                                co2: leituraCO2,
                                arduino: arduinoId[i],
                                d: leituraData,
                                h: leituraHora
                            }));
                        }

                        if (contExecucao === 0) {                        
                            console.log(
                                "\n#\tDATA\t\tHORA\t\tTEMP\tUMID\tCO2"
                            );
                        }

                        console.log(
                            contExecucao + "\t" +
                            leituraData + "\t" +
                            leituraHora + "\t" +
                            leituraTemperatura + "\t" + //temperatura
                            leituraUmidade + "\t" +     //umidade
                            leituraCO2                  //co2
                        );
                    }
                    m = feb;
                    for (let j = 0; j < m.length; j++) 
                    {
                        for (let i = 0; i < arduinoId.length; i++) 
                        {
                        //recebe valores lidos dos sensores
                        let variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 5);
                        leituraTemperatura = parseInt(ArduinoData.List1[ArduinoData.List1.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 20);
                        leituraUmidade = parseInt(ArduinoData.List2[ArduinoData.List2.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 50);
                        leituraCO2 = parseInt(ArduinoData.List3[ArduinoData.List3.length - 1] + variacao);

                            leituraData = `${da[3]}/${2}/${m[j]}`;

                            //valida os valores lidos
                            leituraTemperatura = isNaN(leituraTemperatura) ? 0 : leituraTemperatura;
                            leituraUmidade = isNaN(leituraUmidade) ? 0 : leituraUmidade;
                            leituraCO2 = isNaN(leituraCO2) ? 0 : leituraCO2;

                            inserts.push(db.insertMeasurement({
                                temp: leituraTemperatura,
                                umi: leituraUmidade,
                                co2: leituraCO2,
                                arduino: arduinoId[i],
                                d: leituraData,
                                h: leituraHora
                            }));
                        }

                        if (contExecucao === 0) {                        
                            console.log(
                                "\n#\tDATA\t\tHORA\t\tTEMP\tUMID\tCO2"
                            );
                        }

                        console.log(
                            contExecucao + "\t" +
                            leituraData + "\t" +
                            leituraHora + "\t" +
                            leituraTemperatura + "\t" + //temperatura
                            leituraUmidade + "\t" +     //umidade
                            leituraCO2                  //co2
                        );
                    }
                    m = mar;
                    for (let j = 0; j < m.length; j++) 
                    {
                        for (let i = 0; i < arduinoId.length; i++) 
                        {
                        //recebe valores lidos dos sensores
                        let variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 5);
                        leituraTemperatura = parseInt(ArduinoData.List1[ArduinoData.List1.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 20);
                        leituraUmidade = parseInt(ArduinoData.List2[ArduinoData.List2.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 50);
                        leituraCO2 = parseInt(ArduinoData.List3[ArduinoData.List3.length - 1] + variacao);

                            leituraData = `${da[3]}/${3}/${m[j]}`;

                            //valida os valores lidos
                            leituraTemperatura = isNaN(leituraTemperatura) ? 0 : leituraTemperatura;
                            leituraUmidade = isNaN(leituraUmidade) ? 0 : leituraUmidade;
                            leituraCO2 = isNaN(leituraCO2) ? 0 : leituraCO2;

                            inserts.push(db.insertMeasurement({
                                temp: leituraTemperatura,
                                umi: leituraUmidade,
                                co2: leituraCO2,
                                arduino: arduinoId[i],
                                d: leituraData,
                                h: leituraHora
                            }));
                        }

                        if (contExecucao === 0) {                        
                            console.log(
                                "\n#\tDATA\t\tHORA\t\tTEMP\tUMID\tCO2"
                            );
                        }

                        console.log(
                            contExecucao + "\t" +
                            leituraData + "\t" +
                            leituraHora + "\t" +
                            leituraTemperatura + "\t" + //temperatura
                            leituraUmidade + "\t" +     //umidade
                            leituraCO2                  //co2
                        );
                    }
                    m = aph;
                    for (let j = 0; j < m.length; j++) 
                    {
                        for (let i = 0; i < arduinoId.length; i++) 
                        {
                        //recebe valores lidos dos sensores
                        let variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 5);
                        leituraTemperatura = parseInt(ArduinoData.List1[ArduinoData.List1.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 20);
                        leituraUmidade = parseInt(ArduinoData.List2[ArduinoData.List2.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 50);
                        leituraCO2 = parseInt(ArduinoData.List3[ArduinoData.List3.length - 1] + variacao);

                            leituraData = `${da[3]}/${4}/${m[j]}`;

                            //valida os valores lidos
                            leituraTemperatura = isNaN(leituraTemperatura) ? 0 : leituraTemperatura;
                            leituraUmidade = isNaN(leituraUmidade) ? 0 : leituraUmidade;
                            leituraCO2 = isNaN(leituraCO2) ? 0 : leituraCO2;

                            inserts.push(db.insertMeasurement({
                                temp: leituraTemperatura,
                                umi: leituraUmidade,
                                co2: leituraCO2,
                                arduino: arduinoId[i],
                                d: leituraData,
                                h: leituraHora
                            }));
                        }

                        if (contExecucao === 0) {                        
                            console.log(
                                "\n#\tDATA\t\tHORA\t\tTEMP\tUMID\tCO2"
                            );
                        }

                        console.log(
                            contExecucao + "\t" +
                            leituraData + "\t" +
                            leituraHora + "\t" +
                            leituraTemperatura + "\t" + //temperatura
                            leituraUmidade + "\t" +     //umidade
                            leituraCO2                  //co2
                        );
                    }
                    m = may;
                    for (let j = 0; j < m.length; j++) 
                    {
                        for (let i = 0; i < arduinoId.length; i++) 
                        {
                        //recebe valores lidos dos sensores
                        let variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 5);
                        leituraTemperatura = parseInt(ArduinoData.List1[ArduinoData.List1.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 20);
                        leituraUmidade = parseInt(ArduinoData.List2[ArduinoData.List2.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 50);
                        leituraCO2 = parseInt(ArduinoData.List3[ArduinoData.List3.length - 1] + variacao);

                            leituraData = `${da[3]}/${5}/${m[j]}`;

                            //valida os valores lidos
                            leituraTemperatura = isNaN(leituraTemperatura) ? 0 : leituraTemperatura;
                            leituraUmidade = isNaN(leituraUmidade) ? 0 : leituraUmidade;
                            leituraCO2 = isNaN(leituraCO2) ? 0 : leituraCO2;

                            inserts.push(db.insertMeasurement({
                                temp: leituraTemperatura,
                                umi: leituraUmidade,
                                co2: leituraCO2,
                                arduino: arduinoId[i],
                                d: leituraData,
                                h: leituraHora
                            }));
                        }

                        if (contExecucao === 0) {                        
                            console.log(
                                "\n#\tDATA\t\tHORA\t\tTEMP\tUMID\tCO2"
                            );
                        }

                        console.log(
                            contExecucao + "\t" +
                            leituraData + "\t" +
                            leituraHora + "\t" +
                            leituraTemperatura + "\t" + //temperatura
                            leituraUmidade + "\t" +     //umidade
                            leituraCO2                  //co2
                        );
                    }
                    m = jun;
                    for (let j = 0; j < m.length; j++) 
                    {
                        for (let i = 0; i < arduinoId.length; i++) 
                        {
                        //recebe valores lidos dos sensores
                        let variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 5);
                        leituraTemperatura = parseInt(ArduinoData.List1[ArduinoData.List1.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 20);
                        leituraUmidade = parseInt(ArduinoData.List2[ArduinoData.List2.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 50);
                        leituraCO2 = parseInt(ArduinoData.List3[ArduinoData.List3.length - 1] + variacao);

                            leituraData = `${da[3]}/${6}/${m[j]}`;

                            //valida os valores lidos
                            leituraTemperatura = isNaN(leituraTemperatura) ? 0 : leituraTemperatura;
                            leituraUmidade = isNaN(leituraUmidade) ? 0 : leituraUmidade;
                            leituraCO2 = isNaN(leituraCO2) ? 0 : leituraCO2;

                            inserts.push(db.insertMeasurement({
                                temp: leituraTemperatura,
                                umi: leituraUmidade,
                                co2: leituraCO2,
                                arduino: arduinoId[i],
                                d: leituraData,
                                h: leituraHora
                            }));
                        }

                        if (contExecucao === 0) {                        
                            console.log(
                                "\n#\tDATA\t\tHORA\t\tTEMP\tUMID\tCO2"
                            );
                        }

                        console.log(
                            contExecucao + "\t" +
                            leituraData + "\t" +
                            leituraHora + "\t" +
                            leituraTemperatura + "\t" + //temperatura
                            leituraUmidade + "\t" +     //umidade
                            leituraCO2                  //co2
                        );
                    }
                    m = jul;
                    for (let j = 0; j < m.length; j++) 
                    {
                        for (let i = 0; i < arduinoId.length; i++) 
                        {
                        //recebe valores lidos dos sensores
                        let variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 5);
                        leituraTemperatura = parseInt(ArduinoData.List1[ArduinoData.List1.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 20);
                        leituraUmidade = parseInt(ArduinoData.List2[ArduinoData.List2.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 50);
                        leituraCO2 = parseInt(ArduinoData.List3[ArduinoData.List3.length - 1] + variacao);

                            leituraData = `${da[3]}/${7}/${m[j]}`;

                            //valida os valores lidos
                            leituraTemperatura = isNaN(leituraTemperatura) ? 0 : leituraTemperatura;
                            leituraUmidade = isNaN(leituraUmidade) ? 0 : leituraUmidade;
                            leituraCO2 = isNaN(leituraCO2) ? 0 : leituraCO2;

                            inserts.push(db.insertMeasurement({
                                temp: leituraTemperatura,
                                umi: leituraUmidade,
                                co2: leituraCO2,
                                arduino: arduinoId[i],
                                d: leituraData,
                                h: leituraHora
                            }));
                        }

                        if (contExecucao === 0) {                        
                            console.log(
                                "\n#\tDATA\t\tHORA\t\tTEMP\tUMID\tCO2"
                            );
                        }

                        console.log(
                            contExecucao + "\t" +
                            leituraData + "\t" +
                            leituraHora + "\t" +
                            leituraTemperatura + "\t" + //temperatura
                            leituraUmidade + "\t" +     //umidade
                            leituraCO2                  //co2
                        );
                    }
                    m = aug;
                    for (let j = 0; j < m.length; j++) 
                    {
                        for (let i = 0; i < arduinoId.length; i++) 
                        {
                        //recebe valores lidos dos sensores
                        let variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 5);
                        leituraTemperatura = parseInt(ArduinoData.List1[ArduinoData.List1.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 20);
                        leituraUmidade = parseInt(ArduinoData.List2[ArduinoData.List2.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 50);
                        leituraCO2 = parseInt(ArduinoData.List3[ArduinoData.List3.length - 1] + variacao);

                            leituraData = `${da[3]}/${8}/${m[j]}`;

                            //valida os valores lidos
                            leituraTemperatura = isNaN(leituraTemperatura) ? 0 : leituraTemperatura;
                            leituraUmidade = isNaN(leituraUmidade) ? 0 : leituraUmidade;
                            leituraCO2 = isNaN(leituraCO2) ? 0 : leituraCO2;

                            inserts.push(db.insertMeasurement({
                                temp: leituraTemperatura,
                                umi: leituraUmidade,
                                co2: leituraCO2,
                                arduino: arduinoId[i],
                                d: leituraData,
                                h: leituraHora
                            }));
                        }

                        if (contExecucao === 0) {                        
                            console.log(
                                "\n#\tDATA\t\tHORA\t\tTEMP\tUMID\tCO2"
                            );
                        }

                        console.log(
                            contExecucao + "\t" +
                            leituraData + "\t" +
                            leituraHora + "\t" +
                            leituraTemperatura + "\t" + //temperatura
                            leituraUmidade + "\t" +     //umidade
                            leituraCO2                  //co2
                        );
                    }
                    m = sep;
                    for (let j = 0; j < m.length; j++) 
                    {
                        for (let i = 0; i < arduinoId.length; i++) 
                        {
                        //recebe valores lidos dos sensores
                        let variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 5);
                        leituraTemperatura = parseInt(ArduinoData.List1[ArduinoData.List1.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 20);
                        leituraUmidade = parseInt(ArduinoData.List2[ArduinoData.List2.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 50);
                        leituraCO2 = parseInt(ArduinoData.List3[ArduinoData.List3.length - 1] + variacao);

                            leituraData = `${da[3]}/${9}/${m[j]}`;

                            //valida os valores lidos
                            leituraTemperatura = isNaN(leituraTemperatura) ? 0 : leituraTemperatura;
                            leituraUmidade = isNaN(leituraUmidade) ? 0 : leituraUmidade;
                            leituraCO2 = isNaN(leituraCO2) ? 0 : leituraCO2;

                            inserts.push(db.insertMeasurement({
                                temp: leituraTemperatura,
                                umi: leituraUmidade,
                                co2: leituraCO2,
                                arduino: arduinoId[i],
                                d: leituraData,
                                h: leituraHora
                            }));
                        }

                        if (contExecucao === 0) {                        
                            console.log(
                                "\n#\tDATA\t\tHORA\t\tTEMP\tUMID\tCO2"
                            );
                        }

                        console.log(
                            contExecucao + "\t" +
                            leituraData + "\t" +
                            leituraHora + "\t" +
                            leituraTemperatura + "\t" + //temperatura
                            leituraUmidade + "\t" +     //umidade
                            leituraCO2                  //co2
                        );
                    }
                    m = oct;
                    for (let j = 0; j < m.length; j++) 
                    {
                        for (let i = 0; i < arduinoId.length; i++) 
                        {
                        //recebe valores lidos dos sensores
                        let variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 5);
                        leituraTemperatura = parseInt(ArduinoData.List1[ArduinoData.List1.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 20);
                        leituraUmidade = parseInt(ArduinoData.List2[ArduinoData.List2.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 50);
                        leituraCO2 = parseInt(ArduinoData.List3[ArduinoData.List3.length - 1] + variacao);

                            leituraData = `${da[3]}/${10}/${m[j]}`;

                            //valida os valores lidos
                            leituraTemperatura = isNaN(leituraTemperatura) ? 0 : leituraTemperatura;
                            leituraUmidade = isNaN(leituraUmidade) ? 0 : leituraUmidade;
                            leituraCO2 = isNaN(leituraCO2) ? 0 : leituraCO2;

                            inserts.push(db.insertMeasurement({
                                temp: leituraTemperatura,
                                umi: leituraUmidade,
                                co2: leituraCO2,
                                arduino: arduinoId[i],
                                d: leituraData,
                                h: leituraHora
                            }));
                        }

                        if (contExecucao === 0) {                        
                            console.log(
                                "\n#\tDATA\t\tHORA\t\tTEMP\tUMID\tCO2"
                            );
                        }

                        console.log(
                            contExecucao + "\t" +
                            leituraData + "\t" +
                            leituraHora + "\t" +
                            leituraTemperatura + "\t" + //temperatura
                            leituraUmidade + "\t" +     //umidade
                            leituraCO2                  //co2
                        );
                    }
                    m = nov;
                    for (let j = 0; j < m.length; j++) 
                    {
                        for (let i = 0; i < arduinoId.length; i++) 
                        {
                        //recebe valores lidos dos sensores
                        let variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 5);
                        leituraTemperatura = parseInt(ArduinoData.List1[ArduinoData.List1.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 20);
                        leituraUmidade = parseInt(ArduinoData.List2[ArduinoData.List2.length - 1] + variacao);
                        variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 50);
                        leituraCO2 = parseInt(ArduinoData.List3[ArduinoData.List3.length - 1] + variacao);

                            leituraData = `${da[3]}/${11}/${m[j]}`;

                            //valida os valores lidos
                            leituraTemperatura = isNaN(leituraTemperatura) ? 0 : leituraTemperatura;
                            leituraUmidade = isNaN(leituraUmidade) ? 0 : leituraUmidade;
                            leituraCO2 = isNaN(leituraCO2) ? 0 : leituraCO2;

                            inserts.push(db.insertMeasurement({
                                temp: leituraTemperatura,
                                umi: leituraUmidade,
                                co2: leituraCO2,
                                arduino: arduinoId[i],
                                d: leituraData,
                                h: leituraHora
                            }));
                        }

                        if (contExecucao === 0) {                        
                            console.log(
                                "\n#\tDATA\t\tHORA\t\tTEMP\tUMID\tCO2"
                            );
                        }

                        console.log(
                            contExecucao + "\t" +
                            leituraData + "\t" +
                            leituraHora + "\t" +
                            leituraTemperatura + "\t" + //temperatura
                            leituraUmidade + "\t" +     //umidade
                            leituraCO2                  //co2
                        );
                    }
                    m = dec;
                    for (let j = 0; j < m.length; j++) 
                    {
                        for (let i = 0; i < arduinoId.length; i++) 
                        {
                        //recebe valores lidos dos sensores
                            let variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 5);
                            leituraTemperatura = parseInt(ArduinoData.List1[ArduinoData.List1.length - 1] + variacao);
                            variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 20);
                            leituraUmidade = parseInt(ArduinoData.List2[ArduinoData.List2.length - 1] + variacao);
                            variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 50);
                            leituraCO2 = parseInt(ArduinoData.List3[ArduinoData.List3.length - 1] + variacao);

                            leituraData = `${da[3]}/${12}/${m[j]}`;

                            //valida os valores lidos
                            leituraTemperatura = isNaN(leituraTemperatura) ? 0 : leituraTemperatura;
                            leituraUmidade = isNaN(leituraUmidade) ? 0 : leituraUmidade;
                            leituraCO2 = isNaN(leituraCO2) ? 0 : leituraCO2;

                            inserts.push(db.insertMeasurement({
                                temp: leituraTemperatura,
                                umi: leituraUmidade,
                                co2: leituraCO2,
                                arduino: arduinoId[i],
                                d: leituraData,
                                h: leituraHora
                            }));
                        }

                        if (contExecucao === 0) {                        
                            console.log(
                                "\n#\tDATA\t\tHORA\t\tTEMP\tUMID\tCO2"
                            );
                        }

                        console.log(
                            contExecucao + "\t" +
                            leituraData + "\t" +
                            leituraHora + "\t" +
                            leituraTemperatura + "\t" + //temperatura
                            leituraUmidade + "\t" +     //umidade
                            leituraCO2                  //co2
                        );
                    }
                    
                    contExecucao++;
                    if (contExecucao > valorParaExibirCabecalho){
                        contExecucao = 0;
                    }

                    Promise.all(inserts)
                        .then((results) => {

                        })
                        .catch(err => console.log(err));
                }) //fim then
                .catch(err => console.log(err));

        }, 120000);
    }); //fim then

router.get('/', (request, response, next) => {
    db.getAllMeasurement()
        .then(results => response.json(results))
        .catch(err => response.json(err));
});

module.exports = router;
