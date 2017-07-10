import React, {Component} from 'react';
import './styles/css/index.css';
import ImageGallery from 'react-image-gallery';


class PodGallery extends Component {
    state = {images: []};

    componentDidMount() {

        fetch('/pod/img')
            .then(res => res.json())
            .then(images => this.setState({images}));
    }

    handleImageLoad(event) {
        console.log('Image loaded ', event.target)
    }


    render() {
        return (
            <div>
                <ImageGallery
                    items={this.state.images}
                    slideInterval={2000}
                    onImageLoad={this.handleImageLoad}/>
            </div>
        );
    }

}

export default PodGallery;
