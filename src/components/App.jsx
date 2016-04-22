import React, { Component } from 'react'
import $ from 'jquery'
import Snackbar from 'material-ui/lib/snackbar'


// Components
import PhotoGallery from './PhotoGallery.jsx'
import NavBar from './NavBar.jsx'

export default class App extends Component {
 constructor() {
   super()
   this.state = {
     photos: [],
     editable: true,
     deleteItemModalOpen: false,
     deleteItemsModalOpen: false,
     showAlert: false,
     alertMessage: '',
     deleteItemId: 0
   }
 }

 componentDidMount() {
   $.ajax({
     url:'https://pixabay.com/api/?key=2413754-c74e1a137dd08e0804625304c&q=yellow+flowers&image_type=photo',
     dataType: 'json',
     cache: false,
     success: (response) => {
       let photos =  response.hits
       photos.filter((photo) => {
         photo.checked = false
       })
       this.setState({ photos })
     },
     error: (xhr, status, err) => {
       console.log(err)
     }
   })
 }

 checkItem(index, checked) {
  let photos = this.state.photos

  let photo = Object.assign({}, photos[index], {
    checked: !checked
  })

  photos[index] = photo

  this.setState({ photos })
 }

 handleDelete(deleteItemId) {
   this.setState({ deleteItemId })
   this.openModal('deleteItem')
 }

 deleteItem() {
    let photos = this.state.photos.filter((photo) => {
      return this.state.deleteItemId !== photo.id
    })

    this.showAlert('Image has been deleted')

    this.setState({
      photos,
      deleteItemModalOpen: false
    })
  }

  handleDeleteItems() {
    let itemIsChecked

    this.state.photos.filter((photo) => {
      if(photo.checked) {
        itemIsChecked = true
      }
    })

    if(itemIsChecked) {
      return this.setState({ deleteItemsModalOpen: true })
    } else {
      return this.showAlert('No item(s) have been selected!')
    }
  }

  deleteItems() {
    let photos = this.state.photos.filter((photo) => {
      return photo.checked !== true
    })

    this.showAlert('Image(s) have been deleted')

    this.setState({
      photos,
      deleteItemsModalOpen: false
    })
  }

  handleReadOnlyMode() {
    this.setState({
      editable: !this.state.editable
    })
  }

  reOrderGalleryViaDragAndDrop(newOrder) {
    if(this.state.editable) {
      this.setState({
        photos: newOrder.map((index) => { return this.state.photos[index] })
      })
    } else {
      this.showAlert('Read only mode is enabled, therefore you cannot reorder images.')
    }
  }

  reverseGalleryOrder() {
    let photos = this.state.photos.reverse()

    this.setState({ photos })
  }

  openModal(action) {
    if(action === 'deleteItem') {
      this.setState({ deleteItemModalOpen: true })
    } else {
      this.setState({ deleteItemsModalOpen: true })
    }
  }

  closeModal(action) {
    if(action === 'deleteItem') {
      this.setState({ deleteItemModalOpen: false })
    } else {
      this.setState({ deleteItemsModalOpen: false })
    }
  }

  showAlert(alertMessage) {
    this.setState({
      showAlert: true,
      alertMessage
    })
  }

  hideAlert() {
    this.setState({ showAlert: false })
  }

  render() {
   return (
     <div>
       <NavBar
         onCheck={this.handleReadOnlyMode.bind(this)}
         checked={!this.state.editable}
         handleDeleteItems={this.handleDeleteItems.bind(this)}
         deleteItems={this.deleteItems.bind(this)}
         reverseGalleryOrder={this.reverseGalleryOrder.bind(this)}
         modalOpen={this.state.deleteItemsModalOpen}
         handleModalClose={this.closeModal.bind(this, 'deleteItems')}
      />
      <PhotoGallery
        photos={this.state.photos}
        onChange={this.reOrderGalleryViaDragAndDrop.bind(this)}
        editable={this.state.editable}
        handleDelete={this.handleDelete.bind(this)}
        checkItem={this.checkItem.bind(this)}
        deleteItem={this.deleteItem.bind(this)}
        modalOpen={this.state.deleteItemModalOpen}
        handleModalClose={this.closeModal.bind(this, 'deleteItem')}
      />
      <Snackbar
        open={this.state.showAlert}
        message={this.state.alertMessage}
        autoHideDuration={4000}
        onRequestClose={this.hideAlert.bind(this)}
      />
     </div>
   )
 }
}
