App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch',options);
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  onHide() {
    // 隐藏
  },
  onError(msg) {
    console.log(msg)
  },
  globalData: {
    foo: true,
  }
});
