import React, {useState} from 'react'
// import { Document, Page } from 'react-pdf';
// import { readdirSync } from 'fs';


function Pfd ({doc}) {
  console.log('doc: ', doc);
  
  // const [pdfDetails, setPdfDetails] = useState({numPages: null, pageNumber: 1})
  // console.log(readdirSync(__dirname));
  
  // let {numPages, pageNumber} = pdfDetails

  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setPdfDetails({ numPages, ...pdfDetails });
  // }

  return (
    <div>
      <embed src={doc} width="800px" height="2100px" />
      {/* <Document
        file={doc}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document> */}

    </div>
  )
}

export default Pfd
