import axios from 'axios'

/**
 * 
 * @param {String} method Request Method GET, POST, PUT, DELETE, etc default os GET.
 * @param {String} url URL to request on.
 * @param {Object} body Body is use to set data to be send in request.
 * @returns {Promise} return a Promis of the responce
 */

// PLINTO_URL = https://goplinto-website-service-dev-apim.azure-api.net?r=

// PLINTO_KEY = ac6522e1b1e545b690e08d4d27aaf348

const fetcher = (method, url, body = {}) => (new Promise((resolve, reject) => {
    axios({
        method,
        url: `${process.env.NEXT_PUBLIC_PLINTO_URL}${url}`,
        data: body,
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY
        }
    }).then(function (res) {
        if (process.env.NODE_ENV == 'development') {
            // console.log(res);
        }
        resolve(res)
    }).catch(function (error) {
        if (process.env.NODE_ENV == 'development') {
            console.log(error);
            console.error(error);
        }
        reject(error)
    });
}));






// const fetcher = (method, url, body = {}) => (new Promise((resolve, reject) => {

//     try {
//         const res = await axios({
//             method,
//             url: `${process.env.NEXT_PUBLIC_PLINTO_URL}${url}`,
//             body,
//             headers: {
//                 'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY
//             }
//         });
//         // console.log(res, 'FROM FETCHER');
//         return resolve(res);
//     } catch (error) {
//         console.error(error);
//         return reject(error)
//     }
// }));
// const fetcher = (method, url, body = {}) => (new Promise(async (resolve, reject) => {
//     try {
//         const res = await axios({
//             method,
//             url: `${process.env.NEXT_PUBLIC_LOCAL_URL}${url}`,
//             body,
//         });
//         const data = res.data;
//         resolve(data);
//     } catch (error) {
//         console.error(error);
//         reject(error)
//     }
// }));

export default fetcher;