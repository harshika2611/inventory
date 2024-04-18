function supplierFilterShow() {
  const searchDiv = document.querySelector(".managesupplier-container__button");
  const createSelect = document.createElement("select");
  const filterButton = document.querySelector(".supplierfilterbutton");
  createSelect.setAttribute("id", "searchSupplierSelect");
  createSelect.setAttribute("onchange", "searchInputAdd()");
  createSelect.style.width = "200px";

  //----array element is same name as dataArray key
  const searchOptionArray = ["Select Search Column", "Firstname", "Lastname", "Email", "Companyname", "GST", "Zipcode", "City", "State"];

  for (let element of searchOptionArray) {
    const createOption = document.createElement("option");
    createOption.setAttribute("value", `${element}`);
    createOption.textContent = `${element}`;
    createSelect.appendChild(createOption);
  }
  searchDiv.appendChild(createSelect);

  filterButton.textContent = "Clear";
  filterButton.setAttribute("onclick", "supplierFilterHide()")
}

function supplierFilterHide() {
  const searchSupplierSelect = document.getElementById("searchSupplierSelect");
  const searchInput = document.getElementById("searchInput");
  const filterButton = document.querySelector(".supplierfilterbutton");

  if (searchSupplierSelect) {
    searchSupplierSelect.remove();
  }
  if (searchInput) {
    searchInput.remove();
  }
  filterButton.textContent = "Filter";
  filterButton.setAttribute("onclick", "supplierFilterShow()");

  window.location.reload();
}

//--------------
function searchInputAdd() {
  const searchInput = document.getElementById("searchInput");
  const searchSupplierSelect = document.getElementById("searchSupplierSelect");
  const searchDiv = document.querySelector(".managesupplier-container__button");
  const createInput = document.createElement("input");
  const filterButton = document.querySelector(".supplierfilterbutton");

  if (searchInput) {
    searchInput.remove();
  }

  if (searchSupplierSelect && searchSupplierSelect.selectedIndex > 0) {
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "searchInput");
    createInput.setAttribute("class", "searchInput");
    createInput.setAttribute("placeholder", "search....");
    createInput.setAttribute("onchange", `supplierFilter("${searchSupplierSelect.value}")`);

    createInput.style.width = "250px";
    createInput.style.padding = "20px";
    createInput.style.borderRadius = "10px";
    createInput.style.fontSize = "18px";
    createInput.style.color = "black";
    createInput.style.display = "block";

    searchDiv.appendChild(createInput);
  }
  filterButton.textContent = "Clear";
  filterButton.setAttribute("onclick", "supplierFilterHide()")
}

function supplierFilter(filterColumn) {
  const searchInput = document.getElementById("searchInput");
  let filterArray = [];
  dataArray.forEach((element) => {
    for (let key in element) {
      if (key === filterColumn) {
        let value = element[key].toString().toLowerCase();
        let result = value.includes(searchInput.value.toLowerCase());
        if (result) {
          filterArray.push(element);
          break;
        }
      }
    }
  });
  pagginationFilter(filterArray, 1);
}

function pagginationFilter(filterArray, currPage) {
  let dataArrayFilter = [];
  for (let element of filterArray) {
    dataArrayFilter.push(element);
  }

  currentPage = currPage;
  startIndex = (currentPage - 1) * recordsInSinglePage;
  endIndex = startIndex + recordsInSinglePage;
  const pagginationArray = dataArrayFilter.slice(startIndex, endIndex);
  dataTableGrid(pagginationArray, startIndex);

  if (recordsInSinglePage < dataArray.length) {
    document.getElementById("currentpageshow").innerHTML = `Page ${currentPage}`;
    document.querySelector(".pagginationsection").style.display = "block";
    //----paggination button style
    document.getElementById("doubleleft").style.opacity = "0.5";
    document.getElementById("doubleleft").style.cursor = "not-allowed";

    document.getElementById("singleleft").style.opacity = "0.5";
    document.getElementById("singleleft").style.cursor = "not-allowed";
  } else {
    document.querySelector(".pagginationsection").style.display = "none";
  }
}