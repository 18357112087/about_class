// pages/ordel/ordel_sure/ordel_sure.js
const config = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all: 0,
    id: '',
    remark: '',
    other_list: [{
      label: '附加车费',
      check: true,
      type: 1,
      money: 0
    }, {
      label: '附加饭费',
      check: true,
      type: 2,
      money: 0
    }, {
      label: '附加感谢费',
      check: false,
      type: 3,
      money: 0
    }]
  },
  //获取备注
  get_remark(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  handel_change() {
    let data = this.data.other_list
    let s = 0
    for (let l = 0; l < data.length; l++) {
      if (data[l].check) {
        s += parseInt(data[l].money == '' ? 0 : data[l].money)
      }
    }
    this.setData({
      all: s
    })
  },
  //获取钱
  get_value(e) {
    let data = this.data.other_list
    data[e.currentTarget.dataset.index].money = e.detail.value
    this.handel_change()
    this.setData({
      other_list: data,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = JSON.parse(options.info)
    this.setData({
      id: info.id,
      order_id: info.order_id,
      teacher_portrait: info.teacher_portrait,
      teacher_realname: info.teacher_realname,
      teacher_sex: info.teacher_sex,
      teacher_star: info.teacher_star,
      teacher_age: info.teacher_age
    })
    this.get_init()
  },
  get_init() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token'),
      order_id: this.data.order_id
    }, '/order/order_message', res => {
      this.setData({
        info: res.data.data
      })
    })
  },
  to_teacher_res() {
    wx.navigateTo({
      url: '/pages/index/teacher_index/teacher_index?id=' + this.data.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //选择额外费用
  select(e) {
    let arr = this.data.other_list
    arr[e.currentTarget.dataset.index].check = !arr[e.currentTarget.dataset.index].check
    this.handel_change()
    this.setData({
      other_list: arr
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  sure_ordel() {
    let a = []
    for (let s = 0; s < this.data.other_list.length; s++) {
      if (this.data.other_list[s].check) {
        a.push({
          type: this.data.other_list[s].type,
          money: this.data.other_list[s].money
        })
      }
    }
    config.ajax('POST', {
      token: wx.getStorageSync('user_token'),
      order_id: this.data.order_id,    //订单id
      teacher_id: this.data.id,  //教师id
      remark: this.data.remark,    //备注
      subjoin: JSON.stringify(a)     //其它金额
    }, '/order/affirm_teacher', res => {
      wx.navigateTo({
        url: '/pages/ordel/sure_ordel/ordel_sure?id=' + this.data.order_id,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return config.shareData

  }
})