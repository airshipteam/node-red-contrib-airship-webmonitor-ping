const axios = require('axios');

/**
 * Makes a rest call
 * @param  {[string]} url         [url to call]
 * @param  {[string]} httpMethod  [REST http method]
 * @param  {[json]}   payload     [payload]
 * @return {[promise]}        
 */


function call(url, payload){

return new Promise((resolve, reject) => {
        try {
            axios.post(url, {
                id: payload.id,
                token: payload.token,
            },
            {
                headers: {
                'Content-Type': 'application/json'
            }
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err + ", check id and token");
            });

        } catch (err) {
            return reject("Error : " + err);
        }
    });
}

module.exports.call = call;