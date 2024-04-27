function reportGenerateOption() {
  const reportGenerateDiv = document.querySelector('.reportGenerate-div');

  const createPTitle = document.createElement('p');
  createPTitle.innerHTML = "Please Select Option For Generate Report";
  createPTitle.setAttribute("class", "reportGenerateTitle");

  reportGenerateDiv.appendChild(createPTitle);

  //----now create radio button
  const optionArrayForRadio = [{
    type: "radio",
    id: "productDetails",
    class: "productDetails productRadioButton",
    name: "productDetails",
    value: "product_details",
    textContent: "Product Details",
    onclick: "addProductCategory()"
  }];

  for (let element of optionArrayForRadio) {
    const createRadioDiv = document.createElement("div");
    const radioButton = document.createElement('input');
    const labelForRadioButton = document.createElement('label');
    radioButton.setAttribute("type", `${element.type}`);
    radioButton.setAttribute("id", `${element.id}`);
    radioButton.setAttribute("class", `${element.class}`);
    radioButton.setAttribute("name", `${element.name}`);
    radioButton.setAttribute("value", `${element.value}`);
    radioButton.setAttribute("onclick", `${element.onclick}`);

    labelForRadioButton.setAttribute("for", `${element.id}`);
    labelForRadioButton.innerHTML = element.textContent;

    createRadioDiv.appendChild(labelForRadioButton);
    createRadioDiv.appendChild(radioButton);
    reportGenerateDiv.appendChild(createRadioDiv);
  }
}

async function addProductCategory() {

  const createDivCategory = document.querySelector(".createDivCategory");
  if (createDivCategory) {
    createDivCategory.remove();
  }

  //----fetch all product category available in database
  //database select_master key name pass
  const comboKeyName = { key: "productCategory" };
  const response = await fetch('/api/combos', {
    method: "POST",
    body: JSON.stringify(comboKeyName),
    headers: {
      "Content-Type": "application/json"
    }
  });

  try {
    if (!response.ok) {
      throw new Error("Can't fetch combo");
    }

    if (response.status === 200) {
      const responseDataArray = await response.json();
      // console.log(responseDataArray);

      //now generate checkbox
      const reportGenerateDiv = document.querySelector('.reportGenerate-div');
      const createDivCategory = document.createElement("div");
      createDivCategory.setAttribute("class", "createDivCategory");

      const createSelect = document.createElement("select");
      createSelect.setAttribute("onchange", "addCustomizeOption()");
      createSelect.setAttribute("id", "productCategorySelect");
      const createOptionTitle = document.createElement("option");
      createOptionTitle.setAttribute("value", "");
      createOptionTitle.innerHTML = "Select Category";
      createSelect.appendChild(createOptionTitle);

      responseDataArray.forEach((element, index) => {
        const createOption = document.createElement("option");
        createOption.setAttribute("id", `customizeOptionheckBox${index}`);
        createOption.setAttribute("class", "customizeOptionheckBox");
        createOption.setAttribute("name", "customizeOptionheckBox");
        createOption.setAttribute("value", `${element.value}`);
        createOption.textContent = `${element.value}`;
        createSelect.appendChild(createOption);
      });
      const createOptionAll = document.createElement("option");
      createOptionAll.setAttribute("value", "");
      createOptionAll.innerHTML = "All Category";
      createSelect.appendChild(createOptionAll);


      createDivCategory.appendChild(createSelect);
      reportGenerateDiv.appendChild(createDivCategory);
    }
  } catch (error) {
    console.log(error);
    const responseMessage = await response.json();

    if (response.status === 404) {
      messagePopUp(responseMessage.message);
    }

    if (response.status === 500) {
      messagePopUp(responseMessage.message);
    }
  }
}


