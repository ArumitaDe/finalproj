import React, {Component} from 'react';
import './styles/css/index.css';
import ImageGallery from 'react-image-gallery';
import Modal from './modal';
import Modall from 'react-responsive-modal';
import Typist from 'react-typist';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
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
      open:false,
      renderMsg:false,
       startDate: moment()
    };
   this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    }
    onHeaderTyped = () => {
    this.setState({ renderMsg: true });
 }
    handleChange(date) {
        console.log(date.format('YYYY-MM-DD'));
        var formattedDate = date.format('YYYY-MM-DD');
        var self = this;
        this.setState({
            startDate: date
        });
        let obj = {};
        var myInit = {
            method: 'GET',

            mode: 'cors',
            cache: 'default'
        };
        fetch("https://api.nasa.gov/planetary/apod?api_key=XKfoeQE8mIxxmHoYpxZpduljk0xC3ad3XCicQxLZ&date=" + formattedDate, myInit) // Call the fetch function passing the url of the API as a parameter
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                console.log(body);

                if (body.media_type == "image") {
                    obj = {
                        "copyright": body.copyright,
                        "date": body.date,
                        "description1": body.explanation,
                        "description": body.title + ". Dated - " + body.date + ".",
                        "original": "https://process.filestackapi.com/AAroAJCWESsSFzu09ec7rz/resize=width:650,height:450,fit:scale/" + body.url,
                        "modalurl": body.url,
                        "media_type": body.media_type,
                        "originalTitle1": body.title,
                        "thumbnailTitle1": body.date,
                        "thumbnailLabel1": body.date,
                        "thumbnail": "https://process.filestackapi.com/AAroAJCWESsSFzu09ec7rz/resize=width:650,height:450,fit:scale/" + body.url
                    };
                     console.log("obj is");
                    console.log(obj);
                    console.log(self.state.images);
                    var p = self.state.images;
                    p.push(obj);
                    
                    console.log(p);
                    self.setState({images:p});
                                        //self.state.images.push(obj);

                }
            console.log("obj is");
                    console.log(obj);

            });

             console.log(this.state.images);
         console.log("obj just before push is");
                    console.log(obj);
         

   
         console.log(this.state.images);
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
        console.log('Image loaded weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', event.target)
    }

    
    toggleModal = (event) => {
    this.setState({
        renderMsg: false ,
      open: !this.state.Open,
      modalinfo:this.state.images[this._imageGallery.getCurrentIndex()].description1,
      currentpic:this.state.images[this._imageGallery.getCurrentIndex()].modalurl,
      modalheading:this.state.images[this._imageGallery.getCurrentIndex()].description
     
    });
     console.log('hi there', event.target, 
        this._imageGallery.getCurrentIndex(),
        this.state.images[this._imageGallery.getCurrentIndex()].description1);
   

       
         

       
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
            
     fontSize:'.2em !important',
     backgroundColor:'rgba(0, 0, 0, 0.5)',
     backgroundStyle:'cover',
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
    };
                       
        return (
            <div>
            <h1><center>NASA Picture of the Day</center></h1>
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
        
        <Modall open={open} onClose={this.onCloseModal} little modalStyle={modStyle}  
        supportedOrientations={['portrait', 'landscape']} >
          <h4><Typist className="ModalHeading" 
          cursor={{ hideWhenDone: true }} startDelay={500}
          onTypingDone={this.onHeaderTyped}>{this.state.modalheading}</Typist></h4>
           {this.state.renderMsg ? (
          <Typist className="ModalDescription" 
          cursor={{ hideWhenDone: true }} >{this.state.modalinfo}</Typist>
             ) : null }
        </Modall>
      </div>
            </section>
        <h1><center>Explore Pictures from other dates</center></h1>   
       <center> <DatePicker
dateFormat="YYYY/MM/DD"
selected={this.state.startDate}
onChange={this.handleChange.bind(this)} />
          </center> 
        </div> 
        );
    }

}

export default PodGallery;
