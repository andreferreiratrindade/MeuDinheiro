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
import { IPapelFavoritoService } from "src/services/interfaces/IPapelFavoritoService";
import { PapelFavoritoService } from "src/services/PapelFavoritoService";
import { IUsuarioRepository } from "src/repository/interfaces/IUsuarioRepository";
import { UsuarioRepository } from "src/repository/UsuarioRepository";
import { IUsuarioService } from "src/services/interfaces/IUsuarioService";
import { UsuarioService } from "src/services/UsuarioService";
import { IAuthService } from "src/services/interfaces/IAuthService";
import { AuthService } from "src/services/AuthService";
import { INotaCorretagemRepository } from "src/repository/interfaces/INotaCorretagemRepository";
import { NotaCorretagemRepository } from "src/repository/NotaCorretagemRepository";
import { IPapelFavoritoRepository } from "src/repository/interfaces/IPapelFavoritoRepository";
import { PapelFavoritoRepository } from "src/repository/PapelFavoritoRepository";

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
  .bind<IUsuarioRepository>(TYPES.UsuarioRepository)
  .to(UsuarioRepository);

  myContainer
  .bind<IUsuarioService>(TYPES.UsuarioService)
  .to(UsuarioService);

  myContainer
  .bind<IAuthService>(TYPES.AuthService)
  .to(AuthService);

  myContainer
  .bind<INotaCorretagemRepository>(TYPES.NotaCorretagemRepository)
  .to(NotaCorretagemRepository);

  myContainer
  .bind<IPapelFavoritoRepository>(TYPES.PapelFavoritoRepository)
  .to(PapelFavoritoRepository);

  myContainer
  .bind<IPapelFavoritoService>(TYPES.PapelFavoritoService)
  .to(PapelFavoritoService);
  
export default { myContainer };
