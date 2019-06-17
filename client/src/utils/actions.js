import axios from 'axios';
import { saveAs } from 'file-saver';

export async function postSale(userid, invoiceDets, invoiceid, invoiceTotals) {
    const { data } = await axios.post('/api/saveinvoice',{userid, invoiceDets: {...arrayFromObjectStrings(invoiceDets), invoiceTotals} , invoiceid})
    console.log(data);
    
    if(!data._id) {return {
        type: 'ERROR',
        error: 'failed saving sales details'
    }}

    if(!invoiceid) {
        return {
            type: 'SALE_CREATED',
            data,
            insertedId: data._id,
        };
    }
    
    return {
        type: 'POST_SALEDETS',
        data,
        insertedId: data._id,
    };
}

export async function getInvoice(userid, invoiceid) {
    const { data } = await axios.post('/api/getinvoice',{userid, invoiceid})
    const {_id, ...rest} = data
    console.log(data);
    
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
        company: data.company,
    };
}

export async function login(username, password) {
    const {data} = await axios.post('/api/login',{username, password})
    // console.log(data);
    
    return {
        type: 'LOGIN',
        userid: data._id,
        username: data.username,
        company: data.company,
        error: null,
        salesList: data.saleslist || [],
    };
}

export async function isLoggedIn() {
    const {data} = await axios.get(`/isloggedin`)
           
            return {
                type: 'LOGIN',
                userid: data._id,
                username: data.username,
                company: data.company,
                error: null,
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

export async function setCurrentSale(saleid) {
    //get id
    return {
        type: 'SET_CURRENTSALE',
        saleid
    };
}

export function submitTemplate (template) {
    axios.post('/api/newtemplate',template)
    return {
        type: 'SUBMIT_TEMPLATE',
    };
}

export function printInvoice(userid, invoiceDets, invoiceid = null) {
    axios.post('/api/printinvoicedocx',{userid, invoiceDets, invoiceid})
        .then(resp => {
            return axios.get('/api/fetchinvoice/'+resp.data.file, {responseType: 'blob'})
        })
        .then((res) => {
            const docxBlob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            saveAs(docxBlob, 'generatedDocument.docx')
        })
    
    return {
        type: 'PRINT_FINISHED'
    };
}

// export function printInvoice(userid, invoiceDets, invoiceid = null) {
//     axios.post('/api/printinvoice',{userid, invoiceDets, invoiceid})
//         .then(resp => {
//             return axios.get('/api/fetchinvoice/'+resp.data.file, {responseType: 'blob'})
//         })
//         .then((res) => {
//             const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
//             saveAs(pdfBlob, 'generatedDocument.pdf')
//         })
    
//     return {
//         type: 'PRINT_FINISHED'
//     };
// }

function arrayFromObjectStrings (items) {
    const results = {invoiceLines: []}
    for(const item in items) {
      if(item.includes('line_')){
        const splitItem = item.split('_')
        const index = Number(splitItem[1])-1
        if(!results.invoiceLines[index]){
          results.invoiceLines[index] = {}
        }
        results.invoiceLines[index][splitItem[2]] = items[item]
      }else{
        results[item] = items[item]
      }
    }
    return results
}

