const menuBlock = document.querySelector(".header");
const api = 'https://api.shrtco.de/v2/shorten?url=';
let linkList = [];
let linkBlockList = [];
let countLinks = 0;
let orderNumber = 0;
let loadTrue = 0;

function openMenu(){
    menuBlock.classList.add("showMenu");
    document.querySelector(".header__icon__menu").style.transform = 'rotate(360deg)';
    document.querySelector(".header__icon__menu").style.opacity = '0';
    setTimeout(function(){
        document.querySelector(".header__icon__menu").style.display = 'none';
    }, 400)
    setTimeout(function(){
        document.querySelector(".header__icon__close").style.display = 'block';
    }, 500)
    setTimeout(function(){
        document.querySelector(".header__icon__close").style.transform = 'rotate(720deg)';
        document.querySelector(".header__icon__close").style.opacity = '1';
    }, 550)
    document.body.style.position = 'fixed';
}

function closeMenu(){
    menuBlock.classList.remove("showMenu");
    document.querySelector(".header__icon__close").style.transform = 'rotate(360deg)';
    document.querySelector(".header__icon__close").style.opacity = '0';
    setTimeout(function(){
        document.querySelector(".header__icon__close").style.display = 'none';
    }, 400)
    setTimeout(function(){
        document.querySelector(".header__icon__menu").style.display = 'block';
    }, 500)
    setTimeout(function(){
        document.querySelector(".header__icon__menu").style.transform = 'rotate(720deg)';
        document.querySelector(".header__icon__menu").style.opacity = '1';
    }, 550)
    document.body.style.position = 'static';
}

function checkInput(){
    if(document.querySelector(".link__input").value.length === 0){
        document.querySelector(".generator__input").classList.add("generator__error");
    }else{
        document.querySelector(".generator__input").classList.remove("generator__error");
        getShortLink();
    }
}


function getShortLink(){
    let finalLink = api + document.querySelector(".link__input").value;
    console.log(finalLink);
    console.log(finalLink);
    fetch(finalLink)
    .then((response) => {
        response.json()
        .then(data => {
            if(!linkList.includes(data.result.short_link)){
                linkList.push(data.result.short_link);
                insertResult()
            }
        })
    })
}

function insertResult(){
    console.log(document.querySelector(".link__input").value.length)
    let tempName;
    if(document.querySelector(".link__input").value.length >= 24 && window.screen.width < 768 ){
        tempName = document.querySelector(".link__input").value.slice(0, 24)+'...';
    }else if(document.querySelector(".link__input").value.length >= 40 && window.screen.width < 1200){
        tempName = document.querySelector(".link__input").value.slice(0, 40)+'...';
    } else if(document.querySelector(".link__input").value.length >= 80){
        tempName = document.querySelector(".link__input").value.slice(0, 50)+'...';
    }else{
        tempName = document.querySelector(".link__input").value;
    }
    console.log(document.querySelector(".link__input").value)
    linkBlockList.push(`
                <li class="generator__output__list__block" id=${countLinks}>
                    <p class="generator__output__list__block__input">${tempName}</p>
                    <div class="generator__output__list__block__response">
                        <p class="generator__output__list__block__response__link">
                            ${linkList[countLinks]}
                        </p>
                        <p class="generator__output__list__block__response__copy" onclick="copy(${countLinks})" id='${countLinks}copy'>
                            Copy
                        </p>
                    </div>
                    <div class="generator__output__list__block__close" onclick="deleteBlock(${countLinks})">
                        <svg xmlns="http://www.w3.org/1800/svg" class="ionicon" viewBox="0 0 512 512"><title>Close</title><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>
                    </div>
                </li>
        `);
    document.querySelector('.generator__output__list').innerHTML += linkBlockList[countLinks];
    document.getElementById(`${countLinks}`).style.order = `${orderNumber}`;
    document.querySelector(".loading-circles").style.opacity ='1';
    loading()

    setTimeout(function(){
        document.querySelector(".loading-circles").style.opacity ='0';
        document.getElementById(`${countLinks}`).style.opacity = '1';
        countLinks++;
        orderNumber--;
        document.querySelector(".link__input").value = '';
    }, 600)
}

function deleteBlock(o){
    document.querySelector(".generator__output__list").removeChild(document.getElementById(o));
    linkList[o] = '';
    linkBlockList[o] = '';
}

function copy(f){
    console.log('yes')
    let copyLink = linkList[f];
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = copyLink;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    document.getElementById(f).classList.add("copied");
    console.log(document.getElementById(`${f}copy`))
    setTimeout(function(){
        document.getElementById(`${f}copy`).innerHTML = 'Copied!';
    }, 300)
    
}   