function addCustomizeOption() {
  // const reportGenerateDiv = document.querySelector(".reportGenerate-div");

  //before add new customize option clear div
  const customizeDiv = document.getElementById("customizeOptionDiv");
  const createDivCategory = document.querySelector(".createDivCategory");

  if (customizeDiv) {
    customizeDiv.remove();
  }

  const customizeOptionDiv = document.createElement("div");
  customizeOptionDiv.setAttribute("id", "customizeOptionDiv");

  //---create check box
  const customizeOptionArray = [{
    type: "checkbox",
    id: "productCustomizeOption1",
    class: "productCustomizeOption",
    name: "productCustomizeOption",
    value: "product_name",
    textContent: "Product Name"
  }, {
    type: "checkbox",
    id: "productCustomizeOption2",
    class: "productCustomizeOption",
    name: "productCustomizeOption",
    value: "stock",
    textContent: "Stock"
  }, {
    type: "checkbox",
    id: "productCustomizeOption3",
    class: "productCustomizeOption",
    name: "productCustomizeOption",
    value: "sku_id",
    textContent: "SKU ID"
  }, {
    type: "checkbox",
    id: "productCustomizeOption4",
    class: "productCustomizeOption",
    name: "productCustomizeOption",
    value: "cost",
    textContent: "Selling Cost"
  }]


  for (let element of customizeOptionArray) {
    const createCheckboxDiv = document.createElement("div");
    const checkBox = document.createElement('input');
    const labelForCheckBox = document.createElement('label');
    checkBox.setAttribute("type", `${element.type}`);
    checkBox.setAttribute("id", `${element.id}`);
    checkBox.setAttribute("class", `${element.class}`);
    checkBox.setAttribute("name", `${element.name}`);
    checkBox.setAttribute("value", `${element.value}`);

    labelForCheckBox.setAttribute("for", `${element.id}`);
    labelForCheckBox.innerHTML = element.textContent;
    createCheckboxDiv.appendChild(labelForCheckBox);
    createCheckboxDiv.appendChild(checkBox);
    customizeOptionDiv.appendChild(createCheckboxDiv);
  }

  const generateButton = document.createElement("p");
  generateButton.innerHTML = "Generate PDF";
  generateButton.setAttribute("onclick", "generateReport()");
  generateButton.setAttribute("class", "generatePdfButton");
  createDivCategory.appendChild(customizeOptionDiv);
  customizeOptionDiv.appendChild(generateButton);
}

async function generateReport() {
  const productCustomizeOption = document.querySelectorAll('.productCustomizeOption');

  const productCategorySelect = document.getElementById("productCategorySelect");

  const productDetailsObject = {};
  const databaseObject = {};
  const productMaster = [];
  const productDetails = [];
  const purchaseProducts = [];

  if (productCustomizeOption.length > 0) {
    for (let element of productCustomizeOption) {
      if (element.checked) {
        switch (element.value) {
          case "product_name":
            productMaster.push("product_name");
            break;
          case "sku_id":
            productMaster.push("sku_id");
            break;
          case "cost":
            productMaster.push("cost");
            break;
          case "stock":
            productDetails.push("stock");
            break;
          // case "unit_price":
          //   purchaseProducts.push("unit_price");
          //   break;
        }
      }
    }

    if (productMaster.length === 0 && productDetails.length === 0 && purchaseProducts.length === 0) {
      messagePopUp("Please select options");
    } else {
      if (productMaster.length !== 0) {
        databaseObject.product_master = productMaster;
      }
      if (productDetails.length !== 0) {
        databaseObject.products_details = productDetails;
      }
      if (purchaseProducts.length !== 0) {
        databaseObject.purchase_products = purchaseProducts;
      }

      if (productCategorySelect) {
        productDetailsObject.databaseObject = databaseObject;
        productDetailsObject.categoryName = productCategorySelect.value
      }
    }
    // console.log(databaseObject);
  }

  if (Object.keys(databaseObject).length > 0) {
    const response = await fetch('/reportGenerate', {
      method: 'POST',
      body: JSON.stringify(productDetailsObject),
      headers: {
        "Content-Type": "application/json"
      }
    });

    try {
      if (!response.ok) {
        throw new Error("PDF Generate Error");
      }

      if (response.status === 200) {
        const pdfResponse = await response.json();
        window.open(`${window.location.origin}/uploads/pdfFile/${pdfResponse.pdfName}`, "_blank");
        // console.log(responseMessage);
        // const responsePdfGenerate = await fetch('/api/pdfTemplate', {
        //   method: 'POST',
        //   body: JSON.stringify(responseObject),
        //   headers: {
        //     "Content-Type": "application/json"
        //   }
        // });

        // if (!responsePdfGenerate.ok) {
        //   throw error;
        // }

        // if (responsePdfGenerate.status === 200) {
        //   const pdfResponse = await responsePdfGenerate.json();
        //   window.open(`${window.location.origin}/uploads/pdfFile/${pdfResponse.pdfName}`, "_blank");
        // }
      }
    } catch (error) {
      console.log(error);
      const responseMessage = await response.json();
      if (response.status === 404) {
        messagePopUp(responseMessage.message);
      }
      if (response.status === 500) {
        messagePopUp(responseMessage.message);
      }
    }
  }
}