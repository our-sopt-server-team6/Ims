var sopt = {
    name : "임얼쑤",
    number : 183,
    printName : function(){
        console.log(this.name + this.number);
    }
}

sopt.printName();

console.log(sopt)
console.log("",sopt)
console.log(""+JSON.stringify(sopt))

var dogs = [
    { name: '식빵', family: '웰시코기', age: 1, weight: 2.14},
    { name: '콩콩', family: '포메라니안', age: 3, weight: 2.5},
    { name: '두팔', family: '푸들', age: 7, weight: 3.1}
];


console.log('dogs : ' + dogs);
console.log('dogs : ', dogs);
console.log('dogs :' + JSON.stringify(dogs));


dogs.forEach( 
    dog => console.log(dog.name+'이는 종이 '+dog.family+'이고, 나이가 '+dog.age+'세입니다 ~')
    );