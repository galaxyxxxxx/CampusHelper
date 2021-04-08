/**
 *
 * @method handleSelectorQuery 内部使用
 * @params {
  * className: "", 监听的元素选择器
  * rectElement: "", 所需rect中的具体元素，rect值参考：https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.boundingClientRect.html
  * heightObjElement: "", 作为接收结果属性
  * heightObj: {}, 接收结果，用于setdata前的结果计算
 * }
 *
 * @method setRealHeight 对外接口
 * @params {
  * topBoundaryClass: "", 所需结果高度的上边界的选择器名，用于计算距离元素#bottomWatch之间的高度
  * dynamicHeightClass: "", 高度动态变化元素的选择器名,如吸顶效果中发生变化的元素
 * }
 */

function handleSelectorQuery(params = {
  className: "",
  rectElement: "",
  heightObjElement: "",
  heightObj: {},
}) {
  const {
    className, rectElement, heightObjElement, heightObj,
  } = { ...params }
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery().select(`${className}`).boundingClientRect((rect) => {
      if (rect && rect[`${rectElement}`]) {
        heightObj[`${heightObjElement}`] = rect[`${rectElement}`]
        resolve()
      } else {
        reject()
      }
    }).exec()
  })
}

export default function setRealHeight(params = {
  topBoundaryClass: "",
  dynamicHeightClass: "",
}) {
  const heightObj = {}
  const topBoundaryHeightPromise = params.topBoundaryClass && handleSelectorQuery({
    className: params.topBoundaryClass,
    rectElement: "bottom",
    heightObjElement: "topBoundaryHeight",
    heightObj,
  })
  const dynamicHeightPromise = params.dynamicHeightClass && handleSelectorQuery({
    className: params.dynamicHeightClass,
    rectElement: "height",
    heightObjElement: "dynamicHeight",
    heightObj,
  })
  Promise.all([topBoundaryHeightPromise, dynamicHeightPromise]).then(() => {
    const query = wx.createSelectorQuery()
    query.select("#bottomWatch").boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      if (res && res[0]) {
        const tempData = res[0].bottom - heightObj.topBoundaryHeight
        const resultData = {
          realWinHeight: tempData,
        }
        if (params.dynamicHeightClass) {
          resultData.realWinHeightOfFixTab = tempData + heightObj.dynamicHeight
        }
        this.setData(resultData)
      }
    })
  })
}