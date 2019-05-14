import axios from 'axios';

// axios.create({
//   xsrfCookieName: 'mytoken',
//   xsrfHeaderName: 'csrf-token'
// });

// axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

export async function postInvoice(invoiceDets) {
    const { data } = await axios.post('/api/',invoiceDets)
    return {
        type: 'POST_INVOICE',
        data,
    };
}

export async function register(email, password, company) {
    const { data } = await axios.post('/api/register',{ email, password, company})    
    return {
        type: 'LOGIN',
        id: data.insertedId,
        email: data.ops[0].email,
        error: null,
    };
}

export async function login(email, password) {
    const { data } = await axios.post('/api/login',{email, password})
    console.log(data);

    return {
        type: 'LOGIN',
        id: data._id,
        email: data.email,
        error: data.status || null,
    };
}