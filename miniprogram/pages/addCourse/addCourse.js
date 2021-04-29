wx.cloud.init({
  env: 'x-5g36bu9kffd19583'
})
const db = wx.cloud.database()
const course = db.collection('course')

Page({
  data: {
    // mode : 'create',
    fileList: [],
    coverId: '',
    dates: [{
      values: ['', 2020, 2021, 2022],
      className: 'year',
    }, {
      values: ['Spring', 'Autumn'],
      className: 'season',
    }],
    properties: ['', '校选修课', '院内专业课'],
    showDatePicker: false,
    showPropPicker: false,
    _id: '',
    name: '',
    id: '',
    year: '',
    season: '',
    property: '',
    desc: '',
    desc2 : '',
    dark: false,

    mode: '',
  },

  onLoad: function (options) {

    if(!options.mode){
      // 修改模式
      this.setData({
        _id : '79550af26070ade60de957d7556b3edc',
        mode: 'update'
      })
      this.getData(this.data._id)
    }else{
      // 新增模式
      console.log(options.mode)
      this.setData({
        mode: 'create'
      })
    }
  },

  getData(id){
    let that = this
    course.doc(id).get().then(res=>{
      let data = res.data
      that.setData({
        name : data.name,
        id : data.id,
        year : data.year,
        season : data.season,
        property : data.property,
        coverId : data.cover
      })
    })
  },


  onShow: function () {

  },

  // 云上传图片
  afterRead(e){
    const {file} = e.detail
    const {fileList=[]} = this.data
    fileList.push({})
    fileList[0].status = 'uploading'
    this.setData({fileList})
    this.uploadImage(file.url)
  },
  uploadImage(url) {
    let that = this
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + '.jpg',
      filePath: url,
      success : res =>{
        that.setData({
          coverId : res.fileID
        })
      },
      fail: err =>{
        console.log(err)
      }
    })
  },
  deleteImg(e){
    // 页面删除 假删除
    fileList = []
    // 云端删除 真删除
    this.deleteCloudSave(this.coverId)
    this.setData({
      coverId : ''
    })
  },
  deleteCloudSave(id){
    wx.cloud.deleteFile({
      fileList: [id],
      success: res => {
        console.log(res.fileList, 'has been deleted')
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  // darkmode
  onChangeDarkMode(){
    let dark = this.data.dark
    this.setData({
      dark : !dark
    })
  },

  // 文本输入区

  // 选择器控制区
  clickDate() {
    this.setData({
      showDatePicker: !this.showDatePicker
    })
  },
  clickProp() {
    this.setData({
      showPropPicker: !this.showPropPicker
    })
  },
  onCloseDate() {
    this.setData({
      showDatePicker: false
    })
  },
  onCloseProp() {
    this.setData({
      showPropPicker: false
    })
  },
  onChangeDate(e) {
    let {
      value
    } = e.detail;
    this.setData({
      year: value[0],
      season: value[1],
    })
  },
  onChangeProp(e) {
    let {
      value
    } = e.detail;
    this.setData({
      property: value
    })
  },

  // 提交按钮区
  submit(){

    let {name} = this.data
    let {id} = this.data
    let {year} = this.data
    let {season} = this.data
    let {property} = this.data

    // 数据校验
    if(name == '' || id == '' || year == '' || season == '' || property == ''){
      wx.showToast({
        title: 'Complete all items',
        icon: 'none'
      })
      return;
    }else{
      course.add({
        data: {
          name : name,
          id : id,
          year : year,
          season : season,
          property : property,
          cover : this.data.coverId
        },
        success : res =>{
          console.log(res)
        },
        fail : err => {
          console.log(err)
        }
      })
    }
  },

  delete(){
    course.doc(this.data._id).remove({
      success : res => {
        console.log('deleted',res)
      }
    })
  }


})