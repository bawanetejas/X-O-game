console.log("karo suru");
let newgame= document.querySelector(".newgame");
let wining=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let boxes=document.querySelectorAll(".box");
console.log(boxes)
let gameProgress;
let curentPlayer=document.querySelector(".player");
let player;
let count=0;
function initialState(){
    count=0;
    newgame.classList.remove("active");
    player="X";
    gameProgress=["","","","","","","","",""];
    curentPlayer.innerHTML=`current player ${player}`
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });

}
    initialState();
    
    boxes.forEach((box,index)=>{

     box.addEventListener("click",() => {
        handlecheck(index);
     })
    });

function handlecheck(index){
    if(gameProgress[index] === ""){
        
        gameProgress[index]=player;
        boxes[index].innerHTML=player;
        turnPlayer();
        win();
        boxes[index].style.pointerEvents="none";
        
    }
}

function turnPlayer(){
    if(player === "X"){
        player="O";
    }
    else if(player === "O"){
        player="X";
    }
    curentPlayer.innerText=`current player ${player}`;
}

function win(){
    let ans="";
    wining.forEach((positions)=>{

        if(( gameProgress[positions[0]]!=="") && (gameProgress[positions[1]] !== "" )&&
            (gameProgress[positions[2]]!=="") &&
            (gameProgress[positions[0]] === gameProgress[positions[1]]) &&
             (gameProgress[positions[1]] === gameProgress[positions[2]])){

            if(gameProgress[positions[0]] === "X"){
                  ans="X";
            }
            else{
                ans="O";
            }
            boxes[positions[0]].classList.add("win");
            boxes[positions[2]].classList.add("win");
            boxes[positions[1]].classList.add("win");
        boxes.forEach((box)=>{
            box.style.pointerEvents="none";
        })
        newgame.classList.add("active");
        

        }
        
           
    })

     if(ans !== ""){
        curentPlayer.innerHTML=`won ${ans}`;
        return;
     }
    count=0;
    gameProgress.forEach((box)=>{
        if(box !== ""){
            count++;
        }
    })

    if(count == 9){
        curentPlayer.innerHTML="TIE !";
        newgame.classList.add("active");
    }
}



newgame.addEventListener("click", initialState);