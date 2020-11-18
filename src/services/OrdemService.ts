import readJson from "./ReadWriteFile";
import { Constants } from "../constants/constants";
import { IOrdemService } from "./interfaces/IOrdemService";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { _modelOutput } from "src/models/_modelsOutput";
import { _modelInput } from "src/models/_modelsInput";
import { IOrdemRepository } from "src/repository/interfaces/IOrdemRepository";
import { TYPES } from "src/config/types";
import { IAuthService } from "./interfaces/IAuthService";

@injectable()
class OrdemService implements IOrdemService {

 private _OrdemRepository : IOrdemRepository;
 private _authService: IAuthService;

  constructor(@inject(TYPES.OrdemRepository ) Ordem: IOrdemRepository,
  @inject(TYPES.AuthService) authService: IAuthService
  ) {
    
    this._OrdemRepository = Ordem;
    this._authService = authService;
  }

  public adicionarOrdem(ordem:_modelInput.OrdemInputModel):Promise<any>{
    ordem.usuarioId = this._authService.recuperaUsuarioLogado().uid
    return this._OrdemRepository.add(ordem);
  }

  public  recuperaNotasCorretagens(): Promise<_modelOutput.OrdemOutputModel[]> {

    return  this._OrdemRepository.recuperaNotasCorretagens(this._authService.recuperaUsuarioLogado().uid);
  }
}

export { OrdemService };
