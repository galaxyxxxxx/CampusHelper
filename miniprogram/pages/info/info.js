const util = require('../../utils/dataCheck')
const departments = {
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
}
wx.cloud.init({
  env: 'x-5g36bu9kffd19583'
})
const db = wx.cloud.database()
const user = db.collection('user')
Page({

  data: {
    name: '',
    openid: '',
    id: '',
    tel: '',
    email: '',
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow: function () {
    this.getData();
  },

  getData(){
    let that = this
    user.where({
      _openid : wx.getStorageSync('openid')
    }).get().then(res=>{
      
      let data = res.data[0]
      console.log(data)
      that.setData({
        name: data.name,
        id: data.id,
        tel: data.tel,
        email: data.email,
        dep1: data.dep1,
        dep2: data.dep2,
      })
    })
  },

})