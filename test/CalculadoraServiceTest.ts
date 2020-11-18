import {describe} from 'mocha';
import {expect} from 'chai';
import {CalculoService} from '../src/services/CalculoService'
import {_modelOutput} from 'src/models/_modelsOutput'
import {Constants} from '../src/constants/constants'
import { from } from "linq-to-typescript"


describe('CalculoService', () => {


    describe('Posição Atual Carteira', ()=>{

        
        it('Apenas valores de compra',()=>{

           const service = new  CalculoService();

           let data : any[] = [
                { Papel : 'ITSA4',  DataPregao: '01/01/2020', TipoOrdem : Constants.TipoOrdem.COMPRA, Preco : 10, Quantidade:100},
                { Papel : 'ITSA4',  DataPregao: '02/01/2020', TipoOrdem : Constants.TipoOrdem.COMPRA, Preco : 11, Quantidade:100},
                { Papel : 'ITSA4',  DataPregao: '03/01/2020', TipoOrdem : Constants.TipoOrdem.COMPRA, Preco : 12, Quantidade:100},
                { Papel : 'ITSA4',  DataPregao: '04/01/2020', TipoOrdem : Constants.TipoOrdem.COMPRA, Preco : 13, Quantidade:100},
            ];

           let result = service.recuperaPosicaoAtualCarteira(data);
           expect(result.length).to.equals(1);
           expect(from(result).sum(y=>y.precoMedio)).to.equals(11.5);
           expect(from(result).sum(y=>y.valorTotal)).to.equals(4600);
        })

        it('Apenas valores de venda',()=>{

            const service = new  CalculoService();
 
            let data : any[] = [
                 { Papel : 'ITSA4',  DataPregao: '01/01/2020', TipoOrdem : Constants.TipoOrdem.VENDA, Preco : 13, Quantidade:100},
                 { Papel : 'ITSA4',  DataPregao: '02/01/2020', TipoOrdem : Constants.TipoOrdem.VENDA, Preco : 12, Quantidade:100},
                 { Papel : 'ITSA4',  DataPregao: '03/01/2020', TipoOrdem : Constants.TipoOrdem.VENDA, Preco : 11, Quantidade:100},
             ];
 
            let result = service.recuperaPosicaoAtualCarteira(data);
            expect(1).to.equals(result.length);
            expect(12).to.equals(from(result).sum(y=>y.precoMedio));
            expect(3600).to.equals(from(result).sum(y=>y.valorTotal));
         })

         it('Valores de compra e depois venda',()=>{

            const service = new  CalculoService();
 
            let data : any[] = [
                 { Papel : 'ITSA4',  DataPregao: '01/01/2020', TipoOrdem : Constants.TipoOrdem.COMPRA, Preco : 10, Quantidade:100},
                 { Papel : 'ITSA4',  DataPregao: '02/01/2020', TipoOrdem : Constants.TipoOrdem.COMPRA, Preco : 11, Quantidade:100},
                 { Papel : 'ITSA4',  DataPregao: '03/01/2020', TipoOrdem : Constants.TipoOrdem.COMPRA, Preco : 12, Quantidade:100},
                 { Papel : 'ITSA4',  DataPregao: '04/01/2020', TipoOrdem : Constants.TipoOrdem.VENDA, Preco : 13, Quantidade:100},
                 { Papel : 'ITSA4',  DataPregao: '05/01/2020', TipoOrdem : Constants.TipoOrdem.VENDA, Preco : 14, Quantidade:100},
             ];
 
            let result = service.recuperaPosicaoAtualCarteira(data);
            expect(1).to.equals(result.length);
            expect(6).to.equals(from(result).sum(y=>y.precoMedio));
            expect(600).to.equals(from(result).sum(y=>y.valorTotal));
         })
    })

    
    describe('Lucro Realizado', ()=>{

        
        it('Lucro Realizado Compra e Venda',()=>{
            const service = new  CalculoService();

            let data : any[] = [
                { Papel : 'ITSA4',  DataPregao: '01/01/2020', TipoOrdem : Constants.TipoOrdem.COMPRA, Preco : 10, Quantidade:100},
                { Papel : 'ITSA4',  DataPregao: '02/01/2020', TipoOrdem : Constants.TipoOrdem.VENDA, Preco : 11, Quantidade:100},
            ];

            let result = service.calculaLucroRealizado(data);
            expect(100).to.equals(result[0].lucro);

        })

        it('Lucro Realizado Compra, venda e compra novamente',()=>{
            const service = new  CalculoService();

            let data : any[] = [
                { Papel : 'ITSA4',  DataPregao: '01/01/2020', TipoOrdem : Constants.TipoOrdem.COMPRA, Preco : 10, Quantidade:100},
                { Papel : 'ITSA4',  DataPregao: '02/01/2020', TipoOrdem : Constants.TipoOrdem.VENDA, Preco : 11, Quantidade:100},
                { Papel : 'ITSA4',  DataPregao: '03/01/2020', TipoOrdem : Constants.TipoOrdem.COMPRA, Preco : 12, Quantidade:100},
            ];

            let result = service.calculaLucroRealizado(data);
            expect(100).to.equals(result[0].lucro);

        })

        it('Lucro Realizado Realização negativa',()=>{
            const service = new  CalculoService();

            let data : any[] = [
                { Papel : 'ITSA4',  DataPregao: '01/01/2020', TipoOrdem : Constants.TipoOrdem.COMPRA, Preco : 10, Quantidade:100},
                { Papel : 'ITSA4',  DataPregao: '02/01/2020', TipoOrdem : Constants.TipoOrdem.VENDA, Preco : 11, Quantidade:100},
                { Papel : 'ITSA4',  DataPregao: '03/01/2020', TipoOrdem : Constants.TipoOrdem.COMPRA, Preco : 12, Quantidade:100},
                { Papel : 'ITSA4',  DataPregao: '04/01/2020', TipoOrdem : Constants.TipoOrdem.VENDA, Preco : 9, Quantidade:100},
                { Papel : 'ITSA4',  DataPregao: '05/01/2020', TipoOrdem : Constants.TipoOrdem.COMPRA, Preco : 10, Quantidade:100},
            ];

            let result = service.calculaLucroRealizado(data);
            expect(-200).to.equals(result[0].lucro);

        })

        it('Lucro Realizado Realização Parcial',()=>{
            const service = new  CalculoService();

            let data : any[] = [
                { Papel : 'ITSA4',  DataPregao: '01/01/2020', TipoOrdem : Constants.TipoOrdem.COMPRA, Preco : 10, Quantidade:400},
                { Papel : 'ITSA4',  DataPregao: '02/01/2020', TipoOrdem : Constants.TipoOrdem.VENDA, Preco : 11, Quantidade:100},
            ];

            let result = service.calculaLucroRealizado(data);
            expect(100).to.equals(result[0].lucro);

        })
    })

})