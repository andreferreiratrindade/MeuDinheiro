import { inject, injectable } from "inversify";
import { TYPES } from "src/config/types";
import NotifyHelpter from "src/helpers/NotifyHelpter";
import { _modelOutput } from "src/models/_modelsOutput";
import { IAtivoBovespaService } from "./interfaces/IAtivoBovespaService";
import { IPapelFavoritoRepository } from "src/repository/interfaces/IPapelFavoritoRepository";
import { _helperModel } from "src/helpers/_helperModel";
import { IPapelFavoritoService } from "./interfaces/IPapelFavoritoService";
import { IAuthService } from './interfaces/IAuthService'
import { _modelInput } from "src/models/_modelsInput";

@injectable()
class PapelFavoritoService implements IPapelFavoritoService {
  private _ativoBovespaService: IAtivoBovespaService;
  private _papelFavoritoRepository: IPapelFavoritoRepository;
  private _authService: IAuthService
  constructor(@inject(TYPES.AtivoBovespaService) _ativoBovespaService: IAtivoBovespaService,
    @inject(TYPES.PapelFavoritoRepository) papelFavoritoRepository: IPapelFavoritoRepository,
    @inject(TYPES.AuthService) authService: IAuthService
  ) {
    this._ativoBovespaService = _ativoBovespaService;
    this._papelFavoritoRepository = papelFavoritoRepository;
    this._authService = authService;
  }
  public recuperaPapeisFavoritos(): Promise<_modelOutput.AtivoDetalhesOutputModel[]> {
    let filter: any = {
      comparacao: this._authService.recuperaUsuarioLogado().uid,
      elemento: "usuarioId",
      tipoComparacao: "=="
    }

    return new Promise<_modelOutput.AtivoDetalhesOutputModel[]>((result, rejects) => {
      this._papelFavoritoRepository.find(filter).then(papeisTemp => {

        let acoesMonitoradas: _modelOutput.AtivoDetalhesOutputModel[] = papeisTemp.map(y => {
          return {
            papel: y.papel,
            razaoSocial: "",
            cotacaoAtual: 0,
            percentual: 0,
            loading: false
          }
        });

        result(acoesMonitoradas);
      }).catch(err => { rejects(err) });
    });


    //   let promises: any[] = [];
    //   acoesTmp.forEach(element => {
    //     promises.push(
    //       this._ativoBovespaService
    //         .recuperaDetalhesPapel(element.papel)
    //         .then(result => {
    //           return result;
    //         })
    //         .catch(reject => {
    //           throw reject;
    //         })
    //     );
    //   });

    //   result(Promise.all(promises)
    //     .then((promiseAllResult) => {
    //       return promiseAllResult
    //     })
    //     .catch(reject => {
    //       throw reject;
    //     })
    //   );
    // })
  }

  public adicionarPapelFavorito(papelFavorito: _modelInput.PapelFavoritoInputModel): Promise<_helperModel.Notify> {

    papelFavorito.papel = papelFavorito.papel.toUpperCase();
    papelFavorito.usuarioId = this._authService.recuperaUsuarioLogado().uid;

    return new Promise<_helperModel.Notify>((res, rej) => {
      this._papelFavoritoRepository.add(papelFavorito).then(result => {
        res(NotifyHelpter.sucesso())
      }).catch(err => { rej(NotifyHelpter.erro(err)) });
    });
  }
}

export { PapelFavoritoService };
