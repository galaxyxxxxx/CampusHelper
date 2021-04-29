
Page({

  data: {
    books: [{
      cover: 111,
      title: '编译原理指南',
      price: 35.5,
      course: '编译原理',
      teacher: '高红雨',
    },{
      cover: 111,
      title: '编译原理指南',
      price: 35.5,
      course: '编译原理',
      teacher: '高红雨',
    },{
      cover: 111,
      title: '编译原理指南',
      price: 35.5,
      course: '编译原理',
      teacher: '高红雨',
    }]
  },

  onLoad: function (options) {

  },

  onShow: function () {

  },

  navigateToAddBook(){
    wx.navigateTo({
      url: '../addBook/addBook?mode=' + 'create',
    })
  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})