import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
  <Modal
   isOpen={!!props.selectedOption}
   contentLabel="Selected Option"
   onRequestClose={props.closeModal}
   ariaHideApp={false}
   closeTimeoutMS ={200}
   className="modal"
   >
    <h3 className="modal__title">
    Selected Option
    </h3>
    <div className="modal__body"> 
      {props.selectedOption && <p>{props.selectedOption}</p>}
    </div>
    
    <button className="button" onClick={props.closeModal}>
        Okay
    </button>
  </Modal>
);

export default OptionModal;