// import React, {useState} from 'react'
import ContentEditable from 'react-contenteditable'


// function InvoiceItem({val, className}) {

//   const [content, setContent] = useState(val)

//   const contentEditable = React.createRef();

//   const handleChange = evt => {
//     const cont = evt.target.value
//     setContent(cont);
//   };

//   return (

//     <ContentEditable
//     className={className}
//     innerRef={contentEditable}
//     html={content} // innerHTML of the editable div
//     disabled={false}       // use true to disable editing
//     onChange={handleChange} // handle innerHTML change
//     tagName='div' // Use a custom HTML tag (uses a div by default)
//   />
//   )
// }

import React, { Component } from 'react'

class InvoiceItem extends Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef();
    this.state = {val: this.props.val};
  };
 
  handleChange = evt => {
    this.setState({val: evt.target.value});
  };

  pasteAsPlainText = event => {
    event.preventDefault()
  
    const text = event.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  disableNewlines = event => {
    const keyCode = event.keyCode || event.which
  
    if (keyCode === 13) {
      event.returnValue = false
      if (event.preventDefault) event.preventDefault()
    }
  }

  highlightAll = () => {
    setTimeout(() => {
      document.execCommand('selectAll', false, null)
    }, 0)
  }

  render = () => {
    return <ContentEditable
              className = {this.props.className}
              innerRef={this.contentEditable}
              html={this.state.val} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={this.handleChange} // handle innerHTML change
              tagName='div' // Use a custom HTML tag (uses a div by default)
              onPaste={this.pasteAsPlainText}
              onKeyPress={this.disableNewlines}
              onFocus={this.highlightAll}
            />
  };
}



export default InvoiceItem

//https://www.taniarascia.com/content-editable-elements-in-javascript-react/