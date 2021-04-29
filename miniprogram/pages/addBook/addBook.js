
wx.cloud.init({
  env: 'x-5g36bu9kffd19583'
})
const db = wx.cloud.database()
const book = db.collection('book')

Page({

  data: {
    // mode : 'create',

    fileList: [],
    coverID : '',

    _id : '',
    title : '',
    isbn : '',
    price : '',
    desc : '',
  },

  onLoad: function (options) {

    if(!options.mode){
      // 修改模式
      this.setData({
        _id : '28ee4e3e6070b2e50ebf29521690037b',
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
    book.doc(id).get().then(res=>{
      let data = res.data
      that.setData({
        title : data.title,
        isbn : data.isbn,
        price : data.price,
        desc : data.description,
        coverId : data.cover
      })
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  // 提交按钮区
  submit(){

    let {title} = this.data
    let {isbn} = this.data
    let {price} = this.data
    let {desc} = this.data

    // 数据校验
    if(title == '' || isbn == '' || price == ''){
      wx.showToast({
        title: 'Complete all items',
        icon: 'none'
      })
      return;
    }else{
      book.add({
        data: {
          title : title,
          isbn : isbn,
          price : price,
          description : desc,
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
    book.doc(this.data._id).remove({
      success : res => {
        console.log('deleted',res)
      }
    })
  }
})