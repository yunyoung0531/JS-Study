//1.url 준비
//2.헤더준비
//3.백엔드. 서버에 요청
//4.데이터를 보여줌

let news = [] //news라는 이름의 array
let page = 1
let total_pages = 0
let menus = document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click", (event)=>getNewsByTopic(event)))

let searchButton = document.getElementById("search-button")
let url

//API 부르는 함수 getLatestNews
const getLatestNews = async() => {
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=tech&page_size=10`)
    let header = new Headers({'x-api-key' : 'RiZFv5JQlOgXDxpPjA8jM4JMcljwcs7H0u8hRuk0-n0'})

    let response = await fetch(url,{headers:header}) //ajax, http, fetch // await 기다리는 함수 #async
    let data = await response.json() 

    news = data.articles
    console.log(news)

    MyRender()
}
// 각 함수에서 필요한 url을 만든다.
// api호출 함수를 부른다.
// -> 각각의 함수에서는 url만 바꿔줌
const getNews = async() => {
    console.log("들리니..")
    let header = new Headers({'x-api-key' : 'RiZFv5JQlOgXDxpPjA8jM4JMcljwcs7H0u8hRuk0-n0'})
    url.searchParams.set('page', page); //동적인 페이지값 넣겠다.
    console.log("url은 ", url)
    let response = await fetch(url,{headers:header})
    let data = await response.json()
    
    //console.log("response는", response)
    //console.log("data", data)
    news = data.articles //뽑는 작업 == 보여주는 작업
    
    total_pages = data.total_pages
    page = data.page

    console.log(news)
    MyRender()
    pagination()
}

const getNewsByTopic = async(event) =>{
    //console.log("클릭됨", event.target.textContent)
    //let topic = event.target.textContent.toLowerCase()
    //let country = event.target.textContent.toLowerCase()
    let country = event.target.textContent.toUpperCase()
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=${country}&page_size=10&topic=tech`)
    //console.log("유알엘" ,url)
    
    getNews()
    //console.log(data)
}

const getNewsByKeyword = async() => {
    //console.log("click")
    //1. 검색 키워드 읽어오기
    //2. url에 검색 키워드 붙이기
    //3. 헤더준비
    //4. url부르기
    //5. 데이터 가져오기
    //6. 데이터 보여주기

    let keyword = document.getElementById("search-input").value
    console.log("keyword", keyword)
    url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10&topic=tech`) //newcatcherapi.com 에서 searchnews 헤드라인 가져오기
    //https://api.newscatcherapi.com/v2/search?q=Apple&from='2021/12/15'&countries=CA&page_size=1
    getNews()
}

//UI담당 함수
const MyRender = () =>{
    let newsHTML=''
    newsHTML = news.map(item=> {
        return `<div class = "row news"> <!--이 안에 있는 모든 아이템을 한 줄로-->
        <div class="col-lg-4"> <!--그림-->
            <img class="news-img-size" src="${item.media}">
        </div>
        
        <div class="col-lg-8"> <!--글-->
            <h2> <!--글의 타이틀-->
                ${item.title}
            </h2>
            <p> <!--글의 내용(설명문)-->
                ${item.summary}
            </p>
            <div> <!--일반적인 설명-->
                <!--뉴스기사 잡것들 이것저것 출처나 날짜 등-->
                ${item.rights} ${item.published_date}
            </div>
        </div>
    </div>`
    }).join('')

    document.getElementById("news-board").innerHTML = newsHTML //news-board의 모든 뉴스들string을 붙여넣기 해줌
}

//error를 사용자에게 보여주는 함수
//에러핸들링 잘 안 돼...
// const errorRender = (message) => {
//     let errorHTML = `<div>${message}</div>`
//     document.getElementById("news-board").innerHTML = errorHTML
// }

//페이지네이션
const pagination = () => {
    //li태그들을 담아둘 변수
    let paginationHTML = ``
    //총 페이지 수 total_page
    //내가 현재 몇 페이지를 보고 있는지 page
    //내가 몇 번째 그룹에 있는지 page group
    let pageGroup = Math.ceil(page / 5)
    //마지막 페이지가 뭔지 last
    let last = pageGroup * 5
    //첫 페이지가 뭔지 first
    let first = last - 4
    //first-last 페이지 프린트
    for (let i = first; i <= last; i++) {
        paginationHTML += `<li class="page-item ${page == i ? "active" : ""}"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`
    }
    document.querySelector(".pagination").innerHTML = paginationHTML
}

//페이지네이션 기능 함수
const moveToPage = (pageNum) =>{
    //1.이동하고 싶은 페이지를 알기
    page = pageNum
    console.log(page)
    //2.이동하고 싶은 페이지를 가지고 api 다시 호출해주기
    getNews()
}

searchButton.addEventListener("click", getNewsByKeyword) //이벤트 리스너 - 클릭이벤트
getLatestNews()

