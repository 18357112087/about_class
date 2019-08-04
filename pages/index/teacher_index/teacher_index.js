// pages/index/teacher_index/teacher_index.js
const config = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher_info: null,
    teacher_eveList: [],
    page: 1,
    read: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_init(options.id)
    this.get_estimate(options.id)
  },
  //获取教师数据
  get_init(id) {
    config.ajax('POST', {
      teacher_id: id
    }, '/index/teacher_info', res => {
      this.setData({
        teacher_info: res.data.data
      })
    })
  },
  //获取教师评论
  get_estimate(id) {
    config.ajax('POST', {
      teacher_id: id,
      page: this.data.page
    }, '/index/teacher_estimate', res => {
      this.setData({
        teacher_eveList: res.data.data.map((item) => {
          item.order_estimatetime = config.timeForm(item.order_estimatetime)
          return item
        })
      })
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