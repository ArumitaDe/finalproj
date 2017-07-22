import React, {Component} from 'react';
import './styles/css/index.css';
import ImageGallery from 'react-image-gallery';
import Modall from 'react-responsive-modal';
import Typist from 'react-typist';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import Table from './table';
import 'react-day-picker/lib/style.css';

class PodGallery extends Component {

    constructor() {
        super();
        this.state = {
            selectedDay: undefined,
            startindex:0,
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
            isOpen: false,
            modalinfo: '',
            currentpic: null,
            open: false,
            renderMsg: false,
            dateHasVideoMsg: '',
            startDate: moment()
        };
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);


    }
   
    onHeaderTyped = () => {
        this.setState({renderMsg: true});
    }

    handleDayClick = date => {
    this.setState({ selectedDay:date });
         
        console.log(date);
        var formattedDate = date.toISOString().substring(0, 10);
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
                if (response.status === 400) {
                   console.log(" opening 1st modal ");
                    self.setState({
                        modalheading: 'Error ! ',
                        modalinfo: 'The requested file does not exist ! You may have selected a future date',
                        open: true
                    });
                    console.log(" 1st modal opened");
                }
               return response.json();
            })
            .then(function (body) {
                console.log(body);

                if (body.media_type === "image") {
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
                        "defaultImage":"https://process.filestackapi.com/AAroAJCWESsSFzu09ec7rz/resize=width:650,height:450,fit:scale/https://apod.nasa.gov/apod/image/1707/ic342_rector1024s.jpg",
                        "thumbnail": "https://process.filestackapi.com/AAroAJCWESsSFzu09ec7rz/resize=width:650,height:450,fit:scale/" + body.url
                    };
                    console.log("obj is");
                    console.log(obj);
                    console.log(self.state.images);
                      var p = self.state.images;
                    //p.unshift(obj);

                    console.log(p);
                    self.state.startindex=0;
                    self.setState({
                        
                        images: [obj,...p]});
                    
                    //self.state.images.push(obj);
                    self._imageGallery.slideToIndex(0);
                }
                else
                    {
                        console.log("opening 2nd modal");
                        self.setState({
                        modalheading: 'Error ! ',
                        modalinfo: 'NASA had a video(unsupported media) as an APOD, or the picture is unavailable. Please try another date !',
                        open: true
                    });
                        console.log(" 2nd modal opened");
                    }
                console.log("obj is");
                console.log(obj);

            }
);

}
onOpenModal()
{
    this.setState({open: true});
}

onCloseModal()
{
    this.setState({open: false});
}


componentDidMount()
{

    fetch('/pod/img')
        .then(res => res.json())
        .then(images => this.setState({images}));


}

handleImageLoad(event)
{
    console.log('Image loaded', event.target)
}


toggleModal = (event) => {
    this.setState({
        renderMsg: false,
        open: !this.state.Open,
        modalinfo: this.state.images[this._imageGallery.getCurrentIndex()].description1,
        currentpic: this.state.images[this._imageGallery.getCurrentIndex()+1].modalurl,
        modalheading: this.state.images[this._imageGallery.getCurrentIndex()].description

    });
    console.log('hi there', event.target,
        this._imageGallery.getCurrentIndex(),
        this.state.images[this._imageGallery.getCurrentIndex()].description1);


}

_onImageLoad(event)
{
    this.setState({
        
        currentpic: this.state.images[this._imageGallery.getCurrentIndex()].modalurl,
       

    });
}


_onPause(index)
{
    console.debug('paused on index', index);
}

_onScreenChange(fullScreenElement)
{
    console.debug('isFullScreen?', !!fullScreenElement);
}

_onPlay(index)
{
    console.debug('playing from index', index);
}


render()
{
    const {open} = this.state;
    var a = this.state.currentpic;
    var b = 'url("' + this.state.currentpic + '")'
    console.log(b);
    const modStyle =
        {

            fontSize: '.2em !important',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backgroundStyle: 'cover',
            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
        };
    const bgStyle=
    {

  backgroundStyle: '-moz-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.65) 100%), '+{b}+' no-repeat',
  backgroundStyle: '-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(59%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0.65))), '+b+' no-repeat',
  backgroundStyle: '-webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.65) 100%), '+{b}+' no-repeat',
  backgroundStyle: '-o-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.65) 100%), '+{b}+' no-repeat',
  backgroundStyle: '-ms-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.65) 100%), '+{b}+' no-repeat',
  backgroundStyle: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.65) 100%), '+{b}+' no-repeat',
  height: '200px'

};

    

    return (
            <div id= 'section1' style = {bgStyle}>
            <div className='container'>
            <h1>
                <center>NASA Picture of the Day</center>
            </h1>
            
            <section className='app'>
            <div>
                <ImageGallery
                    ref={i => this._imageGallery = i}
                    items={this.state.images}
                    lazyLoad={false}
                    onImageLoad={ this._onImageLoad.bind(this) }
                    onPause={ this._onPause.bind(this) }
                    onClick={ this.toggleModal.bind(this)}

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
                    slideOnThumbnailHover={this.state.slideOnThumbnailHover}
                    startIndex={this.state.startindex}>


                </ImageGallery>
            </div>
            <div>
                  <h4>
                <center>Explore Pictures from other dates</center>
            </h4>
            <center><DayPicker 
             onDayClick={this.handleDayClick}
          selectedDays={this.state.selectedDay}
            />
          </center>
          </div>
                </section>
                <div>

                    <Modall open={open} onClose={this.onCloseModal} little modalStyle={modStyle}
                            supportedOrientations={['portrait', 'landscape']}>
                        <h4><Typist className="ModalHeading"
                                    cursor={{hideWhenDone: true}} startDelay={500}
                                    onTypingDone={this.onHeaderTyped}>{this.state.modalheading}</Typist></h4>
                        {this.state.renderMsg ? (
                            <Typist className="ModalDescription"
                                    cursor={{hideWhenDone: true}}>{this.state.modalinfo}</Typist>
                        ) : null }
                    </Modall>
                </div>
                 <h1>
                <center>Near Earth Objects for Today</center>
            </h1>
                <Table />
           </div> 
          </div>

    
    );
}

}

export default PodGallery;
