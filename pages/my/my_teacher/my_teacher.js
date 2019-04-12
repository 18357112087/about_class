// pages/my/my_teacher/my_teacher.js
const config=require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  get_myteacher() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/my_teacher', res => {
      this.setData({
        teacher: res.data.data
      })
    })
  },
  to_res(e){
    wx.navigateTo({
      url: '/pages/index/teacher_index/teacher_index?id=' + e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
    this.get_myteacher()
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