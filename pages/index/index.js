Page({

  /**
   * 页面的初始数据
   */
  data: {
    mask:true,
    min_index:0,
    minTab_list:['985院校','211院校'],
    grade_lsit:['初中1年级','初中2年级'],
    grade_index:0,
    class_list:['化学','语文'],
    class_index:0,
    level_list:['中级','高级','特级'],
    level_index:0,
    date:'2019-04-05',
    time:'09:00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  sure(){
    wx.navigateTo({
      url: '/pages/index/select_teacher/select_teacher',
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
  //关闭遮罩层
  hideMask(){
    this.setData({
      mask:false
    })
  },
  //选择学院
  select_tab(e){
    this.setData({
      min_index: e.currentTarget.dataset.index
    })
  },
  //选择器函数
  bindPickerChange(e){
    switch (e.currentTarget.dataset.type) {
      case "grade":
        this.setData({
          grade_index: e.detail.value
        })
        break;
      case "class":
        this.setData({
          class_index: e.detail.value
        })
        break;
      case "level":
        this.setData({
          level_index: e.detail.value
        })
        break;
      default:
        
    }
  },
  //选择日期
  bindDateChange(e){
    this.setData({
      date: e.detail.value
    })
  },
  //选择时间
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
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