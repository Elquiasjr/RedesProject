import { IpDinamicDigits } from "./IpDinamicDigits";

export class Rede{
    private nomeRede: string;
    private barramentoMascara: number;
    private quantHosts: number;
    private mascara: string;
    private enderecoRede: string;
    private enderecoBroadcast: string;
    private enderecoUtilInicio: string;
    private enderecoUtilFim: string;
    private static IpGlobal: IpDinamicDigits = new IpDinamicDigits(0, 0, 0);

    constructor(nomeRede:string ,barramentoMascara: number, quantHosts: number){
        this.nomeRede = nomeRede;
        this.barramentoMascara = barramentoMascara;
        this.quantHosts = quantHosts;
        this.mascara = "";
        this.enderecoRede = "";
        this.enderecoBroadcast = "";
        this.enderecoUtilInicio = "";
        this.enderecoUtilFim = "";
    }

    public defineIp(): void{

        this.setEnderecoRede("192." + Rede.IpGlobal.network1.toString() + "." + Rede.IpGlobal.network2.toString() + "." + Rede.IpGlobal.host.toString());
        let ipSet = Math.pow(2 ,32-this.getBarramentoMascara());
        this.setEnderecoUtilInicio("192." + Rede.IpGlobal.network1.toString() + "." + Rede.IpGlobal.network2.toString() + "." + (Rede.IpGlobal.host + 1).toString());
        
        while (ipSet > 0 ){
            if (ipSet <= 256 && (Rede.IpGlobal.host + ipSet) < 256){
                Rede.IpGlobal.host += ipSet;
                ipSet = 0; 
            }
            else if(ipSet >= 256){
                ipSet -= 256
                Rede.IpGlobal.network2++;
                Rede.IpGlobal.host = 0;
            }else{
                Rede.IpGlobal.network2++;
                Rede.IpGlobal.host = 0;
                ipSet = 0;
            }
            if(Rede.IpGlobal.network2 >= 256){
                Rede.IpGlobal.network2 -= 256;
                Rede.IpGlobal.network1++;
            }
        }

        if(Rede.IpGlobal.network2 == 0){
            this.setEnderecoBroadcast("192." + (Rede.IpGlobal.network1-1).toString() + "." + (255).toString() + "." + (255).toString());
            this.setEnderecoUtilFim("192." + (Rede.IpGlobal.network1-1).toString() + "." + (255).toString() + "." + (254).toString());
        }
        else if(Rede.IpGlobal.host == 0){
            this.setEnderecoBroadcast("192." + Rede.IpGlobal.network1.toString() + "." + (Rede.IpGlobal.network2-1).toString() + "." + (255).toString());
            this.setEnderecoUtilFim("192." + Rede.IpGlobal.network1.toString() + "." + (Rede.IpGlobal.network2-1).toString() + "." + (254).toString());
        }
        else{
            this.setEnderecoBroadcast("192." + Rede.IpGlobal.network1.toString() + "." + Rede.IpGlobal.network2.toString() + "." + (Rede.IpGlobal.host - 1).toString());
            this.setEnderecoUtilFim("192." + Rede.IpGlobal.network1.toString() + "." + Rede.IpGlobal.network2.toString() + "." + (Rede.IpGlobal.host - 2).toString());
        }
    }
    

    public definirMascara(): void{
        this.mascara = "255.";
        let auxMascara = new IpDinamicDigits(255, 256, 256);
        let auxQuantHosts = Math.pow(2, 32 - this.barramentoMascara);
        while (auxQuantHosts > 0){
            if(auxQuantHosts >= 256){
                auxQuantHosts -= 256
                auxMascara.network2--;
                auxMascara.host = 0;
            }else{
                auxMascara.host -= auxQuantHosts;
                auxQuantHosts = 0;
            }
            if(auxMascara.network2 < 0){
                auxMascara.network2 += 256;
                auxMascara.network1--;
            }
        }
        this.mascara += (auxMascara.network1).toString() + "." + (auxMascara.network2).toString() + "." + auxMascara.host.toString();
    }

    public imprimeRede(): void{
        console.log("\n");
        console.log("Nome da rede: " + this.getNomeRede());
        console.log("Quantidade de Hosts: " + this.getQuantHosts());
        console.log("Endereço de rede: " + this.getEnderecoRede());
        console.log("Endereço de utilização inicial: " + this.getEnderecoUtilInicio());
        console.log("Endereço de utilização final: " + this.getEnderecoUtilFim());
        console.log("Endereço de broadcast: " + this.getEnderecoBroadcast());
        console.log("Máscara: " + this.getMascara());
        console.log("Barramento da máscara: " + this.getBarramentoMascara());
    }
    public getMascara(): string{
        return this.mascara;
    }

    public getQuantHosts(): number{
        return this.quantHosts;
    }

    public getEnderecoRede(): string{
        return this.enderecoRede;
    }

    public getEnderecoBroadcast(): string{
        return this.enderecoBroadcast;
    }

    public getEnderecoUtilInicio(): string{
        return this.enderecoUtilInicio;
    }

    public getEnderecoUtilFim(): string{
        return this.enderecoUtilFim;
    }

    public getNomeRede(): string{
        return this.nomeRede;
    }

    public setMascara(mascara: string): void{
        this.mascara = mascara;
    }
    
    public setEnderecoRede(enderecoRede: string): void{
        this.enderecoRede = enderecoRede;
    }
    
    public setEnderecoBroadcast(enderecoBroadcast: string): void{
        this.enderecoBroadcast = enderecoBroadcast;
    }

    public setEnderecoUtilInicio(enderecoUtilInicio: string): void{
        this.enderecoUtilInicio = enderecoUtilInicio;
    }
    
    public setEnderecoUtilFim(enderecoUtilFim: string): void{
        this.enderecoUtilFim = enderecoUtilFim;
    }
    
    public setNomeRede(nomeRede: string): void{
        this.nomeRede = nomeRede;
    }
    
    public setBarramentoMascara(barramentoMascara: number): void{
        this.barramentoMascara = barramentoMascara;
    }

    public getBarramentoMascara(): number{
        return this.barramentoMascara;
    }

}