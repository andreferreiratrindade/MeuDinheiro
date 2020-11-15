import {describe} from 'mocha';
import {expect} from 'chai';
import {AtivoBovespaService} from '../src/services/AtivoBovespaService'
import {_model} from 'src/models/_models'

describe('Ativo Bovespa Service', () => {

    describe('Recupera cotações por Papel', ()=>{
        it('Recupera cotação por papel - ABEV3',()=>{
           const service = new  AtivoBovespaService();
            let data : string = "abev3";

           return service.recuperaDetalhesPapel(data).then((result)=>{
                expect(result.CotacaoAtual > 1).to.equals(true);
           });
        })
    })
})