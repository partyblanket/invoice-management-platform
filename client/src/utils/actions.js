import axios from 'axios';

// axios.create({
//   xsrfCookieName: 'mytoken',
//   xsrfHeaderName: 'csrf-token'
// });

// axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

export async function postInvoice(invoiceDets) {
    const { data } = await axios.post('/api/post',invoiceDets)
    console.log(data);
    return {
        type: 'POST_INVOICE',
        data,
    };
}