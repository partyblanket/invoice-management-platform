import axios from 'axios';

// axios.create({
//   xsrfCookieName: 'mytoken',
//   xsrfHeaderName: 'csrf-token'
// });

// axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

export async function postInvoice(userid, invoiceDets, invoiceid = null) {
    const { data } = await axios.post('/api/saveinvoice',{userid, invoiceDets, invoiceid})
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
    return {
        type: 'LOGIN',
        _id: data.insertedId,
        email: data.ops[0].email,
        error: null,
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

