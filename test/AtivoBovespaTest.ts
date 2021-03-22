import {describe} from 'mocha';
import {expect} from 'chai';
import {AtivoBovespaService} from '../src/services/AtivoBovespaService'
import {_modelOutput} from 'src/models/_modelsOutput'

describe('Ativo Bovespa Service', () => {

    describe('Recupera cotações por Papel', ()=>{
        it('Recupera cotação por papel - ABEV3',()=>{
           const service = new  AtivoBovespaService();
            let data : string = "abev3";

           return service.recuperaDetalhesPapel(data).then((result)=>{
                console.log(data)

                expect(result.cotacaoAtual > 1).to.equals(true);
           });
        })
    })
})