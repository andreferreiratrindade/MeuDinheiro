import {describe} from 'mocha';
import {expect} from 'chai';
import {CalculoService} from '../src/services/CalculoService'
import {_model} from 'src/models/_models'
import {Constants} from '../src/constants/constants'
import { from } from "linq-to-typescript"


describe('CalculoService', () => {


    describe('Posição Atual Carteira', ()=>{

        
        it('Apenas valores de compra',()=>{

           const service = new  CalculoService();

           let data : any[] = [
                { Titulo : 'ITSA4',  DataPregao: '01/01/2020', CV : Constants.CV.COMPRA, PrecoAjuste : 10, Quantidade:100},
                { Titulo : 'ITSA4',  DataPregao: '02/01/2020', CV : Constants.CV.COMPRA, PrecoAjuste : 11, Quantidade:100},
                { Titulo : 'ITSA4',  DataPregao: '03/01/2020', CV : Constants.CV.COMPRA, PrecoAjuste : 12, Quantidade:100},
                { Titulo : 'ITSA4',  DataPregao: '04/01/2020', CV : Constants.CV.COMPRA, PrecoAjuste : 13, Quantidade:100},
            ];

           let result = service.recuperaPosicaoAtualCarteira(data);
           expect(result.length).to.equals(1);
           expect(from(result).sum(y=>y.PrecoMedio)).to.equals(11.5);
           expect(from(result).sum(y=>y.ValorTotal)).to.equals(4600);
        })

        it('Apenas valores de venda',()=>{

            const service = new  CalculoService();
 
            let data : any[] = [
                 { Titulo : 'ITSA4',  DataPregao: '01/01/2020', CV : Constants.CV.VENDA, PrecoAjuste : 13, Quantidade:100},
                 { Titulo : 'ITSA4',  DataPregao: '02/01/2020', CV : Constants.CV.VENDA, PrecoAjuste : 12, Quantidade:100},
                 { Titulo : 'ITSA4',  DataPregao: '03/01/2020', CV : Constants.CV.VENDA, PrecoAjuste : 11, Quantidade:100},
             ];
 
            let result = service.recuperaPosicaoAtualCarteira(data);
            expect(1).to.equals(result.length);
            expect(12).to.equals(from(result).sum(y=>y.PrecoMedio));
            expect(3600).to.equals(from(result).sum(y=>y.ValorTotal));
         })

         it('Valores de compra e depois venda',()=>{

            const service = new  CalculoService();
 
            let data : any[] = [
                 { Titulo : 'ITSA4',  DataPregao: '01/01/2020', CV : Constants.CV.COMPRA, PrecoAjuste : 10, Quantidade:100},
                 { Titulo : 'ITSA4',  DataPregao: '02/01/2020', CV : Constants.CV.COMPRA, PrecoAjuste : 11, Quantidade:100},
                 { Titulo : 'ITSA4',  DataPregao: '03/01/2020', CV : Constants.CV.COMPRA, PrecoAjuste : 12, Quantidade:100},
                 { Titulo : 'ITSA4',  DataPregao: '04/01/2020', CV : Constants.CV.VENDA, PrecoAjuste : 13, Quantidade:100},
                 { Titulo : 'ITSA4',  DataPregao: '05/01/2020', CV : Constants.CV.VENDA, PrecoAjuste : 14, Quantidade:100},
             ];
 
            let result = service.recuperaPosicaoAtualCarteira(data);
            expect(1).to.equals(result.length);
            expect(6).to.equals(from(result).sum(y=>y.PrecoMedio));
            expect(600).to.equals(from(result).sum(y=>y.ValorTotal));
         })
    })

    
    describe('Lucro Realizado', ()=>{

        
        it('Lucro Realizado Compra e Venda',()=>{
            const service = new  CalculoService();

            let data : any[] = [
                { Titulo : 'ITSA4',  DataPregao: '01/01/2020', CV : Constants.CV.COMPRA, PrecoAjuste : 10, Quantidade:100},
                { Titulo : 'ITSA4',  DataPregao: '02/01/2020', CV : Constants.CV.VENDA, PrecoAjuste : 11, Quantidade:100},
            ];

            let result = service.calculaLucroRealizado(data);
            expect(100).to.equals(result[0].Lucro);

        })

        it('Lucro Realizado Compra, venda e compra novamente',()=>{
            const service = new  CalculoService();

            let data : any[] = [
                { Titulo : 'ITSA4',  DataPregao: '01/01/2020', CV : Constants.CV.COMPRA, PrecoAjuste : 10, Quantidade:100},
                { Titulo : 'ITSA4',  DataPregao: '02/01/2020', CV : Constants.CV.VENDA, PrecoAjuste : 11, Quantidade:100},
                { Titulo : 'ITSA4',  DataPregao: '03/01/2020', CV : Constants.CV.COMPRA, PrecoAjuste : 12, Quantidade:100},
            ];

            let result = service.calculaLucroRealizado(data);
            expect(100).to.equals(result[0].Lucro);

        })

        it('Lucro Realizado Realização negativa',()=>{
            const service = new  CalculoService();

            let data : any[] = [
                { Titulo : 'ITSA4',  DataPregao: '01/01/2020', CV : Constants.CV.COMPRA, PrecoAjuste : 10, Quantidade:100},
                { Titulo : 'ITSA4',  DataPregao: '02/01/2020', CV : Constants.CV.VENDA, PrecoAjuste : 11, Quantidade:100},
                { Titulo : 'ITSA4',  DataPregao: '03/01/2020', CV : Constants.CV.COMPRA, PrecoAjuste : 12, Quantidade:100},
                { Titulo : 'ITSA4',  DataPregao: '04/01/2020', CV : Constants.CV.VENDA, PrecoAjuste : 9, Quantidade:100},
                { Titulo : 'ITSA4',  DataPregao: '05/01/2020', CV : Constants.CV.COMPRA, PrecoAjuste : 10, Quantidade:100},
            ];

            let result = service.calculaLucroRealizado(data);
            expect(-200).to.equals(result[0].Lucro);

        })

        it('Lucro Realizado Realização Parcial',()=>{
            const service = new  CalculoService();

            let data : any[] = [
                { Titulo : 'ITSA4',  DataPregao: '01/01/2020', CV : Constants.CV.COMPRA, PrecoAjuste : 10, Quantidade:400},
                { Titulo : 'ITSA4',  DataPregao: '02/01/2020', CV : Constants.CV.VENDA, PrecoAjuste : 11, Quantidade:100},
            ];

            let result = service.calculaLucroRealizado(data);
            expect(100).to.equals(result[0].Lucro);

        })
    })

})