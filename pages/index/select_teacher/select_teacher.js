// pages/index/select_teacher/select_teacher.js
const config = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    read: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_id: options.order_id
    })
    this.getTeachers(options.order_id)
  },
  //获取匹配的老师
  getTeachers(order_id) {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token'),   //token
      order_id: order_id  //订单id
    }, '/order/select_teacher', res => {
      setTimeout(() => {
        if (res.data.data.length == 0) {
          config.mytoast('暂未匹配到老师', (res) => {
            wx.navigateBack({
              delta: 1,
            })
          })
        } else {
          this.setData({
            list: res.data.data
          })
        }

      }, 3000)
    })
  },
  to_teacherRes(e) {
    let info = JSON.stringify({
      id: e.currentTarget.dataset.id,
      order_id: this.data.order_id,
      teacher_portrait: this.data.list[e.currentTarget.dataset.index].teacher_portrait,
      teacher_realname: this.data.list[e.currentTarget.dataset.index].teacher_realname,
      teacher_sex: this.data.list[e.currentTarget.dataset.index].teacher_sex,
      teacher_star: this.data.list[e.currentTarget.dataset.index].teacher_star,
      teacher_age: this.data.list[e.currentTarget.dataset.index].teacher_age
    })
    wx.navigateTo({
      url: '/pages/ordel/ordel_sure/ordel_sure?info=' + info,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return config.shareData

  }
})