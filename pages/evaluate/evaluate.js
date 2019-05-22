// page/evaluate/evaluate.js
const config = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    score: 4,
    read: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_id: options.order_id
    })
  },
  //评星
  tabStart(e) {
    this.setData({
      score: e.currentTarget.dataset.index
    })
  },
  //输入内容
  getContent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  //提交反馈
  sure_ordel() {
    if (this.data.content == '') {
      config.mytoast('评价内容不能为空!')
      return false
    }
    config.ajax('POST', {
      token: wx.getStorageSync('user_token'), //token 
      order_id: this.data.order_id,
      score: this.data.score,
      content: this.data.content
    }, '/order/order_estimate', res => {
      config.mytoast('评价成功')
      wx.switchTab({
        url: '/pages/ordel/ordel',
      })
    })
  },
  getScore(e){
    this.setData({
      score: e.detail.score
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

  }
})