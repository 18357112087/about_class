// pages/ordel/ordel_sure/ordel_sure.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    other_list:[{
      label:'附加车费',
      check:true,
      money:''
    }, {
        label: '附加饭费',
        check: true,
        money:''
      }, {
        label: '附加感谢费',
        check: false,
        money:''
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
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
  select(e){
    let arr = this.data.other_list
    arr[e.currentTarget.dataset.index].check = !arr[e.currentTarget.dataset.index].check
    this.setData({
      other_list: arr
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  sure_ordel(){
    wx.navigateTo({
      url: '/pages/ordel/sure_ordel/ordel_sure',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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

  }
})