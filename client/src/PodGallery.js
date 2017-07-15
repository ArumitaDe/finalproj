import React, {Component} from 'react';
import './styles/css/index.css';
import ImageGallery from 'react-image-gallery';
import Modal from './modal';
import Modall from 'react-responsive-modal';

class PodGallery extends Component {

    constructor() {
    super();
    this.state = {
      showIndex: true,
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
      thumbnailPosition: 'bottom',
      images: [],
      isOpen :false,
      modalinfo:'',
      currentpic:null,
      open:false
    };
   this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    }
      onOpenModal() {
    this.setState({ open: true });
  }
 
  onCloseModal() {
    this.setState({ open: false });
  }
    componentDidMount() {

        fetch('/pod/img')
            .then(res => res.json())
            .then(images => this.setState({images}));


    }

    handleImageLoad(event) {
        console.log('Image loaded ', event.target)
    }

    
    toggleModal = (event) => {
    this.setState({
      open: !this.state.Open,
      modalinfo:this.state.images[this._imageGallery.getCurrentIndex()].description1,
      currentpic:this.state.images[this._imageGallery.getCurrentIndex()].modalurl
    });
     console.log('hi there', event.target, 
        this._imageGallery.getCurrentIndex(),this.state.images[this._imageGallery.getCurrentIndex()].description1);
   

       
         

       
  }
  _onImageLoad(event) {
    console.log('loaded image', event.target.src);
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
         const { open } = this.state;
        var a= this.state.currentpic;
        var b= 'url("'+a+'")'
        console.log(b);
         const modStyle=
         {
            
     fontSize:'50',
    
     backgroundColor:'rgba(0, 0, 0, 0.5)',
     backgroundStyle:'cover',
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
    };
                       
        return (
            <div>
            <section className='app'>
                <ImageGallery
                    ref={i => this._imageGallery = i}
                   items={this.state.images}
                   lazyLoad={false}
          onImageLoad = { this._onImageLoad }
        onPause = { this._onPause.bind(this) }
        onClick = { this.toggleModal.bind(this)}

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
          slideOnThumbnailHover={this.state.slideOnThumbnailHover}>
          
         
        </ImageGallery>
        <div>
        
        <Modall open={open} onClose={this.onCloseModal} little modalStyle={modStyle}  supportedOrientations={['portrait', 'landscape']}>

          <h2>{this.state.modalinfo}</h2>
        </Modall>
      </div>
            </section>
           </div> 
       
        );
    }

}

export default PodGallery;
