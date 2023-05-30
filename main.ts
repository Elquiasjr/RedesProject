import * as readlineSync from 'readline-sync';

//const input: string = readlineSync.question('Digite algo: ');
//console.log('Você digitou:', input);

import { Rede } from './classes/Rede';
import { IpDinamicDigits } from './classes/IpDinamicDigits';

var coordenadasGlobais = new IpDinamicDigits(0, 0);

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

    for(let i = 0; i < 4; i++){
        bitsHost[i] = Math.floor(32 - Math.log2(hosts[i]+2));
        listRedes.push(new Rede(nome[i] ,bitsHost[i], hosts[i]));
    }
    listRedes.sort((a, b) => b.getQuantHosts() - a.getQuantHosts())

    listRedes.forEach(rede => {
        defineIp(rede);
        rede.definirMascara();
        imprimeRede(rede);
    });
}

function defineIp(rede:Rede): void{

    rede.setEnderecoRede("192.168." + coordenadasGlobais.network.toString() + "." + coordenadasGlobais.host.toString());
    let ipSet = Math.pow(2 ,32-rede.getBarramentoMascara());
    rede.setEnderecoUtilInicio("192.168." + coordenadasGlobais.network.toString() + "." + (coordenadasGlobais.host + 1).toString());
    
    while (ipSet > 0 ){
        if (ipSet <= 256 && (coordenadasGlobais.host + ipSet) < 256){
            coordenadasGlobais.host += ipSet;
            ipSet = 0; 
        }
        else if(ipSet >= 256){
            ipSet -= 256
            coordenadasGlobais.network++;
            coordenadasGlobais.host = 0;
        }else{
            coordenadasGlobais.network++;
            coordenadasGlobais.host = 0;
            ipSet = 0;
        }
    }

    if(coordenadasGlobais.host == 0){
        rede.setEnderecoBroadcast("192.168." + (coordenadasGlobais.network-1).toString() + "." + (255).toString());
        rede.setEnderecoUtilFim("192.168." + (coordenadasGlobais.network-1).toString() + "." + (254).toString());
    }
    else{
        rede.setEnderecoBroadcast("192.168." + coordenadasGlobais.network.toString() + "." + (coordenadasGlobais.host - 1).toString());
        rede.setEnderecoUtilFim("192.168." + coordenadasGlobais.network.toString() + "." + (coordenadasGlobais.host - 2).toString());
    }
}

function imprimeRede(rede:Rede): void{
    console.log("Nome da rede: " + rede.getNomeRede());
    console.log("Quantidade de Hosts: " + rede.getQuantHosts());
    console.log("Endereço de rede: " + rede.getEnderecoRede());
    
    console.log("Endereço de utilização inicial: " + rede.getEnderecoUtilInicio());
    console.log("Endereço de utilização final: " + rede.getEnderecoUtilFim());
    console.log("Endereço de broadcast: " + rede.getEnderecoBroadcast());
    console.log("Máscara: " + rede.getMascara());
    console.log("Barramento da máscara: " + rede.getBarramentoMascara());
    console.log("\n");
}

main();