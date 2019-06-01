import axios from 'axios';
import { saveAs } from 'file-saver';

// axios.create({
//   xsrfCookieName: 'mytoken',
//   xsrfHeaderName: 'csrf-token'
// });

// axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

export async function postInvoice(userid, invoiceDets, invoiceid = null, nextSale) {
    const { data } = await axios.post('/api/saveinvoice',{userid, invoiceDets, invoiceid, nextSale})
    const {insertedId, ...rest} = data
    
    return {
        type: 'SALEDETS',
        rest,
        insertedId,
    };
}

export async function getInvoice(userid, invoiceid) {
    const { data } = await axios.post('/api/getinvoice',{userid, invoiceid})
    const {_id, ...rest} = data
    return {
        type: 'SALEDETS',
        insertedId: _id,
        rest,
    };
}

export async function register(email, password, company) {
    const { data } = await axios.post('/api/register',{ email, password, company})    
    console.log(data);
    
    return {
        type: 'LOGIN',
        _id: data.id,
        email: data.email,
        error: null,
        nextSale: data.nextSale
    };
}

export async function login(email, password) {
    const { data } = await axios.post('/api/login',{email, password})
    return {
        type: 'LOGIN',
        ...data
    };
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
    console.log(data);
    
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