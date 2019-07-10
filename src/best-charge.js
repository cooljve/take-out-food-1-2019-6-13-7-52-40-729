const allItems = loadAllItems();
const promotions = loadPromotions();

function bestCharge(selectedItems) {
  let itemObject = transformItemsToObject(selectedItems);
  let orderedItems = findItems(itemObject, allItems);
  let priceObject = selectPromotion(orderedItems, promotions);
  let receipt = createReceipt(orderedItems, priceObject);
  return receipt;
}

function transformItemsToObject(selectedItems) {
  let itemObject = {};
  selectedItems.forEach((item) => {
    let location = item.indexOf('x');
    let itemId = item.substring(0, location - 1);
    let itemCount = parseInt(item.substring(location + 2));
    itemObject[itemId] = itemCount;
  });
  return itemObject;
}

function findItems(itemObject, allItems) {
  let orderedItems = [];
  for (let item of allItems) {
    item.count = itemObject[item.id];
    orderedItems.push(item);
  }
  return orderedItems.filter((num) => num.count == undefined ? false : true);
}

function selectPromotion(orderedItems, promotions) {
  let res = {};
  let oldPrice = 0;
  let savePrice2 = 0;
  let halfPriceItems = [];
  orderedItems.forEach((item) => {
    oldPrice += item.count * item.price;
  });
  let savePrice1 = oldPrice >= 30 ? 6 : 0;
  orderedItems.forEach((item) => {
    if (promotions[1].items.indexOf(item.id) > -1) {
      savePrice2 += item.price * item.count / 2;
      halfPriceItems.push(item.name);
    }
  });
  res.oldPrice = oldPrice;
  if (savePrice1 > 0 && savePrice2 > 0) {
    res.savePrice = savePrice1 >= savePrice2 ? savePrice1 : savePrice2;
    res.promotion = savePrice1 >= savePrice2 ? promotions[0].type : promotions[1].type;
    res.halfPriceItems = savePrice1 >= savePrice2 ? undefined : halfPriceItems;
  }
  return res;
}

function createReceipt(orderedItems, priceObject) {
  let receipt = `
============= 订餐明细 =============
`;
  orderedItems.forEach((item) => {
    receipt += `${item.name} x ${item.count} = ${item.price * item.count}元
`
  });
  receipt += `-----------------------------------`;
  if (priceObject.promotion === undefined) {
    receipt += `
总计：${priceObject.oldPrice}元
===================================`;
  } else if (priceObject.promotion === '指定菜品半价') {
    receipt += `
使用优惠:
${priceObject.promotion}(`;
    priceObject.halfPriceItems.forEach(halfPriceItem => {
      receipt += `${halfPriceItem}，`
    });
    receipt = receipt.substring(0, receipt.length - 1);
    receipt += `)，省${priceObject.savePrice}元
-----------------------------------
总计：${priceObject.oldPrice - priceObject.savePrice}元
===================================`;
  } else {
    receipt += `
使用优惠:
${priceObject.promotion}，省${priceObject.savePrice}元
-----------------------------------
总计：${priceObject.oldPrice - priceObject.savePrice}元
===================================`;
  }
  return receipt;
}
