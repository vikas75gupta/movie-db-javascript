'use strict';
// x=10;

var taskList = new Array("Do Swimming", "Book Reading" , "No Coding" , "Watch Web Series" , "Do Late Come");
// console.log(taskList);
generateList()


function generateList(){
    for(let value of taskList){
        console.log(value);
        var liTag = document.createElement('li');
        console.log(liTag);
        
        var span1 = document.createElement('span');
        console.log(span1);
        span1.innerHTML = value;
        
        var span2 = document.createElement('span');
        console.log(span2);
        span2.innerHTML = 'X';
        span2.addEventListener('click' , deleteData);
    
        console.log(span1);
        console.log(span2);;
    
        liTag.append(span1);
        liTag.append(span2);
    
        document.querySelector('ul').append(liTag);
        
    }
}



document.querySelector('.btn').addEventListener('click', function(){
    // console.log('test');
    var txtData = document.querySelector('.txt').value;
    console.log(txtData);
    console.log(taskList.indexOf(txtData) );
    if(taskList.indexOf(txtData) == -1){
        taskList.push(txtData);
        console.log(taskList);
        document.querySelector('ul').innerHTML = '';
        generateList();
        document.querySelector('p').innerHTML = 'Task Added';
    }
    else{
        document.querySelector('p').innerHTML = 'Task Exist';
    }
    document.querySelector('.txt').value= '';
});



function deleteData(){
    console.log(this);
    console.log(this.previousElementSibling);
    console.log(this.previousElementSibling.innerText);
    var searchContent = this.previousElementSibling.innerText;
    var indexNo = taskList.indexOf(searchContent);
    console.log(indexNo);
    taskList.splice(indexNo,1);
    console.log(taskList);
    document.querySelector('ul').innerHTML = '';
    generateList();
}