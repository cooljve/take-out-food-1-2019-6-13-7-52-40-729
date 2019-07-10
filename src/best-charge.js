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

