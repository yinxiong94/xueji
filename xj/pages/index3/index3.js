// pages/index3/index3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastX: 0, //滑动开始x轴位置
    lastY: 0, //滑动开始y轴位置
    text: "没有滑动",
    currentGesture: 0,
    hh: 0,
    isshow:true,
    ppp:120,
    index:0
  },
  handletouchmove: function (event) {
    var currentX = event.touches[0].pageX
    var currentY = event.touches[0].pageY
    var tx = currentX - this.data.lastX
    var ty = currentY - this.data.lastY
    var text = ""
    //左右方向滑动
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < 0)
        text = "向左滑动"
      else if (tx > 0)
        text = "向右滑动"
    }
    //上下方向滑动
    else {
      if (ty < 0)
        text = "向上滑动"
      else if (ty > 0)
        text = "向下滑动"
    }
    //将当前坐标进行保存以进行下一次计算
    // this.data.lastX = currentX
    // this.data.lastY = currentY
    this.setData({
      text: text,
    });
    if (this.data.text == "向左滑动") {
      if(this.data.hh<=0 && this.data.hh>-750){
          this.setData({hh:tx,ppp:-tx/2+120})
      } else if(this.data.hh<=-750 && this.data.hh>-1500) {
        this.setData({hh:-750+tx,ppp:-tx/2+360})
      }
      else {  this.setData({hh:-1500})}

    } else if (this.data.text == "向右滑动") {
        if(this.data.hh<-750 && this.data.hh>=-1500){
          this.setData({hh:-1500+tx,ppp:610-tx/2})
        }else if(this.data.hh<0 && this.data.hh>=-750){
          this.setData({hh:-750+tx,ppp:360-tx/2})
        }
        else {
          this.setData({hh:0})
        }
    }
    console.log(this.data.text,this.data.hh)
  },

  //滑动开始事件
  handletouchtart: function (event) {
     this.data.lastX = event.touches[0].pageX
     this.data.lastY = event.touches[0].pageY

  },
  //滑动结束事件
  handletouchend: function (event) {
    this.data.currentGesture = 0;   
    if(this.data.text=="向左滑动"){
      if(this.data.hh<0  && this.data.hh>-750){
         this.setData({hh:-750,ppp:360,index:1})
       } else{
          this.setData({hh:-1500,ppp:610,index:2})
          }
    } else if( this.data.text=="向右滑动"){
      if(this.data.hh<-750 && this.data.hh>=-1500){
        this.setData({hh:-750,ppp:360,index:1})
      } else { this.setData({hh:0,ppp:120,index:0})}
    }
    this.setData({
      text: "没有滑动",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      setTimeout(()=>{
        this.setData({isshow:false})
      },2000)
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