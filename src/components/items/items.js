import './items.css';
import { getItems, deleteItem } from '../../api/items';

export let itemsHTML = global.document.getElementById('items');

if (!itemsHTML) {
  itemsHTML = document.createElement('table');
  itemsHTML.id = 'items';
  itemsHTML.className = 'items';
}

// Populate table of items via API call
getItems().then(result => {
  let itemsBody = "";

  // sort items
  let items = result.sort((a, b) => {
    return a.id - b.id;
  });

  items.forEach(item => {
    itemsBody += `<tbody>
        <td>${item.id}.</td>
        <td class="title">${item.title}</td>
        <td><a href="/${item.link}">${item.description}</a></td>
        <td><a href="#" data-id="${item.id}" class="deleteItem">Delete</a></td>
      </tbody>`
  });

  itemsHTML.innerHTML = itemsBody;

  const deleteLinks = global.document.getElementsByClassName('deleteItem');

  // Must use array.from to create a real array from a DOM collection
  // getElementsByClassName only returns an "array like" object
  Array.from(deleteLinks, link => {
    link.onclick = function(event) {
      const element = event.target;
      event.preventDefault();
      deleteItem(element.attributes['data-id'].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
});
