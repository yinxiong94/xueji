Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow:false,
    isshow1:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  why:function(){
    this.setData({isshow:true})
  },
  qx:function(){
    this.setData({isshow:false,isshow1:false})
  },
  fxt:function(){
    this.setData({isshow1:true})
  },
  onLoad: function (options) {
    // console.log(this.modal-d)
    
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
    console.log()
      this.setData({index:true})
      console.log(this.data.index)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
