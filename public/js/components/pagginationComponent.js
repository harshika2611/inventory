/**Instruction before use this paggination component
 * paggination() function pass API name
 * data show in table grid function name is dataTableGrid() only this name you can write your logic for data list
 */

let dataArray = [];
let currentPage = 1;
const recordsInSinglePage = 6;
let totalNumerOfRecords;
let startIndex;
let endIndex;

async function paggination(apiName) {
  const response = await fetch(apiName, {
    method: 'GET'
  });

  const responseArray = await response.json();
  dataArray = [...responseArray]; //return shallow copy or array
  totalNumerOfRecords = responseArray.length;

  startIndex = (currentPage - 1) * recordsInSinglePage;
  endIndex = startIndex + recordsInSinglePage;
  const pagginationArray = dataArray.slice(startIndex, endIndex);
  dataTableGrid(pagginationArray, startIndex);

  if (recordsInSinglePage < dataArray.length) {
    document.getElementById("currentpageshow").innerHTML = `Page ${currentPage}`;
    document.querySelector(".pagginationsection").style.display = "block";
    //----paggination button style
    document.getElementById("doubleleft").style.opacity = "0.5";
    document.getElementById("doubleleft").style.cursor = "not-allowed";

    document.getElementById("singleleft").style.opacity = "0.5";
    document.getElementById("singleleft").style.cursor = "not-allowed";
  }
}

function doubleLeftButton() {
  if (currentPage > 1) {
    currentPage = 1;
    startIndex = (currentPage - 1) * recordsInSinglePage;
    endIndex = startIndex + recordsInSinglePage;
    const pagginationArray = dataArray.slice(startIndex, endIndex);
    dataTableGrid(pagginationArray, startIndex);
  }
  document.getElementById("currentpageshow").innerHTML = `Page ${currentPage}`;
  document.getElementById("doubleleft").style.opacity = "0.5";
  document.getElementById("doubleleft").style.cursor = "not-allowed";

  document.getElementById("singleleft").style.opacity = "0.5";
  document.getElementById("singleleft").style.cursor = "not-allowed";

  document.getElementById("singleright").style.opacity = "1.0";
  document.getElementById("singleright").style.cursor = "pointer";

  document.getElementById("doubleright").style.opacity = "1.0";
  document.getElementById("doubleright").style.cursor = "pointer";
}

function singleLeftButton() {
  if (currentPage > 1) {
    currentPage = currentPage - 1;
    startIndex = (currentPage - 1) * recordsInSinglePage;
    endIndex = startIndex + recordsInSinglePage;
    const pagginationArray = dataArray.slice(startIndex, endIndex);
    dataTableGrid(pagginationArray, startIndex);
  }

  if (currentPage === 1) {
    document.getElementById("doubleleft").style.opacity = "0.5";
    document.getElementById("doubleleft").style.cursor = "not-allowed";

    document.getElementById("singleleft").style.opacity = "0.5";
    document.getElementById("singleleft").style.cursor = "not-allowed";
  }

  document.getElementById("currentpageshow").innerHTML = `Page ${currentPage}`;

  document.getElementById("singleright").style.opacity = "1.0";
  document.getElementById("singleright").style.cursor = "pointer";

  document.getElementById("doubleright").style.opacity = "1.0";
  document.getElementById("doubleright").style.cursor = "pointer";
}

function doubleRightButton() {

  if (currentPage < Math.ceil(totalNumerOfRecords / recordsInSinglePage)) {
    currentPage = Math.ceil(totalNumerOfRecords / recordsInSinglePage);
    startIndex = (currentPage - 1) * recordsInSinglePage;
    endIndex = startIndex + recordsInSinglePage;
    const pagginationArray = dataArray.slice(startIndex, endIndex);
    dataTableGrid(pagginationArray, startIndex);
  }
  document.getElementById("currentpageshow").innerHTML = `Page ${currentPage}`;

  document.getElementById("doubleleft").style.opacity = "1.0";
  document.getElementById("doubleleft").style.cursor = "pointer";

  document.getElementById("singleleft").style.opacity = "1.0";
  document.getElementById("singleleft").style.cursor = "pointer";

  document.getElementById("singleright").style.opacity = "0.5";
  document.getElementById("singleright").style.cursor = "not-allowed";

  document.getElementById("doubleright").style.opacity = "0.5";
  document.getElementById("doubleright").style.cursor = "not-allowed";
}

function singleRightButton() {

  if (currentPage < Math.ceil(totalNumerOfRecords / recordsInSinglePage)) {
    currentPage = currentPage + 1;
    startIndex = (currentPage - 1) * recordsInSinglePage;
    endIndex = startIndex + recordsInSinglePage;
    const pagginationArray = dataArray.slice(startIndex, endIndex);
    dataTableGrid(pagginationArray, startIndex);
  }

  if (currentPage === Math.ceil(totalNumerOfRecords / recordsInSinglePage)) {
    document.getElementById("singleright").style.opacity = "0.5";
    document.getElementById("singleright").style.cursor = "not-allowed";

    document.getElementById("doubleright").style.opacity = "0.5";
    document.getElementById("doubleright").style.cursor = "not-allowed";
  }

  document.getElementById("currentpageshow").innerHTML = `Page ${currentPage}`;

  document.getElementById("doubleleft").style.opacity = "1.0";
  document.getElementById("doubleleft").style.cursor = "pointer";

  document.getElementById("singleleft").style.opacity = "1.0";
  document.getElementById("singleleft").style.cursor = "pointer";
}