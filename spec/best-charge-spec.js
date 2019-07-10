describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function () {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function () {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate itemObject when invoke transformItemsToObject given ITEM0001 x 1,ITEM0013 x 2,ITEM0022 x 1', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = transformItemsToObject(inputs);
    let expected = {'ITEM0001': 1, 'ITEM0013': 2, 'ITEM0022': 1};
    expect(summary).toEqual(expected);
  });

  it('should return specified orderedItems when invoke findItems given itemObject {\'ITEM0001\': 1, \'ITEM0013\': 2, \'ITEM0022\': 1}', function () {
    let inputs = {'ITEM0001': 1, 'ITEM0013': 2, 'ITEM0022': 1};
    let summary = findItems(inputs, allItems);
    let expected = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 2
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1
    }];
    expect(summary).toEqual(expected);
  });

  it('should return 指定菜品半价 when invoke selectPromotion given orderedItems', function () {
    let inputs = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 1
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 2
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1
    }];
    let summary = selectPromotion(inputs, promotions);
    let expected = '指定菜品半价';
    expect(summary.promotion).toEqual(expected);
  });

  it('should return 满30减6元 when invoke selectPromotion given orderedItems', function () {
    let inputs = [{
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 4
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1
    }];
    let summary = selectPromotion(inputs, promotions);
    let expected = '满30减6元';
    expect(summary.promotion).toEqual(expected);
  });

  it('should return undefined when invoke selectPromotion given 无优惠产品', function () {
    let inputs = [{
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      count: 4
    }];
    let summary = selectPromotion(inputs, promotions);
    let expected = undefined;
    expect(summary.promotion).toEqual(expected);
  });

});
