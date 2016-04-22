import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'

const Modal = (props) => {
  const actions = [
    <FlatButton
      label="Cancel"
      secondary={true}
      onTouchTap={props.cancel}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onTouchTap={props.submit}
    />,
  ]
  return (
    <div>
      <Dialog
        title={props.title}
        actions={actions}
        modal={true}
        open={props.open}
        onRequestClose={props.cancel}
      >
        {props.text}
      </Dialog>
    </div>
  )
}

Modal.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
  cancel: PropTypes.func,
  submit: PropTypes.func
}

export default Modal
