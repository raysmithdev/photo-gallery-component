import React, { Component, PropTypes } from 'react'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import FontIcon from 'material-ui/lib/font-icon'
import Colors from 'material-ui/lib/styles/colors'
import Checkbox from 'material-ui/lib/checkbox'
import Sortable from 'react-sortablejs'

// Components
import Modal from './Modal.jsx'

const styles = {
  deleteIcon: {
    cursor: 'pointer'
  },
}

const renderContent = (props) => {
  if(props.editable) {
    return props.photos.map((photo, index) => {
      return (
        <GridTile
          key={index}
          data-id={index}
          titleBackground={'#ccc'}
          title={
            <FontIcon
              className="material-icons"
              style={styles.deleteIcon}
              onClick={props.handleDelete.bind(this, photo.id)}
              color={Colors.red800}
            >
              delete
            </FontIcon>
          }
          actionIcon={
            <Checkbox
              label="Check"
              checked={photo.checked}
              onCheck={props.checkItem.bind(this, index, photo.checked)} />
          }>
            <a href={photo.userImageURL} target="_blank">
              <img src={photo.userImageURL} />
            </a>
        </GridTile>
      )})
  } else {
      return props.photos.map((photo,index) => {
        return (
          <GridTile
              data-id={index}
              key={index}
              titleBackground={'#ccc'}
           >
            <a href={photo.userImageURL} target="_blank">
            <img src={photo.userImageURL} />
            </a>
          </GridTile>
        )
      })
  }
}

const PhotoGallery = (props) => {
  return (
    <div>
      <Sortable
          onChange={(order, sortable) => { props.onChange(order) }}
          className="container"
      >
        {renderContent(props)}
      </Sortable>
      <Modal
        title={'Confirmation of deleting an item.'}
        text={'Are you sure you wish to delete this photo?'}
        submit={props.deleteItem}
        cancel={props.handleModalClose}
        open={props.modalOpen}
      />
    </div>
  )
}

PhotoGallery.propTypes = {
  photos: PropTypes.array,
  onChange: PropTypes.func,
  editable: PropTypes.bool,
  modalOpen: PropTypes.bool,
  handleModalClose: PropTypes.func
}

export default PhotoGallery
