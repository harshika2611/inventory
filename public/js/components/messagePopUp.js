function messagePopUp(responseMessage) {
  const messagePopUpContainer = document.getElementById("messagePopUpSection__container");
  const oldP = document.getElementById("messagePopUp");
  if (oldP) {
    oldP.remove();
  }
  const createP = document.createElement("p");
  createP.setAttribute("id", "messagePopUp");
  createP.style.position = "absolute";
  createP.style.right = "0";
  createP.style.padding = "10px";
  createP.style.backgroundColor = "#e8e8e1";
  createP.style.borderRadius = "10px";
  createP.style.width = "300px";
  createP.style.textAlign = "center";
  createP.style.fontSize = "20px";
  createP.innerHTML = responseMessage;
  messagePopUpContainer.appendChild(createP);

  const removeMessagePopUp = setTimeout(() => {
    const messagePopUp = document.getElementById("messagePopUp");
    messagePopUp.remove();
    clearTimeout(removeMessagePopUp);
  }, 6000);
}