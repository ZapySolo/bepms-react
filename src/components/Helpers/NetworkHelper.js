import axios from 'axios';

let instance = null;

export default class NetworkHelper{
  constructor() {
        if(!instance){
            instance = this;
        }

        this.url = "";
        this.method = "post";
        this.data = {};
        this.contentType = "application/json";
        this.header = {};
        this.domain = "localhost";
        this.pathToApi = "/bepms/api/";
        return instance;
    }

    setApiPath(api){
        this.url = this.domain + this.pathToApi + api;
    }
    setMethod(method){
        this.method = method;
    }
    setData(data){
        this.data = data;
    }
    setContentType(contentType){
        this.contentType = contentType;
    }
    setHeaderAutohrization(authorizationToken){
        this.header['Authorization'] = authorizationToken;
    }

    execute(successHandler, errorHandler, networkHandler) {
        var requestParam;
        if(this.method.toLowerCase() === "get"){
            requestParam = {
                method : this.method
            };
        } else {
            requestParam = {
                body: this.data
            };
        }
        
        axios.post(this.url, requestParam.body, this.header)
          .then((response) => {

            var status = response.status.toString();

            switch (status) {
            case '200':
                if(response._bodyText !== ""){
                    successHandler(response);
                } else {
                  successHandler({});
                }
                break;
            case '204':
              successHandler({});
                break;
              case '404':
              case '403':
              case '401':
                  errorHandler("Unauthorized Access, Seems like your authentication has expired", 401);
                  break;
              case '400':
                  errorHandler("Unauthorized Access", 401);
                  break;
              default:
                  errorHandler("Wrong Credentials", 401);
             }
          }
        )
        .catch(function(err) {
            console.log('catch executed in network base class and error is '+err);
            if (err instanceof TypeError) {
                if (err.message === 'Network request failed') {
                    console.log('error is network error');
                    networkHandler();
                }
                else {
                errorHandler("Something went wrong", err.response.status);
                }
            } else {
                if(err.response.status===401){
                    errorHandler("Wrong Credentials", err.response.status);
                }else{
                    errorHandler("Something went wrong", err.response.status);
                }
            }          
        });      
    }

    handleError() {

    }
}

