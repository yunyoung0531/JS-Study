//버튼0 누르면 -> 버튼0에 orange 클래스명 추가
//+ 모든 버튼에 붙은 orange 클래스명 제거
//div0에 첫 번째 내용에 show 클래스명 추가
//+ 모든 div에 붙은 show 클래스명 제거


let tabBtn = $('.tab-button');
let tabCtt = $('.tab-content');

// for (let i = 0; i < tabBtn.length; i++) {
//     tabBtn.eq(i).on('click', function() {
//         Tab(i)
//     })
// }

function Tab(i) {
    tabBtn.removeClass('orange');
    tabBtn.eq(i).addClass('orange');
    tabCtt.removeClass('show');
    tabCtt.eq(i).addClass('show');
}

$('.list').click(function(e){
    //지금 누른게 버튼0 이면 버튼0에 orange색칠하고 show부착
    //즉, Tab(0)
    // if (e.target == document.querySelectorAll('.tab-button')[0]){
    //     Tab(0)
    // }

    // data-id //테크닉!
    Tab(e.target.dataset.id);
})



