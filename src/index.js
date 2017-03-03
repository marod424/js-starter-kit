import './index.css';
import { getitems, deleteitem } from './api/items';

// Populate table of items via API call
getitems().then(result => {
  let itemsBody = "";

  result.forEach(item => {
    itemsBody += `<tr>
      <td><a href="#" data-id="${item.id}" class="deleteitem">Delete</a></td>
      <td>${item.id}</td>
      <td>${item.firstName}</td>
      <td>${item.lastName}</td>
      <td>${item.email}</td>
      <tr>`
  });

  global.document.getElementById('items').innerHTML = itemsBody;

  const deleteLinks = global.document.getElementsByClassName('deleteitem');

  // Must use array.from to create a real array from a DOM collection
  // getElementsByClassName only returns an "array like" object
  Array.from(deleteLinks, link => {
    link.onclick = function(event) {
      const element = event.target;
      event.preventDefault();
      deleteitem(element.attributes['data-id'].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
});
