import React, {useState} from 'react'
import Invoice from './Invoice';
import Pdf from './Pdf';
import INVOICE_DEFAULTS from '../defaults'

function Main() {

  const [invDets, setInvDets] = useState(INVOICE_DEFAULTS)
  const [pdf, setPdf] = useState(null)
  const [view, changeView] = useState(true);

  function editField (e) {
    
  }

  function getPDF (){
    fetch(`/download/44`)
      .then(response => {
        const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          setPdf(url)
      });
    });
  }



  function changeToPDF () {
    changeView(!view)
  }

  function createPDF () {
    const data = {data: 'somedata'}
    fetch(`/download/1`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {
      console.log('Success:', JSON.stringify(response))
      getPDF()
    })
    .catch(error => console.error('Error:', error));
  }

  return (
    <div className='main'>
        {view ? <Invoice details={invDets}/> : <Pdf doc={pdf}/>}
        <button onClick={createPDF}>download</button>
        <button onClick={changeToPDF}>Change view</button>
    </div>
  )
}

export default Main
