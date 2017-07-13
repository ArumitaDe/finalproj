import React, {Component} from 'react';
import './styles/css/index.css';
import ImageGallery from 'react-image-gallery';


class PodGallery extends Component {

    constructor() {
    super();
    this.state = {
      showIndex: false,
      slideOnThumbnailHover: false,
      showBullets: false,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      slideDuration: 450,
      slideInterval: 2000,
      thumbnailPosition: 'right',
      images: []
    };

    }

    componentDidMount() {

        fetch('/pod/img')
            .then(res => res.json())
            .then(images => this.setState({images}));
    }

    handleImageLoad(event) {
        console.log('Image loaded ', event.target)
    }

    

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }


  _onPause(index) {
    console.debug('paused on index', index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
  }
  _onPlay(index) {
    console.debug('playing from index', index);
  }
    render() {
        return (
            <section className='app'>
                <ImageGallery
                   
                   items={this.state.images}
                   lazyLoad={false}
          onImageLoad = { this._onImageLoad }
        onPause = { this._onPause.bind(this) }
            onScreenChange={this._onScreenChange.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
          showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
          showThumbnails={this.state.showThumbnails}
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          thumbnailPosition={this.state.thumbnailPosition}
          slideDuration={parseInt(this.state.slideDuration)}
          slideInterval={parseInt(this.state.slideInterval)}
          slideOnThumbnailHover={this.state.slideOnThumbnailHover}/>
            </section>
        );
    }

}

export default PodGallery;
