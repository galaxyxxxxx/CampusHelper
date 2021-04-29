// components/card-L-top/card-L-top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode: {
      type: String,
      value: '',
    },
    id: {
      type: String,
      value: ''
    },
    desc: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    desc2: {
      type: String,
      value: '',
    },
    img: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toCourseDetail: function(){
      wx.navigateTo({
        url: '../courseDetail/courseDetail?id=' + this.data.id,
      })
    }
  }
})
