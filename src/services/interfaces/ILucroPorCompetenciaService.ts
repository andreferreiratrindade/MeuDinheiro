import { _modelOutput } from "src/models/_modelsOutput";

export interface ILucroPorCompetenciaService{
    recuperaLucroPorCompetencia(ordens: _modelOutput.OrdemOutputModel[]): _modelOutput.LucroPorCompetenciaOutputModel[];
}