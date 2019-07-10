const allItems = loadAllItems();

function bestCharge(selectedItems) {
  return /*TODO*/;
}
function transformItemsToObject(selectedItems){
  let itemObject = {};
  selectedItems.forEach((item) => {
    let location = item.indexOf('x');
    let itemId = item.substring(0, location-1);
    let itemCount = parseInt(item.substring(location + 2));
    itemObject[itemId] = itemCount;
  });
  return itemObject;
}

function findItems(itemObject,allItems) {
  let orderedItems = [];
  for (let item of allItems) {
    item.count = itemObject[item.id];
    orderedItems.push(item);
  }
  return orderedItems.filter((num) => num.count == undefined ? false : true);
}
