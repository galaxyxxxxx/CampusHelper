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
};
Page({
  data: {
    mode: null,

    name: '',
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

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {

  },

  // 身份选择
  chooseMode(e){
    console.log(e)
    let tag = e.currentTarget.dataset.tag;
    if(tag == 'teacher' || tag == 'student'){
      wx.setStorageSync('role', tag);
      this.setData({
        mode: 0,
        role: tag
      })
    }else if(tag == 'signIn'){
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
    console.log('test dep', e);
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
})