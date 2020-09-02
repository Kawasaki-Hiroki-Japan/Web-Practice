let label = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, ""], onOff = [16];
let spTD = 15, count, time, flag = 0, timerFlag = 0, bonus = 1;
let s, image = "image/puzzle.jpg";
let commandCode = 'ABACADAACC'; ccFlag = 0;
$(function(){
  for(let i = 0; i < 16; i++){
    $('<div id="piece' + i + '" class="piece"></div>').appendTo($('#puzzle'));
  }
  setPanel();
  $('#piece15').css({
    backgroundImage: 'url('+ image +')',
    backgroundPosition: getIndex(15)
  });
  $('#changeImage td').click(function(){
    if(commandCode[ccFlag] == $(this).text()){ ccFlag++; }
    else{ ccFlag = 0; }
    if(flag == 0){
      offBtn('#changeImage td');
      $(this).css({
        borderColor: '#ff0000',
        backgroundColor: '#ff7f7f'
      });
      s = $(this).text();
      image = 'image/puzzle' + s + '.jpg';
      start()
    }
  });
  $('#resetBtn').click(function(){
    ccFlag = 0;
    if(flag==1){
      onBtn('#changeImage td');
      offBtn('#buttonBox .btn');
      for(let i = 0; i < 16; i++){
        $('#piece' + i).css({
          backgroundImage: 'url(image/puzzle.jpg)',
          backgroundPosition: getIndex(i),
          border: "0"
        });
      }
      flag = 0;
      timerFlag = 0;
    }
  });
  $('.piece').click(function(){
    if(flag == 1){
      n = this.id.substring(5);
      if(onOff[n] == 1){
        label[spTD] = label[n];  label[n] = ""; spTD = Number(n);
        count++;  $('#count').text(count);
        setONclick();  setPanel();
        check();
      }
    }
  });
  $('#chanceBtn').click(function(){
    if(ccFlag == 10){
      bonus = 210;  onBtn('#bounsBtn');
      image = "image/puzzleSpcial.jpg";
      start();
      ccFlag = 0;
    }else if(flag == 1){
      let chanceFlag = 0;
      for(let i = 0; i < 16; i++){
        if(chanceFlag >= 2){ break; }
        else if(label[i] == 13){ label[i] = 14;  chanceFlag++;  count++; }
        else if(label[i] == 14){ label[i] = 13;  chanceFlag++;  count++; }
      }
      $('#count').text(count);
      setPanel();
      check();
    }
  });
  $('#bounsBtn').click(function(){
    if(bonus == 210){
        location.href = 'bonus.html';
    }
  });
});
function start(){
  flag = 1; count = 0; time = 0;
  $('#count').text(count);
  shuffle();
  for(let i = 0; i < 16; i++){
    if(label[i] === ""){ spTD = i; }
  }
  setONclick();
  setPanel();  $('.piece').css({ border: '1px solid #000000' });
  onBtn('#buttonBox .btn');
  if(timerFlag == 0){ timer(); }
}
function shuffle(){
  let rdm, i, tmp;
  for(i = 0; i < 16; i++){
      rdm = Math.floor(Math.random() * 16);
      tmp = label[i]
      label[i] = label[rdm];
      label[rdm] = tmp;
  }
}
function setPanel(){
  for(let i = 0; i < 16; i++){
    if(label[i] !== ""){
      $('#piece' + i).css({
        backgroundImage: 'url('+ image +')',
        backgroundPosition: getIndex(label[i])
      });
    }else{
      spTD = i;
      $('#piece' + i).css({
        backgroundImage: ''
      });
    }
  }
}
function setONclick(){
  for(let i = 0; i < 16; i++){ onOff[i] = 0; }
  let n;
  if(spTD >= 4){
    n = spTD - 4;  onOff[n] = 1;
  }
  if(spTD <= 11){
    n = spTD + 4;  onOff[n] = 1;
  }
  if(!(spTD == 0 || spTD == 4 || spTD == 8 || spTD == 12)){
    n = spTD - 1;  onOff[n] = 1;
  }
  if(!(spTD == 3 || spTD == 7 || spTD == 11 || spTD == 15)){
    n = spTD + 1; onOff[n] = 1;
  }
}
function check(){
  for(let i = 0; i < 16; i++){
    if(i == 14){ flag = 0; }
    if(label[i] != i){ break; }
  }
  if(flag == 0){
    for(let i = 0; i < 16; i++){
      $('#piece' + i).css({
        backgroundImage: 'url('+ image +')',
        backgroundPosition: getIndex(i)
      });
    }
    $('.piece').css({
      border: "0"
    });
    timerFlag = 0;
    if((s == 'A') && (bonus % 2 != 0)){
      bonus *= 2;
      $('#point td:eq(0)').css({ color: '#000000' });
    }else if((s == 'B') && (bonus % 3 != 0)){
      bonus *= 3;
      $('#point td:eq(1)').css({ color: '#000000' });
    }else if((s == 'C') && (bonus % 5 != 0)){
      bonus *= 5;
      $('#point td:eq(2)').css({ color: '#000000' });
    }else if((s == 'D') && (bonus % 7 != 0)){
      bonus *= 7;
      $('#point td:eq(3)').css({ color: '#000000' });
    }
    onBtn('#changeImage td');
    offBtn('#buttonBox .btn');
    if(bonus == 210){ onBtn('#bounsBtn'); }
  }
}
function timer(){
  if (flag == 1 && time < 3600){
    timerFlag = 1;
    setTimeout(function(){
      time ++;
      let min = Math.floor(time/60);  if(min < 10){ min = "0" + min; }
      let sec = Math.floor(time); sec = sec % 60;  if(sec < 10){ sec = "0" + sec; }
      $('#timerlabel').text(min + ':' + sec);
      timer();
    }, 1000);
  }
}
function onBtn(btn){
  $(btn).css({
    backgroundColor: '#4f4fff',
    borderColor: '#0000ff'
  });
}
function offBtn(btn){
  $(btn).css({
    borderColor: '#8f8f8f',
    backgroundColor: '#bfbfbf'
  });
}
function getIndex(n){
  let x = (n % 4) * 100;
  let y = (n - n % 4) * 25;
  return 'top -' + y + 'px left -' + x + 'px'
}

// (c) 2019 Kawasaki, Hiroki
