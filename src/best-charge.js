const allItems = loadAllItems();
const promotions = loadPromotions();

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

function selectPromotion(orderedItems, promotions) {
  let res={};
  let oldPrice=0;
  let savePrice2=0;
  orderedItems.forEach((item)=>{
    oldPrice += item.count * item.price;
  });
  let savePrice1 = oldPrice >= 30 ? 6 : 0;
  orderedItems.forEach((item)=>{
    if (promotions[1].items.indexOf(item.id) > -1) {
      savePrice2+=item.price*item.count/2;
    }
  });
  res.oldPrice = oldPrice;
  if (savePrice1 > 0 && savePrice2 > 0) {
    res.savePrice = savePrice1 >= savePrice2 ? savePrice1 : savePrice2;
    res.promotion = savePrice1 >= savePrice2 ? promotions[0].type : promotions[1].type;
  }
  return res;
}
