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

    public definirMascara(): void{
        this.mascara = "255.255.";
        let auxMascara = new IpDinamicDigits(256, 256);
        let auxQuantHosts = Math.pow(2, 32 - this.barramentoMascara);
        while (auxQuantHosts > 0){
            if(auxQuantHosts >= 256){
                auxQuantHosts -= 256
                auxMascara.network--;
                auxMascara.host = 0;
            }else{
                auxMascara.host -= auxQuantHosts;
                auxMascara.network--;
                auxQuantHosts = 0;
            }
        }
        this.mascara += (auxMascara.network).toString() + "." + auxMascara.host.toString();
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