import React, { Component } from 'react';

import ImageLightbox from '../utils/lightbox';

class ProductImages extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  };

  componentDidMount() {
    const images = this.props.detail.images;

    if (images.length > 0) {
      let lightboxImages = [];

      images.forEach(item => {
        lightboxImages.push(item.url);
      });

      this.setState({ lightboxImages });
    }
  }

  handleLightBox = index => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({ lightbox: true, imagePos: index });
    }
  };

  handleLightBoxClose = () => {
    this.setState({ lightbox: false });
  };

  showThumbs = () =>
    this.state.lightboxImages.map(
      (item, i) =>
        i > 0 ? (
          <div
            key={i}
            onClick={() => this.handleLightBox(i)}
            className="thumb"
            style={{ background: `url(${item}) no-repeat` }}
          />
        ) : null
    );

  renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return `/images/image_not_available.png`;
    }
  };

  render() {
    const { detail } = this.props;

    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{ background: `url(${this.renderCardImage(detail.images)}) no-repeat` }}
            onClick={() => this.handleLightBox(0)}
          />
        </div>
        <div className="main_thumbs">{this.showThumbs()}</div>

        {this.state.lightbox ? (
          <ImageLightbox
            id={detail.id}
            images={this.state.lightboxImages}
            open={this.state.open}
            position={this.state.imagePos}
            onClose={() => this.handleLightBoxClose()}
          />
        ) : null}
      </div>
    );
  }
}

export default ProductImages;
