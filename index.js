// SELECIONANDO A PRIMEIRA FASE DO JOGO 

const selecBox = document.querySelector(".select-box");
const selectXBtn = selecBox.querySelector(".playerX");
const selectOBtn = selecBox.querySelector(".playerO");

// SETANDO O INDICATIVO DO X E O ANTES DO TABULEIRO 

const playBoard = document.querySelector(".play-board");// DIV PRINCIPAL (PAI)
const allBox = document.querySelectorAll("section span");//TABULEIRO 
const players = document.querySelector(".players");// CONTROLE DA VEZ X OU O 

// TRANTO O RESULTADO DO JOGO 
const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".won-text");
const replayBtn = resultBox.querySelector("button");

// FUNCTION QUE FAZ COM QUE A PRIMEIRA PARTE DO JOGO SUMA QUANDO FOR SELECT 
window.onload = ()=>{

    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
        
    }

    selectXBtn.onclick = ()=>{ // QUANDO FOR SELECT O X 
        selecBox.classList.add("hide");
        playBoard.classList.add("show");
    }
    selectOBtn.onclick = ()=>{  // QUANDO FOR SELECT A O   
        selecBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");
    }
}

let playerSign = "X";
let runBot = true;

//FUNCTION QUE PERMITE QUE VC ESCOLHA UM ELEMENTO (X OU O) E VÁ PARA O TABULEIRO 
function clickedBox (element){
    if ( players.classList.contains("player")) {
        playerSign = "O";
        element.innerHTML = `<i>O</i>`;
        players.classList.remove("active");
        element.setAttribute("id", playerSign);

    }else {
        playerSign = "X"
        element.innerHTML = `<i>X</i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    element.style.pointerEvents = "none"
    //COLOCANDO UM DELAY NA JOGADA DO ADVERSÁRIO 
    let randomDelayTime = ((Math.random()* 1000)+ 200).toFixed();
    setTimeout(()=>{
        bot(runBot)
    }, randomDelayTime);
    
}

// BOT QUE GERA A ALEATORIEDADE DO ADIVERSÁRIO 
function bot(runBot){
    if (runBot){
        let arr = [];
        playerSign = "O";
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount === 0) {
            arr.push(i);
            }
        
        }
        let randomBox = arr[Math.floor(Math.random() * arr.length)];

        if (arr.length > 0){
            if ( players.classList.contains("player")) {
                playerSign = "X";
                allBox[randomBox].innerHTML = `<i>X</i>`;
                players.classList.add("active");
                allBox[randomBox].setAttribute("id", playerSign);
    
            }else {
                allBox[randomBox].innerHTML = `<i>O</i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
        selectWinner();
        }

    allBox[randomBox].style.pointerEvents = "none";
    }
}

function getClass (idname){
    return document.querySelector(".box" + idname).id;
}

function checkClass (val1, val2,val3,sign){
    if (getClass(val1) === sign && getClass(val2) === sign
    && getClass(val3) === sign) {
        return true;
    }
}

function selectWinner (){
    if (checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign)
        || checkClass(7,8,9,playerSign) || checkClass(1,4,7,playerSign) 
        || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) 
        || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign)) {      
        
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            },1000);
            wonText.innerHTML = `Jogador <p>${playerSign}</p> Ganhou!`;
    }else{
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" 
          && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" 
          && getClass(9) != "" ){

            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            },1000);
            wonText.textContent = `Jogo Empatou!`;
        }

    }
}

replayBtn.onclick = ()=>{
    window.location.reload();
}