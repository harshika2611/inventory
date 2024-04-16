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
}

function doubleLeftButton() {
  if (currentPage > 1) {
    currentPage = 1;
    startIndex = (currentPage - 1) * recordsInSinglePage;
    endIndex = startIndex + recordsInSinglePage;
    const pagginationArray = dataArray.slice(startIndex, endIndex);
    dataTableGrid(pagginationArray, startIndex);
  }
}

function singleLeftButton() {
  if (currentPage > 1) {
    currentPage = currentPage - 1;
    startIndex = (currentPage - 1) * recordsInSinglePage;
    endIndex = startIndex + recordsInSinglePage;
    const pagginationArray = dataArray.slice(startIndex, endIndex);
    dataTableGrid(pagginationArray, startIndex);
  }
}

function doubleRightButton() {

  if (currentPage < Math.ceil(totalNumerOfRecords / recordsInSinglePage)) {
    currentPage = Math.ceil(totalNumerOfRecords / recordsInSinglePage);
    startIndex = (currentPage - 1) * recordsInSinglePage;
    endIndex = startIndex + recordsInSinglePage;
    const pagginationArray = dataArray.slice(startIndex, endIndex);
    dataTableGrid(pagginationArray, startIndex);
  }
}

function singleRightButton() {

  if (currentPage < (totalNumerOfRecords / recordsInSinglePage)) {
    currentPage = currentPage + 1;
    startIndex = (currentPage - 1) * recordsInSinglePage;
    endIndex = startIndex + recordsInSinglePage;
    const pagginationArray = dataArray.slice(startIndex, endIndex);
    dataTableGrid(pagginationArray, startIndex);
  }
}