import { _helperModel } from "src/helpers/_helperModel";
import { _model } from "src/models/_models";

export interface IPapelFavoritoService{
    recuperaPapeisFavoritos(): Promise< _model.AtivoDetalhesModel[]>;

    adicionarPapelFavorito(papelFavorito: _model.PapelFavorito): Promise<_helperModel.Notify>
    
}