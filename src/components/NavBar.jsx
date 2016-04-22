import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/lib/raised-button'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import Checkbox from 'material-ui/lib/checkbox'

// Components
import Modal from './Modal.jsx'

const NavBar = (props) => {
  return (
     <div>
       <Toolbar>
         <ToolbarGroup float="left">
           <Checkbox
             label="Read only"
             onCheck={props.onCheck}
             checked={props.checked}
           />
         </ToolbarGroup>
         <ToolbarGroup float="right">
           <RaisedButton
             label="Reorder images"
             onClick={props.reverseGalleryOrder}
            />
            <RaisedButton
              label="Delete images"
              onClick={props.handleDeleteItems}
             />
         </ToolbarGroup>
       </Toolbar>
       <Modal
         open={props.modalOpen}
         title={'Delete items confirmation'}
         text={'Are you sure you want to delete these images?'}
         submit={props.deleteItems}
         cancel={props.handleModalClose}
        />
     </div>
  )
}

NavBar.propTypes = {
  onCheck: PropTypes.func,
  checked: PropTypes.bool,
  handleDeleteItems: PropTypes.func,
  handleModalClose: PropTypes.func,
  reverseGalleryOrder: PropTypes.func
}

export default NavBar
