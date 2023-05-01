let popupCounter = 0;

function openPopupWindow(url) {
  let windowWidth = 400; 
  let windowHeight = 300; 

  let windowLeft = Math.floor(Math.random() * (screen.width - windowWidth));
  let windowTop = Math.floor(Math.random() * (screen.height - windowHeight));


  popupCounter++;

  let popupWindow = window.open(
    url, 
    'popupWindow' + popupCounter, // popup window name
    `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop},scrollbars=yes,resizable=yes` // 自定义弹窗属性
  );

  if (window.focus) {
    popupWindow.focus(); // make sure the new popup window is in the front
  }

  return false; 
}

  