const config = require('../../utils/util.js')
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    default_src: 'http://yueke.dazhu-ltd.cn/public/uploads//default/user_default.png',
    mask: true,
    min_index: 0,
    minTab_list: ['985院校', '211院校'],
    grade_list: ['初中1年级', '初中2年级'],
    grade_index: 0,
    class_list: ['化学', '语文'],
    class_index: 0,
    level_list: ['中级', '高级', '特级'],
    level_index: 0,
    date: '2019-04-05',
    start_time: '09:00',
    end_time: '18:00',
    userInfo: null,
    time_list:[1,2,3,4,5,6,7],
    time_index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let year = new Date().getFullYear();
    let mouth = new Date().getMonth() + 1;
    mouth = mouth > 10 ? mouth : '0' + mouth
    let day = new Date().getDate();
    day = day > 10 ? day : '0' + day
    this.setData({
      date: year + '-' + mouth + '-' + day
    })
    qqmapsdk = new QQMapWX({
      key: 'CRYBZ-QLP6D-JSX4T-PRAJD-EATR6-I4BAK'
    });

  },
  //年级列表
  getGrade_lsit() {
    config.ajax('POST', {}, '/index/grade_list', res => {
      console.log(res.data.data)
      this.setData({
        grade_list: res.data.data
      })
    })
  },
  //科目列表
  getClass_list() {
    config.ajax('POST', {}, '/index/subjects_list', res => {
      this.setData({
        class_list: res.data.data
      })
    })
  },
  //级别列表
  getLevel_list() {
    config.ajax('POST', {}, '/index/teacher_grade_list', res => {
      this.setData({
        level_list: res.data.data
      })
    })
  },
  //一键下单
  sure() {
    this.moveToLocation()
  },
  //选择位置并下单
  moveToLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            console.log(addressRes)
            var address = addressRes.result.address+addressRes.result.formatted_addresses.recommend;
            config.ajax('POST', {
              token: wx.getStorageSync('user_token'), //token 
              subjects_id: that.data.class_list[that.data.class_index].subjects_id, //科目id 
              grade_id: that.data.grade_list[that.data.grade_index].grade_id, //年级id
              teacher_grade_id: that.data.level_list[that.data.level_index].teacher_grade_id, //级别id
              reservetime: that.data.date + " " + that.data.start_time, //开始时间
              name: address,
              latitude: res.latitude,
              longitude: res.longitude,
              // reservetime: that.data.date + " " + that.data.start_time,     //结束时间
              //少一个标签选择
            }, '/order/place_order', res => {
              wx.navigateTo({
                url: '/pages/index/select_teacher/select_teacher?order_id=' + res.data.data.order_id,
                success: function (res) {},
                fail: function (res) {},
                complete: function (res) {},
              })
            })
          }
        });
      },
      fail: function (err) {
        config.mytoast('下单失败!您未确认地址!')
      }
    });
  },
  //获取公告
  getAdver() {
    config.ajax('POST', {}, '/index/announcement', res => {
      this.setData({
        adver: res.data.data.url
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getGrade_lsit()
    this.getClass_list()
    this.getLevel_list()
  },
  //关闭遮罩层
  hideMask() {
    this.setData({
      mask: false
    })
  },
  //选择学院
  select_tab(e) {
    this.setData({
      min_index: e.currentTarget.dataset.index
    })
  },
  //选择器函数
  bindPickerChange(e) {
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
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //选择时间
  bindStartTimeChange(e) {
    this.setData({
      start_time: e.detail.value
    })
  },
  //选择时长
  bindtime(e) {
    this.setData({
      time_index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
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