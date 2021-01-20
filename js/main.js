'use strict'

{
  const timer = document.getElementById('timer')
  const start = document.getElementById('start')
  const stop = document.getElementById('stop')
  const reset = document.getElementById('reset')//html側でidを持つボタンを一文字で呼び出せるようにした
  let startTime;
  let timeoutid;
  let elapsedTime = 0;

  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);//更新し続ける時刻からクリックした時点の時刻を引く→経過時間が出る(new Dateでなぜ囲むかは不明)
    //stopを押してから再スタートした際に0から始まらないようにstopした時点の数値をelapsedTimeで足す
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
     timer.textContent = `${m}:${s}.${ms}`;

     timeoutid = setTimeout(() => {
       countUp();
      }, 10);
    };
      

    function setButtonStateInitial() {
      start.classList.remove('inactive');
      stop.classList.add('inactive');
      reset.classList.add('inactive');
    }

    function setButtonStateRunning() {
      start.classList.add('inactive');
      stop.classList.remove('inactive');
      reset.classList.add('inactive');
    }

    function setButtonStateStopped() {
      start.classList.remove('inactive');
      stop.classList.add('inactive');
      reset.classList.remove('inactive');
    }

    setButtonStateInitial();

    // setTimeout(countUp,10) 
    //こう書いても同様の意味だが、①setTimeoutに後から処理を増やすことができる。②countUp()に後から引数を渡せるという理由でアロー関数を使っている
    
    // setTimeout(function() {
    //   countUp();
    // },10);
    //アロー関数を無名関数で書き替え



  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true) {//startのclassListにinactiveが含まれていたら
      return;
    }
    setButtonStateRunning();
    startTime = Date.now();//クリックした時点の現在時刻をstartTimeで固定する命令。基準となる日時から経過ミリ秒を使って計算
    countUp();//上の処理を呼び出す
  });

  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutid);//setTimeoutをキャンセルする命令(timeoutid)は目印
    elapsedTime += Date.now() - startTime;//stopをクリックした時点の時刻 - startをクリックした時点の時刻でストップウォッチの数値を求める
    //+=としてタイマーが走っていた時間を全て足し上げている（「＝」だけだと直近の時間しか保持できなくなり、start→stop→start→stop→startとしたときに２回目の時間から始まってしまうのを防ぐ）

  });

  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateInitial();
    timer.textContent = '00:00.000';
    elapsedTime = 0;
  });
}