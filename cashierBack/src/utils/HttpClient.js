//
import axios from 'axios'
import router from '../router/index'



const LOCAL_SERVER = 'http://localhost:3000/';

const DEV_SERVER = '';
const PRO_SERVER = 'http://www.dk-lan.com/cloudapi/';

function getUrl(path) {
    if (path.startsWith('http')) {
        return path;
    }
    return `${LOCAL_SERVER}${path}`;
}

const errorHandler = (err) => {
    if(err.response && err.response.status == 401 && JSON.parse(err.response.text).msg == 'unauthorized'){
        router.push({name: 'login'})
        return false;
    }
    var str = err.response.status
    str += ' - '
    str += err.response.statusText
    str += '<br/>请求路径：<br/>'
    str += err.response.error.url
    $.alert(str, '请求错误');
}

const HttpClient = {
    get: (path, query) => new Promise((resolve, reject) => {
        // if(!window.localStorage.getItem('access_token')){
        //     router.push({name: 'login'});
        //     return false;
        // }
        // $('.dk-spinner.dk-spinner-three-bounce, dk-spinner-mask').parent('div').show()
        axios
            .get(getUrl(path))
            .query(query)
            // .set('Authorization',  window.localStorage.getItem('access_token'))
            .end((err, res) => {
                // $('.dk-spinner.dk-spinner-three-bounce, dk-spinner-mask').parent('div').hide()
                if (err) {
                    console.log(111);
                    // errorHandler(err)
                    // reject(err);
                } else {
                    resolve(res.body);
                }
            });
    }),

    post: (path,query) => new Promise((resolve, reject) => {
        if(path.indexOf('login/index') < 0 && !window.localStorage.getItem('access_token')){
            router.push({name: 'login'});
            return false;            
        }        
        // $('.dk-spinner.dk-spinner-three-bounce, dk-spinner-mask').parent('div').show()
        axios
            .post(getUrl(path))
            .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            // .set('Authorization',  window.localStorage.getItem('access_token'))
            .query(query)
            .send(query)
            .end((err, res) => {
                // $('.dk-spinner.dk-spinner-three-bounce, dk-spinner-mask').parent('div').hide()
                if (err) {
                    errorHandler(err)
                    reject(err);
                } else {
                    if(path.indexOf('login/index') > -1){
                        window.localStorage.setItem('access_token', res.body.token_type + ' ' + res.body.access_token)
                    }
                    resolve(res);
                }
            });
    }),

    put: (path, query, payload) => new Promise((resolve, reject) => {
        axios
            .put(getUrl(path))
            .query(query)
            .send(payload)
            .end((err, res) => {
                if (err) {
                    errorHandler(err)
                    reject(err);
                } else {
                    resolve(res.body);
                }
            });
    }),

    delete: (path, query) => new Promise((resolve, reject) => {
        axios
            .del(getUrl(path))
            .query(query)
            .end((err, res) => {
                if (err) {
                    errorHandler(err)
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    })
};

export default HttpClient;
