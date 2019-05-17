import React from 'react'
import { DragSource } from 'react-dnd'
import itemTypes from './itemTypes'

const logoSource = {
  beginDrag(props) {
    return {}
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

function Logo({ connectDragSource, isDragging }) {
  return connectDragSource(
    <div
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontWeight: 'bold',
        cursor: 'move',
        height: '10em',
        width: '20em',
        background: 'green',
      }}
    >
      
    </div>,
  )
}

export default DragSource(itemTypes.LOGO, logoSource, collect)(Logo)