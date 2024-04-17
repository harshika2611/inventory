function messagePopUp(responseMessage) {
  const messagePopUpContainer = document.getElementById("messagePopUpSection__container");
  const oldP = document.getElementById("messagePopUp");
  alert(messagePopUpContainer);
  if (oldP) {
    oldP.remove();
  }
  const createP = document.createElement("p");
  createP.setAttribute("id", "messagePopUp");
  createP.style.position = "absolute";
  createP.innerHTML = responseMessage;
  messagePopUpContainer.appendChild(createP);
}