import React from 'react'

function Dropdown({items, click}) {

  const contents = items.map(el => (
    <li key={el._id} id={el._id}>{el.title} ({el.templateType})</li>
    ))

  return (

    <ul className='dropdown-content'>
      {contents}
    </ul>
  )
}

export default Dropdown
