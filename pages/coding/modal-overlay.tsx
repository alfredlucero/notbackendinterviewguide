import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const htmlCode = `<div class="main-container">
  <button id="show-offer-button" type="button">Show Offer</button>

  <div id="offer-accepted-text" class="hidden">
    <p>Offer accepted</p>
  </div>

  <div id="offer-modal" class="modal hidden">
    <div id="offer-modal-overlay" class="modal-overlay"></div>

    <div class="modal-content-container">
      <div class="modal-content">
        <div id="offer-modal-close" class="modal-close">X</div>

        <p class="modal-content-text">
          Click the button below to accept our amazing offer!
        </p>

        <div class="modal-button-container">
          <button type="button" id="offer-modal-accept-button">Accept offer</button>
        </div>
      </div>
    </div>
  </div>
</div>`;

const cssCode = `.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
}

.hidden {
  display: none;
}

.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.modal-overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: gray;
  opacity: 0.3;
}

.modal-content-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  padding: 1rem;
  background-color: white;
  border: 1px solid gray;
  z-index: 1001;
  width: 250px;
}

.modal-close {
  display: inline-block;
  background-color: #efefef;
  cursor: pointer;
  border: 1px solid gray;
  padding: 0.25rem;
}

.modal-content-text {
  margin: 2rem;
}

.modal-button-container {
  display: flex;
  justify-content: center;
}`;

const jsCode = `/*
* On click of show offer button, open up the modal
*/
document.getElementById("show-offer-button").addEventListener("click", () => {
 const offerModal = document.getElementById("offer-modal");
 offerModal.classList.remove("hidden");
});

/*
* On click of modal close button, close the modal
*/
document.getElementById("offer-modal-close").addEventListener("click", () => {
 console.log("Clicked modal close button!");
 const offerModal = document.getElementById("offer-modal");
 offerModal.classList.add("hidden");
});

/*
* On click of modal overlay, close the modal
*/
document.getElementById("offer-modal-overlay").addEventListener("click", () => {
 console.log("Clicked modal overlay!");
 const offerModal = document.getElementById("offer-modal");
 offerModal.classList.add("hidden");
});

/*
* On click of accept offer button, close the modal, hide the show offer button, and show the offer accepted text
*/
document
 .getElementById("offer-modal-accept-button")
 .addEventListener("click", () => {
   console.log("Clicked modal accept offer button!");
   const offerModal = document.getElementById("offer-modal");
   offerModal.classList.add("hidden");
   const showOfferButton = document.getElementById("show-offer-button");
   showOfferButton.classList.add("hidden");
   const offerAcceptedText = document.getElementById("offer-accepted-text");
   offerAcceptedText.classList.remove("hidden");
 });`;

const ModalOverlay: NextPage = () => {
  return (
    <div>
      <p>Source: https://frontendeval.com/questions/modal-overlay</p>
      <p>Code Pen Example: https://codepen.io/alfinity/pen/RwxNdja</p>
      <Prism.Tabs>
        <Prism.Tab label="modal-overlay.js" language="javascript">
          {jsCode}
        </Prism.Tab>
        <Prism.Tab label="index.css" language="css">
          {cssCode}
        </Prism.Tab>
        <Prism.Tab label="index.html" language="markup">
          {htmlCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ModalOverlay;
