import { _helperModel } from "src/helpers/_helperModel";
import { _modelOutput } from "src/models/_modelsOutput";
import {_modelInput} from "src/models/_modelsInput";
export interface IPapelFavoritoService{
    recuperaPapeisFavoritos(): Promise< _modelOutput.AtivoDetalhesOutputModel[]>;

    adicionarPapelFavorito(papelFavorito: _modelInput.PapelFavoritoInputModel): Promise<_helperModel.Notify>
    
}