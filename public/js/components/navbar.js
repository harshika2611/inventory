function showDropDown() {
  document.getElementById('dropdownList').classList.toggle('show');
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropimg')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

function logout() {
  window.location = '/';
}

const navHover = () => {
  const path = window.location.pathname.split('/')[1];
  console.log(path);
  if (path == 'purchaseOrder' || path == 'purchaseHistory') {
    document.getElementById(`navpurchase`).classList.add('width-100-hover');
    document.getElementById(`submenu1`).classList.remove('collapse-horizontal');
    document.getElementById(`submenu1`).classList.add('show');
  } else if (path == 'salesNewOrder' || path == 'salesHistory') {
    document.getElementById(`navsales`).classList.add('width-100-hover');
    document.getElementById(`submenu2`).classList.remove('collapse-horizontal');
    document.getElementById(`submenu2`).classList.add('show');
  } else if (path.toLowerCase().includes('report')) {
    console.log(path.toLowerCase().includes('report'));
    document.getElementById(`navreport`).classList.add('width-100-hover');
    document.getElementById(`submenu3`).classList.remove('collapse-horizontal');
    document.getElementById(`submenu3`).classList.add('show');
  } else {
    document.getElementById(`nav${path}`).classList.add('width-100-hover');
  }
};
navHover();
