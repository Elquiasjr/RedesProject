import * as readlineSync from 'readline-sync';

//const input: string = readlineSync.question('Digite algo: ');
//console.log('Você digitou:', input);

import { Rede } from './classes/Rede';
import { IpDinamicDigits } from './classes/IpDinamicDigits';

function main(): void{
    const quant_redes:number = parseInt(readlineSync.question('Digite a quantidade de hosts na Matriz: '));
    const quant_redes1:number = parseInt(readlineSync.question('Digite a quantidade de hosts na DMZ: '));
    const quant_redes2:number = parseInt(readlineSync.question('Digite a quantidade de hosts na Rede 1: '));
    const quant_redes3:number = parseInt(readlineSync.question('Digite a quantidade de hosts na Rede 2: '));

    let listRedes: Array<Rede> = new Array<Rede>();

    //oderna do maior para o menor
    const hosts:number[] = [quant_redes, quant_redes1, quant_redes2, quant_redes3];
    const nome:string[] = ["Matriz", "DMZ", "Rede 1", "Rede 2"];
    const bitsHost:number[] = [];

    var buffer: number = 0;

    hosts.forEach(hosts_number => {
        if(hosts_number < 2){
            console.log("Quantidade de hosts inválida");
            return;
        }
    });

    for(let i = 0; i < 4; i++){
        bitsHost[i] = Math.floor(32 - Math.log2(hosts[i]+2));
        buffer += Math.pow(2, 32 - bitsHost[i]);
        listRedes.push(new Rede(nome[i] ,bitsHost[i], hosts[i]));
    }

    if(buffer > 16777216){
        console.log("Quantidade de hosts inválida");
        return;
    }

    listRedes.sort((a, b) => b.getQuantHosts() - a.getQuantHosts())

    listRedes.forEach(rede => {
        rede.defineIp();
        rede.definirMascara();
        rede.imprimeRede();
    });
}

main();