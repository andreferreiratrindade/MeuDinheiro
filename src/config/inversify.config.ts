import { Container } from "inversify";
import { TYPES } from "./types";
import { CalculoService } from "src/services/CalculoService";
import { ICalculoService } from "src/services/interfaces/ICalculoService";
import { NotaCorretagemService } from "src/services/NotaCorretagemService";
import { INotaCorretagemService } from "src/services/interfaces/INotaCorretagemService";
import { IAtivoBovespaService } from "src/services/interfaces/IAtivoBovespaService";
import { AtivoBovespaService } from "src/services/AtivoBovespaService";
import { IPosicaoAtualService } from "src/services/interfaces/IPosicaoAtualService";
import { PosicaoAtualService } from "src/services/PosicaoAtualService";
import { IAcaoMonitoradaService } from "src/services/interfaces/IAcaoMonitoradaService";
import { AcaoMonitoradaService } from "src/services/AcaoMonitoradaService";
import { IUsuarioRepository } from "src/repository/interfaces/IUsuarioRepository";
import { UsuarioRepository } from "src/repository/UsuarioRepository";
import { IUsuarioService } from "src/services/interfaces/IUsuarioService";
import { UsuarioService } from "src/services/UsuarioService";
import { IAuthService } from "src/services/interfaces/IAuthService";
import { AuthService } from "src/services/AuthService";

const myContainer = new Container();
myContainer.bind<ICalculoService>(TYPES.CalculadoraService).to(CalculoService);

myContainer
  .bind<INotaCorretagemService>(TYPES.NotaCorretagemService)
  .to(NotaCorretagemService);

myContainer
  .bind<IAtivoBovespaService>(TYPES.AtivoBovespaService)
  .to(AtivoBovespaService);

  myContainer
  .bind<IPosicaoAtualService>(TYPES.PosicaoAtualService)
  .to(PosicaoAtualService);
  
  myContainer
  .bind<IAcaoMonitoradaService>(TYPES.AcaoMonitoradaService)
  .to(AcaoMonitoradaService);

  myContainer
  .bind<IUsuarioRepository>(TYPES.UsuarioRepository)
  .to(UsuarioRepository);

  myContainer
  .bind<IUsuarioService>(TYPES.UsuarioService)
  .to(UsuarioService);

  myContainer
  .bind<IAuthService>(TYPES.AuthService)
  .to(AuthService);

export default { myContainer };
