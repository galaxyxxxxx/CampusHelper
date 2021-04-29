const util = require('../../utils/dataCheck')
const departments = {
  '': [],
  信息学部: ['', '自动化', '电子信息工程', '通信工程', '电子科学与技术', '微电子科学与工程', '机器人工程', '计算机科学与技术', '物联网工程', '信息安全', '软件工程', '数字媒体技术'],
  材制学部: ['', '机械工程', '测控技术与仪器', '材料科学与工程', '资源循环科学与工程', '纳米材料与技术'],
  城建学部: ['', '土木工程', '给排水科学与工程', '建筑环境与能源应用工程', '交通工程', '交通设备与控制工程', '城乡规划', '建筑学'],
  环生学部: ['', '环境工程', '环境科学', '能源动力与工程', '新能源科学与工程', '应用化学', '食品质量与安全', '生物技术', '生物医学工程'],
  经管学院: ['', '信息管理与信息系统', '经济统计学', '金融学', '会计学', '国际经济与贸易', '文化产业管理', '工商管理', '市场营销'],
  艺设学院: ['', '视觉传达设计', '环境设计', '产品设计', '服装与服饰设计', '工艺美术', '绘画', '雕塑', '数字媒体艺术', '工业设计', '广告学'],
  理学部: ['', '数学与应用数学', '信息与计算科学', '应用物理', '统计学'],
  文法学部: ['', '英语', '法学', '社会学', '社会工作'],
  樊恭烋荣誉学院: [''],
  都柏林学院: ['', '电子信息工程', '物联网工程', '软件工程', '金融学']
};
wx.cloud.init({
  env: 'x-5g36bu9kffd19583'
})
const db = wx.cloud.database()
const user = db.collection('user')
Page({
  data: {
    mode: null,

    name: '',
    id: '',
    tel: '',
    dep1: '',
    dep2: '',
    role: '',

    department: [{
        values: Object.keys(departments),
        className: 'column1',
      },
      {
        values: departments['信息学部'],
        className: 'column2',
        defaultIndex: 0,
      }
    ],
    showDep: false,

    load: false,
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {
    // 检验是否已登录过 - 直接在user表中查找openid是否存在 若存在则跳转至首页即可
    user.where({
      _openid: wx.getStorageSync('openid')
    }).get().then((res) => {
      if (res.data.length == 1) {
        console.log('已注册过')
        wx.switchTab({
          url: '../index/index',
        })
        let role = res.data[0].role
        wx.setStorageSync('role', role)
      } else {
        this.setData({
          load: true
        })
      }
    })
  },

  // 身份选择
  chooseMode(e) {
    console.log(e)
    let tag = e.currentTarget.dataset.tag;
    if (tag == 'teacher' || tag == 'student') {
      wx.setStorageSync('role', tag);
      this.setData({
        mode: 0,
        role: tag
      })
    } else if (tag == 'signIn') {
      this.setData({
        mode: 1,
      })
    }
  },

  onShowDep(e) {
    this.setData({
      showDep: true
    });
  },

  onChangeDep(e) {
    const {
      picker,
      value,
      index
    } = e.detail;
    picker.setColumnValues(1, departments[value[0]]);
    let dep1temp = this.data.dep1temp;
    let dep2temp = this.data.dep2temp;
    if (dep1temp == '') {
      this.setData({
        dep1temp: e.detail.value[0],
        dep2temp: e.detail.value[1]
      });
    } else if (dep1temp != '' && e.detail.value[0] != dep1temp) {
      this.setData({
        dep1temp: e.detail.value[0],
        dep2temp: ''
      });
    } else {
      this.setData({
        dep1temp: e.detail.value[0],
        dep2temp: e.detail.value[1]
      });
    }
  },
  onCancelDep(e) {
    this.setData({
      dep1temp: '',
      dep2temp: '',
      showDep: false,
    });
  },
  onCloseDep(e) {
    this.setData({
      dep1temp: '',
      dep2temp: '',
      showDep: false
    });
  },
  onConfirmDep(e) {
    console.log('test temp', this.data.dep1temp, this.data.dep2temp);
    this.setData({
      dep1: this.data.dep1temp,
      dep2: this.data.dep2temp,
      change: 1,
      showDep: false,
    });
  },


  // 点击注册按钮
  signUp() {

    let name = this.data.name
    let id = this.data.id
    let tel = this.data.tel
    let dep1 = this.data.dep1
    let dep2 = this.data.dep2
    let role = this.data.role

    if (name == '' || id == '' || tel == '' || dep1 == '') {
      wx.showToast({
        title: 'Complete all items',
        icon: 'none'
      })
      return;
    } else {
      wx.getUserProfile({
        desc: '仅用于个人信息展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.setStorageSync('nickName', res.userInfo.nickName);
          wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl);
          wx.setStorageSync('gender', res.userInfo.gender);
          wx.setStorageSync('language', res.userInfo.language);
          wx.setStorageSync('country', res.userInfo.country);
          wx.setStorageSync('province', res.userInfo.province);
          wx.setStorageSync('city', res.userInfo.city);

          user.add({
            data: {
              name: name,
              id: id,
              tel: tel,
              dep1: dep1,
              dep2: dep2,
              role: role,
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
              wx.switchTab({
                url: '../index/index',
              })
            },
            fail(err) {
              console.log('增加用户个人信息失败', err);
            }
          })
        }
      })
    }
  },

  // 下列两个函数为获取用户信息的方式 暂未被用到 仅供之后debug参考
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
          success: function (suc) {
            wx.setStorageSync('nickName', res.userInfo.nickName);
            wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl);
            wx.setStorageSync('gender', res.userInfo.gender);
            wx.setStorageSync('language', res.userInfo.language);
            wx.setStorageSync('country', res.userInfo.country);
            wx.setStorageSync('province', res.userInfo.province);
            wx.setStorageSync('city', res.userInfo.city);

            if (suc.data.length == 0) {
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
            } else {
              console.log("old user", suc)
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

  // 点击登录按钮
  signIn(){
    let id = this.data.id
    let tel = this.data.tel
    user.where({
      id : id,
      tel : tel
    }).get().then(res=>{
      if(res.data.length == 0){
        wx.showToast({
          title: 'Account not exist',
          icon: 'none'
        })
      }else{
        wx.showToast({
          title: 'Login In',
          icon: 'success'
        })
      }
    })
  }
})