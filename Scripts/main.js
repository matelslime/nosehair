'use strict';
        
var randNum, total = 8;
var noseHairElm = document.getElementById('noseHair');
window.onresize = () => { setMobileContent(isMobileDevice()) };

$(() => {
    setMobileContent(isMobileDevice());
    init();

    $(noseHairElm).on('click', () => {
        $(noseHairElm).css({ 'animation': 'paused' });

        pluck();
        collect(randNum);
        reList();

        $(noseHairElm).off('click');
    })
    $('#btnRe').on('click', () => { location.reload(); })
    $('#switch').on('click', () => {
        $('#items').toggle();
        $('body').toggleClass('dark');
    })
})
//設為手機模式
function setMobileContent(isMobile) {
    isMobile?$('#bg').addClass('bg-M'):$('#bg').removeClass('bg-M');
    isMobile?$('#nose').addClass('nose-M'):$('#nose').removeClass('nose-M');
    isMobile?$('#noseHair').addClass('noseHair-M'):$('#noseHair').removeClass('noseHair-M');
    isMobile?$('#btnRe').addClass('btnRe-M'):$('#btnRe').removeClass('btnRe-M');
}
//初始化
function init() {
    randNum = Math.ceil(Math.random() * total);
    $(noseHairElm).attr('src', `nose/${randNum}.png`);
    reList();
}
//拔出鼻毛
function pluck() {
    $(noseHairElm).animate({ 'margin-top': '485px' }, 1500, () => {
        $(noseHairElm).animate({
            'margin-top': '160px',
            'margin-right': '2.5rem',
            'width': '80px'
        }, 2000, () => {
            $('#shine').toggle();
        })

        $('#nose').fadeOut(1000);
    })
}
//重整收藏
function reList() {
    let itemHtml = '';
    let LS = new localStorageOperate();

    $('#items').empty();

    for (let i = 0; i < total; i++) {
        itemHtml += `<div><img src="nose/${LS.noseHairList[i] != null ? LS.noseHairList[i] : 999}.png" ondragstart="return false"/></div>`;
    }

    $('#items').html(itemHtml);
}
//蒐藏鼻毛
function collect(randNum) {
    let LS = new localStorageOperate();
    LS.edit(randNum);
}
//操作localStorage
class localStorageOperate {
    noseHairList;

    constructor() {
        this.noseHairList = this.getList();
    }

    getList() {
        let JsonList = localStorage.getItem('noseHairList');
        return JsonList != null ? JSON.parse(JsonList) : new Array(total);
    }

    edit(num) {
        if (this.noseHairList[num - 1] == null) {
            this.noseHairList[num - 1] = num;
            localStorage.setItem('noseHairList', JSON.stringify(this.noseHairList));
        }
    }
}
//偵測行動裝置
function isMobileDevice() {
    const mobileDevice = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone']
    let isMobileDevice = mobileDevice.some(e => navigator.userAgent.match(e))
    return isMobileDevice;
}