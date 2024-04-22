function showFileUpload() {
  const importDataButton = document.querySelector(".importDataButton");
  const customerFileUploadForm = document.getElementById("customerFileUploadForm");
  customerFileUploadForm.style.display = "block";
  importDataButton.innerHTML = "Close";
  importDataButton.setAttribute("onclick", "hideFileUpload()");
}

function hideFileUpload() {
  const importDataButton = document.querySelector(".importDataButton");
  const customerFileUploadForm = document.getElementById("customerFileUploadForm");
  customerFileUploadForm.style.display = "none";
  importDataButton.innerHTML = "Import Data";
  importDataButton.setAttribute("onclick", "showFileUpload()");
}


async function customerFileUpload() {
  const customerFileData = document.getElementById("customerFileUploadForm");

  //first check file is select or not
  const customersFile = document.getElementById("customersFile");
  if (customersFile.files.length === 0) {
    const fileerrorSpan = document.createElement("span");
    fileerrorSpan.setAttribute("id", "fileerrorSpan");
    fileerrorSpan.innerHTML = "* please select file";
    fileerrorSpan.style.color = "red";
    fileerrorSpan.style.padding = "20px";
    customerFileData.appendChild(fileerrorSpan);
  } else {
    const fileerrorSpan = document.getElementById("fileerrorSpan");
    if (fileerrorSpan) {
      fileerrorSpan.remove();
    }
    const formData = new FormData(customerFileData);
    const response = await fetch('/api/customersFileUpload', {
      method: "POST",
      body: formData
    });

    try {
      if (!response.ok) {
        throw new Error("Cannot Send File");
      }

      if (response.status === 200) {
        const responseMessage = await response.json();
        const customerFileUploadForm = document.getElementById("customerFileUploadForm");
        customerFileUploadForm.style.display = "none";
        getCustomers();
        messagePopUp(responseMessage.message);
      }
    } catch (error) {
      console.log(error);
      const responseMessage = await response.json();

      if (response.status === 400) {
        console.log(responseMessage.message);
        messagePopUp(responseMessage.message);
      }

      if (response.status === 500) {
        console.log(responseMessage.message);
        messagePopUp(responseMessage.message);
      }
    }
  }
}