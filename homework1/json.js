var jsonObject = {
    name : "임얼쑤",
    age: "젊음",
    appearance:"멋짐",
    degree:"4.5",
    printName:function(){
        console.log("이름은 :",this.name);
    }
}

console.log("그냥 출력\n",jsonObject);
console.log("\n +붙여서 출력" +jsonObject);
console.log("\n stringfy 해서 출력",JSON.stringify(jsonObject))

// 출력 결과:

// 그냥 출력
// Object {name: "임얼쑤", age: "젊음", appearance: "멋짐", degree: "4.5", printName: }

//  +붙여서 출력[object Object]

//  stringfy 해서 출력 {"name":"임얼쑤","age":"젊음","appearance":"멋짐","degree":"4.5"}