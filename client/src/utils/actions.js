import axios from 'axios';
import { saveAs } from 'file-saver';

// axios.create({
//   xsrfCookieName: 'mytoken',
//   xsrfHeaderName: 'csrf-token'
// });

// axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

export async function postInvoice(userid, invoiceDets, invoiceid = null, nextSale, invoiceTotals) {
    const { data } = await axios.post('/api/saveinvoice',{userid, invoiceDets: {...invoiceDets, invoiceTotals} , invoiceid, nextSale,invoiceTotals})
    const {_id, ...rest} = data
    
    return {
        type: 'POST_SALEDETS',
        rest,
        insertedId: _id,
    };
}

export async function getInvoice(userid, invoiceid) {
    const { data } = await axios.post('/api/getinvoice',{userid, invoiceid})
    const {_id, ...rest} = data
    return {
        type: 'GET_SALEDETS',
        insertedId: _id,
        rest,
    };
}

export async function register(username, password, company) {
    const { data } = await axios.post('/api/register',{ username, password, company})    
    console.log(data);
    
    return {
        type: 'REGISTER',
        userid: data._id,
        username: data.username,
        error: null,
        nextSale: data.nextSale,
        company: data.company,
        salesIdArray: data.salesIdArray,
    };
}

export async function login(username, password) {
    const {data} = await axios.post('/api/login',{username, password})
    console.log(data);
    
    return {
        type: 'LOGIN',
        userid: data._id,
        username: data.username,
        company: data.company,
        error: null,
        nextSale: data.nextSale,
        salesIdArray: data.salesIdArray || [],
        salesList: data.saleslist || [],
    };
}

export async function isLoggedIn() {
    const {data} = await axios.get(`/isloggedin`)
            console.log(data);
            
            return {
                type: 'LOGIN',
                userid: data._id,
                username: data.username,
                company: data.company,
                error: null,
                nextSale: data.nextSale,
                salesIdArray: data.salesIdArray || [],
                salesList: data.saleslist || [],
            };


}

export async function getSalesList() {
    return axios
        .get(`/api/saleslist`)
        .then(({ data }) => {
            return {
                type: 'GET_SALES_LIST',
                sales: {...data}
            }
            
        })
        .catch(err => console.log(err));

}

export function toggleSettings() {
    return {
        type: 'TOGGLE_SETTINGS',
    };
}

export function toggleSidebar() {
    return {
        type: 'TOGGLE_SIDEBAR',
    };
}

export async function saveSettings(userid, data) {
    const response = await axios.post('/api/updatesettings',{userid, data})
    if(response.data.success) {
        return {
            type: 'SET_SETTINGS',
            ...data
        };
    }else{
        console.log('set settings error');   
    }
}

export function setCurrentSale(saleid) {
    return {
        type: 'SET_CURRENTSALE',
        saleid
    };
}

export function printInvoice(userid, invoiceDets, invoiceid = null) {
    axios.post('/api/printinvoice',{userid, invoiceDets, invoiceid})
        .then(resp => {
            return axios.get('/api/fetchinvoice/'+resp.data.file, {responseType: 'blob'})
        })
        .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'generatedDocument.pdf')
        })
    
    return {
        type: 'PRINT_FINISHED'
    };
}