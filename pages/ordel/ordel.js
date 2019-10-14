// pages/ordel/ordel.js
const config = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    default_src: 'https://pay.tchhkj.com/public/uploads/default/user_default.png',
    tabindex: 0,
    tab_list: ['进行中', '已完成'],
    list: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gitdata()
  },
  select_tab(e) {
    this.setData({
      tabindex: e.currentTarget.dataset.index,
      page: 1,
      list: []
    })
    if (this.data.tabindex == 0) {
      this.gitdata()
    } else {
      this.gitSuccess()
    }
  },
  to_evaluate(e) {
    wx.navigateTo({
      url: '/pages/evaluate/evaluate?order_id=' + e.currentTarget.dataset.order_id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  pay(e) {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token'),
      order_id: e.currentTarget.dataset.order_id
    }, '/order/pay_order', res => {
      config.pay(JSON.parse(res.data.data), res => {
        this.setData({
          page: 1,
          list: []
        })
        this.gitdata()
      })

      // config.mytoast('支付成功!')
    })
  },
  gitSuccess() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token'),
      page: this.data.page
    }, '/user/my_order_accomplish', res => {
      if (res.data.data.length > 0) {
        var list = res.data.data.map((item) => {
          item.startTime = config.timeForm(item.order_reservetime).chatTime.hour + ':' + config.timeForm(item.order_reservetime).chatTime.minute
          item.endTime = config.timeForm(item.order_reservetime + item.order_duration * 3600).chatTime.hour + ':' + config.timeForm(item.order_reservetime + item.order_duration * 3600).chatTime.minute
          item.order_reservetime = config.timeForm(item.order_reservetime).chatTime
          item.order_createtime = config.timeForm(item.order_createtime).btTime
          item.allmoney = (parseFloat(item.order_money) + parseFloat(item.order_subjoin_money) - parseFloat(item.order_bargain_money)).toFixed(2)
          return item
        })
      } else {
        config.mytoast('暂无更多数据')
      }
      this.setData({
        page: this.data.page + 1,
        list: res.data.data.length > 0 ? this.data.list.concat(list) : this.data.list
      })
    })
  },
  to_select(e) {
    wx.navigateTo({
      url: '/pages/index/select_teacher/select_teacher?order_id=' + e.currentTarget.dataset.order_id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  gitdata() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token'),
      page: this.data.page
    }, '/user/my_order_underway', res => {
      if (res.data.data.length > 0) {
        var list = res.data.data.map((item) => {
          item.startTime = config.timeForm(item.order_reservetime).chatTime.hour + ':' + config.timeForm(item.order_reservetime).chatTime.minute
          item.endTime = config.timeForm(item.order_reservetime + item.order_duration * 3600).chatTime.hour + ':' + config.timeForm(item.order_reservetime + item.order_duration * 3600).chatTime.minute
          item.order_reservetime = config.timeForm(item.order_reservetime).chatTime
          item.order_createtime = config.timeForm(item.order_createtime).btTime
          item.allmoney = (parseFloat(item.order_money) + parseFloat(item.order_subjoin_money) - parseFloat(item.order_bargain_money)).toFixed(2)
          return item
        })
      } else {
        config.mytoast('暂无更多数据')
      }
      this.setData({
        page: this.data.page + 1,
        list: res.data.data.length > 0 ? this.data.list.concat(list) : this.data.list
      })
    })
  },
  to_res(e) {
    wx.navigateTo({
      url: '/pages/ordel/ordel_res/ordel_res?order_id=' + e.currentTarget.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //找人砍价
  to_bargain(e) {
    wx.navigateTo({
      url: '/pages/ordel/bargain/bargain?order_id=' + e.currentTarget.dataset.order_id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //取消订单
  cendel_ordel(e) {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token'),
      order_id: e.currentTarget.dataset.order_id
    }, '/order/order_cancel', res => {
      this.setData({
        page: 1,
        list: []
      })
      this.gitdata()
      config.mytoast('订单已取消!')
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    console.log(1)
    if (this.data.tabindex == 0) {
      this.gitdata()
    } else {
      this.gitSuccess()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return config.shareData

  }
})