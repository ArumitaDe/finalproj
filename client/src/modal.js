import React from 'react';
import PropTypes from 'prop-types'
class Modal extends React.Component {
  render() {
  	
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    
    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      padding: 50
     
      
    };

    // The modal "window"
    

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal1" style={this.props.modalStyle} >
          {this.props.children}
           
          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;