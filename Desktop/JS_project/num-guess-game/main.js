//1.랜덤번호 지정
//2.유저가 번호를 입력한다.
//3.유저가 go라는 버튼을 누름
//4.만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//5.랜덤번호 < 유저번호 -> down
//6.랜덤번호 > 유저번호 -> up
//7.reset버튼을 누르면 게임이 reset 됨
//8.5번의 기회를 다 쓰면 게임이 끝남 (더 이상 추측할 수 없음 disable)
// + 유저가 게임을 다 맞춰도 disable
//9.유저가 1~100 범위 밖에 숫자를 입력하면 알려주고 기회깎지 않음.
//10.유저가 이미 입력한 숫자를 또 입력하면 알려주고 기회깎지 않음.
// 

let computerNum = 0
let playButton = document.getElementById("play-button") //html에 있는 요소를 갖고옴.
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area") //유저에게 결과를 보여주기 위함 //네모칸 바로위 문자!
let resetButton = document.getElementById("reset-button")
let chances = 5 //5번의 기회
let gameOver = false //5번의 기회를 날리면 게임오버
let chanceArea = document.getElementById("chance-area") //html에서 찬스가 줄어들 때마다 값이 보일 수 있도록 해주기 위해
let history = [] //10번을 위해 내가 입력한 숫자를 기록해놓음 배열로

playButton.addEventListener("click", play) //playButton에다가 이벤트를 더해줌 - 클릭이벤트 -> play함수를 변수로서 넘김
resetButton.addEventListener("click", reset) //resetButton에다가 이벤트를 더해줌 - 리셋이벤트 -> reset함수를 변수로서 넘김
userInput.addEventListener("focus", focus_reset) 

function pickRandomNum()
{
    computerNum = Math.floor(Math.random()*100)+1; //랜덤한 숫자 나오게 하는 함수(0~1미만 -> (+1) - > 1~100) + floor버림
    console.log("answer", computerNum)
}
function play()
{
    let userValue = userInput.value //유저의 값 <= 유저가 치는 값

    //입력한 숫자 유효성 검사
    if (userValue < 1 || userValue > 100)
    {
        resultArea.textContent = "1과 100사이이 숫자를 입력하시오"
        return 0;
    }
    //유효성 검사2 - 같은 값 못 들어가게
    if (history.includes(userValue))
    {
        resultArea.textContent = "이미 입력한 숫자입니다."
        return 0;
    }

    chances--; //play함수 실행할 때마다 chances가 
    chanceArea.textContent = `남은 기회 : ${chances}번` //정적, 동적 한 번에 쓸 수 있음
    console.log("chance", chances)

    if (userValue < computerNum)
    {
        resultArea.textContent = "UP!!" //유저에게 결과를 보여주기 위함
    }
    else if (userValue > computerNum)
    {
        resultArea.textContent = "DOWN!!"
    }
    else if (userValue == computerNum)
    {
        resultArea.textContent = "dingdongdang!!"
        playButton.disabled = true
    }
    //console.log(userValue)
    if (chances < 1) //찬스들을 다 써서 기회가 1번 미만이면
    {
        gameOver = true //게임오버
    }
    if (gameOver == true) //만약에 게임오버가 되면
    {
        playButton.disabled = true //버튼 비활성화 시켜줌
    }

    history.push(userValue) //history배열에다가 유저가 입력한거 푸시해줌
}

function reset()
{
    //유저 input 창이 깨끗하게 정리됨
    //새로운 번호 생성
    userInput.value = "" //유저가 치는 값 비워줌
    pickRandomNum() //랜덤함수 호출
    resultArea.textContent = "리셋되었습니다."
}

function focus_reset() 
////숫자를 친 담에 마우스 다시 올렸을 때 숫자 없애줌
{
    userInput.value="" //네모칸 비워줌
}

pickRandomNum()