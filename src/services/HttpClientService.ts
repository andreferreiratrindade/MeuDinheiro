import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { IHttpClient } from "./interfaces/IHttpClient";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";

export class HttpClient implements IHttpClient {
  get<T>(parameters: IHttpClientRequestParameters<T>): Promise<any> {
    return new Promise<T>((resolve, reject) => {
      // extract the individual parameters
      const { url, requiresToken } = parameters;
      
      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        method: "get",
        
        headers: { 
          'Access-Control-Allow-Origin': '*',
          'Origin':"*",
          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        }
      };

      // finally execute the GET request with axios:
      axios
        .get(url)
        .then((response: any) => {
          resolve(response);
        })
        .catch((response: any) => {

          reject(response);
        });
    });
  }

  

  post<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url, payload, requiresToken } = parameters;

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods": "GET",
          "Content-Security-Policy": "*"
        }
      };

      // if API endpoint requires a token, we'll need to add a way to add this.
      //   if (requiresToken) {
      //     const token = this.getToken()
      //     options.headers.RequestVerificationToken = token
      //   }

      // finally execute the GET request with axios:
      axios
        .post(url, payload, options)
        .then((response: any) => {
          resolve(response.data as T);
        })
        .catch((response: any) => {
          reject(response);
        });
    });
  }
}

export const httpClient = new HttpClient();
