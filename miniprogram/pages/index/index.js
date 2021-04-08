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
    },{
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
    },{
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

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '仅用于个人信息展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

        user.where({
          _openid: wx.getStorageSync('openid')
        }).get({
          success: function(suc) {
            wx.setStorageSync('nickName', res.userInfo.nickName);
            wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl);
            wx.setStorageSync('gender', res.userInfo.gender);
            wx.setStorageSync('language', res.userInfo.language);
            wx.setStorageSync('country', res.userInfo.country);
            wx.setStorageSync('province', res.userInfo.province);
            wx.setStorageSync('city', res.userInfo.city);

            if(suc.data.length == 0){
              user.add({
                data: {
                  nickName: res.userInfo.nickName,
                  avatarUrl: res.userInfo.avatarUrl,
                  gender: res.userInfo.gender,
                  language: res.userInfo.language,
                  country: res.userInfo.country,
                  province: res.userInfo.province,
                  city: res.userInfo.city,
                },
                success(suc2) {
                  console.log("add a user", suc2)
                },
                fail(err) {
                  console.log('增加用户个人信息失败', err);
                }
              })
            }else{
              console.log("old user",suc)
            }
          }
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})
