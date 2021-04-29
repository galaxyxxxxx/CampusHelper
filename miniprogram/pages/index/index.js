const db = wx.cloud.database({
  env: 'x-5g36bu9kffd19583'
})
const user = db.collection('user')
import setRealHeight from "../../utils/setRealHeight"
Page({
  data: {
    openid: wx.getStorageSync('oepnid'),
    loading: false,
    userInfo: {},
    hasUserInfo: true,
    canIUseGetUserProfile: false,

    courses: [{
      title: '编译原理',
      teacher: '高红雨',
      date: 2021,
      semester: 0,
      books: ['test','test2']
    },{
      title: '编译原理',
      teacher: '高红雨',
      date: 2021,
      semester: 0,
      books: ['test','test2']
    }],
    books: [{
      isbn: 123,
      title: 'test',
      avatarUrl: 'url',
      description: 'testdes'
    }]
  },

  onLoad: function() {
    this.authorizationCheck();
    // this.initStyle();
  },

  onShow: function () {
    // wx.showLoading({
    //   title: 'Loading...',
    // })
  },

  // 样式调整
  initStyle(){
    setRealHeight.bind(this, {
      topBoundaryClass: "tab-bar",//顶部分类导航选择器
      dynamicHeightClass: ".courses",//顶导上的其他动态隐藏和显示内容区选择器
    })()
  },

  // 授权检查
  authorizationCheck: function () {
    let that = this;
    if (wx.getUserProfile) {
      that.setData({
        canIUseGetUserProfile: true
      })
    }
  },
})
