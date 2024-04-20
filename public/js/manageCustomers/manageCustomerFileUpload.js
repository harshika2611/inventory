async function customerFileUpload() {
  const customerFileData = document.getElementById("customerFileUploadForm");
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
      console.log(responseMessage.message);
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