function openPopupWindow() {
    let windowWidth = 500; // 弹窗宽度
    let windowHeight = 300; // 弹窗高度
    let windowLeft = (screen.width / 2) - (windowWidth / 2); // 居中弹窗
    let windowTop = (screen.height / 2) - (windowHeight / 2); // 居中弹窗
  
    let popupWindow = window.open(
      'https://example.com', // 要打开的网址
      'popupWindowName', // 弹窗的名字
      `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop},scrollbars=yes,resizable=yes` // 自定义弹窗属性
    );
  
    if (window.focus) {
      popupWindow.focus(); // 确保新打开的窗口在前面
    }
  
    return false; // 阻止默认事件
  }
  