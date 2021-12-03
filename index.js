var myhour,myminute,mysecond;

//往dom里面设置时间
function setTime(){
  $(".flipper").removeClass("flipping");
  $(".flipper .new").remove();
  var date = new Date(); //拿到当前时间
  var seconds = date.getSeconds().toString();  //拿到second  number不具备length属性
  //将时间分离出来,分成时分秒
  if(seconds.length == 1){   //如果不用toString()
    seconds = '0' + seconds;
  }

  var minutes = date.getMinutes().toString();
  if(minutes.length == 1){
    minutes = '0' + minutes;
  }
  var hour = date.getHours();
  if(hour > 12){
    hour = hour -12;
  }
  if(hour == 0){
    hour = 12;
  }

  hour = hour.toString();  //将hour转变为字符串   
  if(hour.length == 1){
    hour = '0' + hour;
  }
  //把hour放到myhour结构里面去显示
  if($(myhour[0]).text() !== hour){//$(myhour[0])    jQuery    使用.text()方法，读取元素的纯文本内容，   减小性能开销
    flipNumber($(myhour[0]).closest('.flipper'),hour);   //jquery 中closest('flipper')作用: 取到离$(myhour[0])最近的flipper容器
    // active($(myhour[0]).closest('.flipper'))
  }
  if($(myminute[0]).text() !== minutes){
    flipNumber($(myminute[0]).closest('.flipper'),minutes);
    // active($(myminute[0]).closest('.flipper'))
  }
  if($(mysecond[0]).text() !== seconds){
    flipNumber($(mysecond[0]).closest('.flipper'),seconds);
  }
  setTimeout(function () {
    setTime();
  }, 500);
}

//将时间植入到text里面去
function flipNumber(el,newnumber){//el代表flipper
  var thisTop =el.find('.top').clone();    //在flipper中找top  多放一份top做动画效果    clone 克隆      原生JS el.getElemntByClassName('top').clone()与el.find('.top')  作用相同
  var thisBottom =el.find('.bottom').clone();
  thisTop.addClass('new');  //jquery   JS中添加类名巨麻烦
  thisBottom.addClass('new');
  thisBottom.find('.text').text(newnumber);//将test里面的内容改成newnumber里面的内容

  el.find('.top').after(thisTop)  //找到top同级的thisTop盒子
  el.find('.top.new').append(thisBottom)//在同时具有.top.new类名的盒子里添加thisBottom这个盒子
  el.addClass('flipping')//给el(flipper)添加一个flipping类名
  el.find('.top:not(.new)').find('.text').text(newnumber);//找到top中没有new类名的top，然后再在top中将newnumber赋值给text
  setTimeout(function () {
    el.find('.bottom:not(.new)').find('.text').text(newnumber);
  }, 500)// 下面的先不动翻页有时间,所以500ms才显示
}

//自执行函数 ,用到了jquery
$(function() {//也可以给每个盒子添加一个id，然后通过document.getElementId.('')查找并赋值
  myhour = $('.clock .flipper:nth-child(1) div:not(.new) .text')//找到时
  myminute = $('.clock .flipper:nth-child(2) div:not(.new) .text')//找到分
  mysecond = $('.clock .flipper:nth-child(3) div:not(.new) .text') //找到秒

  // 往dom里面去设置时间
  setTime();
})();