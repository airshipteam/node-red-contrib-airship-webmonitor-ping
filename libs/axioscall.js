const axios = require('axios');

/**
 * Makes a rest call
 * @param  {[string]} url         [url to call]
 * @param  {[string]} httpMethod  [REST http method]
 * @param  {[json]}   payload     [payload]
 * @return {[promise]}        
 */


function call(url, httpMethod, payload){

return new Promise((resolve, reject) => {
        try {

            axios({
                method: httpMethod,
                url: url,
                responseType: 'json',
                headers: {
                    'content-type': 'application/json' 
                },
                data: payload
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });

        } catch (err) {
            return reject("Error : " + err);
        }
    });
}

module.exports.call = call;