import axios, {post} from 'axios';

let instance = null;

export default class NetworkHelper{
  constructor() {
        if(!instance){
            instance = this;
        }

        this.method = "post";
        this.data = {};
        this.domain = "http://www.zapy.tech/";
        this.pathToApi = "projects/bepms-ci/api/";
        this.formData = new FormData();
        this.params = new URLSearchParams(); //used for normal passing of data
        //axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        return instance;
    }

    setApiPath(api){
        this.url = this.domain + this.pathToApi + api;
    }

    setData(key, value){
        //for simple param use this
        this.params.append(key, value);
    }

    setFormData(key,value){
        //for file transfer use this
        this.formData.append(key, value);
    }

    execute(successHandler, errorHandler, networkHandler) {
        axios.post(this.url, this.params)
          .then((response) => {
            console.log(response);
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
            console.log(err);

            if (err instanceof TypeError) {
                if (err.message === 'Network request failed') {
                    console.log('error is network error');
                    networkHandler();
                }
                else {
                errorHandler("Something wentt wrong ");//, err.response.status);
                }
            } else {
                try{
                    if(err.response.status===401){
                        errorHandler("Wrong Credentials");//, err.response.status);
                    }else{
                        errorHandler("Something went wrong");//, err.response.status);
                    }
                } catch {
                    errorHandler(err+' ',);
                }
                
            }          
        });      
    }

    handleError() {

    }

    executeFilePost(successHandler, errorHandler, networkHandler) {
        post(this.url, this.formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
          .then((response) => {
            console.log(response);
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
            console.log(err);

            if (err instanceof TypeError) {
                if (err.message === 'Network request failed') {
                    console.log('error is network error');
                    networkHandler();
                }
                else {
                errorHandler("Something wentt wrong ");//, err.response.status);
                }
            } else {
                try{
                    if(err.response.status===401){
                        errorHandler("Wrong Credentials");//, err.response.status);
                    }else{
                        errorHandler("Something went wrong");//, err.response.status);
                    }
                } catch {
                    errorHandler(err+' ',);
                }
                
            }          
        });      
    }
}

