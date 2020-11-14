// import electron from "electron";
// import fs from "fs"
// import path from "path";
class ReadWriteFile {
  write(path: string, nomeArquivo: string, data: any): Promise<any> {
    // return new Promise<any>((resolve, reject) => {
    //   var remote = require("electron").remote;
    //   var electronFs = remote.require("fs");
    //   let stram = electronFs.FileReadStream(data.path);
    //   electronFs.FileWriteStream(
    //     "arquivos/" + path + "/" + nomeArquivo,
    //     stram,
    //     (err: any) => {
    //       if (err) {
    //         reject(err);
    //       }
    //     }
    //   );

    // });
    return  new Promise<any>((resolve, reject) => {});
  }

  writeJson(path: string, data: any): Promise<any> {
    // return new Promise<any>((resolve, reject) => {
    //   var remote = electron.remote;
    //   this.getFs().writeFile(
    //     path,
    //     JSON.stringify(data),
    //     (err: any) => {
    //       if (err) throw err;
    //     }
    //   );
    // });
    return  new Promise<any>((resolve, reject) => {});

  }

  readPathJson(path: string): any[] {
    // let dados: any[] = [];
    // let tt = this.getFs();

    // tt.readdir(path, (err: any, files: any[]) => {
    //   files.forEach(file => {

    //     tt.readFile(`${path}/${file}`, (err: any, data: any) => {
    //       if (err) throw err;
    //       dados.push(JSON.parse(data));
    //     });
    //   });
    // });
    // return dados;
    return [];
  }

  readJson(path: string): any {
    // let datajson: any = {};
    // try {
    //   let rawdata = fs.readFileSync(path)
    //   if(!rawdata.length) return datajson
    //   datajson = JSON.parse(rawdata.toString('utf8'));
    // } catch (error) {
    //   console.log(error);
    // }
    
    // return datajson;
   return {};
  }

  // private getFs(): any {
  //   var remote = electron.remote;
  //   return remote.require("fs");
  // }
}

export default new ReadWriteFile();
