import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from './features/ai-icon.png';


import { CountButton } from "~features/CountButton"
import {useEffect, useState} from "react";
import {Image} from "react-bootstrap";
import fastq from "fastq";

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [inFocus, setInfocus] = useState(false);
  const [show, setShow] = useState(false);
  const [response, setResponse] = useState('');
  const [insertButton, setInsertButton] = useState(false);
  const textMessage = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
   setTimeout(() => {
     getInput().addEventListener('focus', () => setInfocus(true));
   }, 1000);
  }, []);

  function handleShowResponse() {
    setResponse(textMessage);
    setInsertButton(true);
  }

  function getInput() {
    return document.querySelector('[role="textbox"]');
  }

  function insertResponseMessage() {
    const input = getInput();
    input.innerHTML = `<p>${textMessage}</p>`;
    document.querySelector('.msg-form__placeholder').classList.remove('msg-form__placeholder');
    setShow(false);
  }
  return (
      <>
    <div className="z-50 flex fixed top-32 right-8">
      <CountButton />
    </div>
        {
          (inFocus) && (
                <div className="flex justify-center items-center w-screen">
                  <button
                      id="extensionButton"
                      type="button"
                      onClick={handleShow}
                      className="flex flex-row items-center text-sm"
                  >
                    <Image src={Icon} />
                  </button>
                </div>
            )
        }

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <p id="showResponse">{response}</p>
          <input className="form-control" placeholder="Your Prompt"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleShowResponse}>
            >>Generate
          </Button>
          {(insertButton) && (
              <Button variant="primary" onClick={insertResponseMessage}>
                Insert
              </Button>
          )
          }
        </Modal.Footer>
      </Modal>
      </>
  )
}

export default PlasmoOverlay
