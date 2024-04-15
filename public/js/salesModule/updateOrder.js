async function updateOrder(type, event) {
  let id = event.target.parentNode.parentNode.children[0].innerHTML;
  let response = await fetch(`/fetchOneOrder?type=${type}&id=${id}`);
  let result = await response.json();
  
  console.log(result);
}
// we will use grid fetch function for edit and delete
