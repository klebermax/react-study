import React, { Component } from 'react';

import Lightbox from 'react-images';

class ImageLightbox extends Component {
  state = {
    lightboxIsOpen: true,
    currentImage: this.props.position,
    images: []
  };

  static getDerivedStateFromProps(props, state) {
    if (props.images) {
      let images = [];
      props.images.forEach(image => {
        images.push({ src: `${image}` });
      });

      return (state = { images });
    }

    return false;
  }

  gotToPrevious = () => {
    this.setState({ currentImage: this.state.currentImage - 1 });
  };

  gotToNext = () => {
    this.setState({ currentImage: this.state.currentImage + 1 });
  };

  closeLightbox = () => {
    this.props.onClose();
  };

  render() {
    return (
      <Lightbox
        currentImage={this.state.currentImage}
        images={this.state.images}
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={() => this.gotToPrevious()}
        onClickNext={() => this.gotToNext()}
        onClose={() => this.closeLightbox()}
      />
    );
  }
}

export default ImageLightbox;
