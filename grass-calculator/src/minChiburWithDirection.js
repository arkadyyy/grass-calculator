    function minChiburWithDirection(arrX, arrY) {

    console.log("arrX,arrY:",arrX,arrY);
    let optX;
    let optY;
    let optXPchat;
    let optYPchat;

    for (let i = 0; i < arrX.length; i++) {
      optX += arrX[i].opt2.amount + arrX[i].opt3.amount + arrX[i].opt4.amount;  
        optY += arrY[i].opt2.amount + arrY[i].opt3.amount + arrY[i].opt4.amount;
        optXPchat += arrX[i].pchat;    
        optYPchat += arrY[i].pchat;   
        console.log("optX:",optX);
        console.log("optY:",optY);
        console.log("optXPchat:",optXPchat);
        console.log("optyPchat:",optYPchat);
    }
    if (optX < optY) {
        return optX;
    }
    else if (optX > optY) {
        return optY;
    }
    else {
        if (optXPchat < optYPchat) {
            return optX;
        }
        else if (optXPchat > optYPchat) {
            return optY;
        }
        else {
            return optX;
        }
    }
}
export default minChiburWithDirection;