function loading(){
    console.log('asd')
    document.getElementById('circle1').style.backgroundColor = 'hsla(180, 66%, 49%, 0.4)';
    document.getElementById('circle2').style.backgroundColor = 'hsla(180, 66%, 49%, 1)';
    document.getElementById('circle3').style.backgroundColor = 'hsla(180, 66%, 49%, 0.7)';
    setTimeout(function(){
        document.getElementById('circle1').style.backgroundColor = 'hsla(180, 66%, 49%, 0.7)';
        document.getElementById('circle2').style.backgroundColor = 'hsla(180, 66%, 49%, 0.4)';
        document.getElementById('circle3').style.backgroundColor = 'hsla(180, 66%, 49%, 1)';
        setTimeout(function(){
            document.getElementById('circle1').style.backgroundColor = 'hsla(180, 66%, 49%, 1)';
            document.getElementById('circle2').style.backgroundColor = 'hsla(180, 66%, 49%, 0.7)';
            document.getElementById('circle3').style.backgroundColor = 'hsla(180, 66%, 49%, 0.4)';
            setTimeout(function(){
                document.getElementById('circle1').style.backgroundColor = 'hsla(180, 66%, 49%, 0.4)';
                document.getElementById('circle2').style.backgroundColor = 'hsla(180, 66%, 49%, 1)';
                document.getElementById('circle3').style.backgroundColor = 'hsla(180, 66%, 49%, 0.7)';
                setTimeout(function(){
                    document.getElementById('circle1').style.backgroundColor = 'hsla(180, 66%, 49%, 0.7)';
                    document.getElementById('circle2').style.backgroundColor = 'hsla(180, 66%, 49%, 0.4)';
                    document.getElementById('circle3').style.backgroundColor = 'hsla(180, 66%, 49%, 1)';
                    setTimeout(function(){
                        document.getElementById('circle1').style.backgroundColor = 'hsla(180, 66%, 49%, 1)';
                        document.getElementById('circle2').style.backgroundColor = 'hsla(180, 66%, 49%, 0.7)';
                        document.getElementById('circle3').style.backgroundColor = 'hsla(180, 66%, 49%, 0.4)';
                        setTimeout(function(){
                            document.getElementById('circle1').style.backgroundColor = 'hsla(180, 66%, 49%, 0.4)';
                            document.getElementById('circle2').style.backgroundColor = 'hsla(180, 66%, 49%, 1)';
                            document.getElementById('circle3').style.backgroundColor = 'hsla(180, 66%, 49%, 0.7)';
                            setTimeout(function(){
                                document.getElementById('circle1').style.backgroundColor = 'hsla(180, 66%, 49%, 0.7)';
                                document.getElementById('circle2').style.backgroundColor = 'hsla(180, 66%, 49%, 0.4)';
                                document.getElementById('circle3').style.backgroundColor = 'hsla(180, 66%, 49%, 1)';
                                setTimeout(function(){
                                    document.getElementById('circle1').style.backgroundColor = 'hsla(180, 66%, 49%, 1)';
                                    document.getElementById('circle2').style.backgroundColor = 'hsla(180, 66%, 49%, 0.7)';
                                    document.getElementById('circle3').style.backgroundColor = 'hsla(180, 66%, 49%, 0.4)';
                                    setTimeout(function(){
                                        document.getElementById('circle1').style.backgroundColor = 'hsla(180, 66%, 49%, 0.4)';
                                        document.getElementById('circle2').style.backgroundColor = 'hsla(180, 66%, 49%, 1)';
                                        document.getElementById('circle3').style.backgroundColor = 'hsla(180, 66%, 49%, 0.7)';
                                        setTimeout(function(){
                                            document.getElementById('circle1').style.backgroundColor = 'hsla(180, 66%, 49%, 0.7)';
                                            document.getElementById('circle2').style.backgroundColor = 'hsla(180, 66%, 49%, 0.4)';
                                            document.getElementById('circle3').style.backgroundColor = 'hsla(180, 66%, 49%, 1)';
                                            setTimeout(function(){
                                                document.getElementById('circle1').style.backgroundColor = 'hsla(180, 66%, 49%, 1)';
                                                document.getElementById('circle2').style.backgroundColor = 'hsla(180, 66%, 49%, 0.7)';
                                                document.getElementById('circle3').style.backgroundColor = 'hsla(180, 66%, 49%, 0.4)';
                                            }, 180)
                                        }, 180)
                                    }, 180)
                                }, 180)
                            }, 180)
                        }, 180)
                    }, 180)
                }, 180) 
            }, 180)       
        }, 180)
    }, 180)

}
