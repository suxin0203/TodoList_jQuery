$(function(){

    load();

    $("#addlist").on("keydown", function (event){
        if (event.keyCode === 13 ){
            if($("#addlist").val()===""){
                alert("便签空空如也~");
            }else{
                var local = getDate();
                // console.log(local);
                local.push({title: $("#addlist").val(), done: false});
                saveData(local);
                load();
                $("#addlist").val("");
                }
            
        }
    });
    $("#add").on("click", function (event){
            if($("#addlist").val()===""){
                alert("便签空空如也~1");
            }else{
                var local = getDate();
                // console.log(local);
                local.push({title: $("#addlist").val(), done: false});
                saveData(local);
                load();
                $("#addlist").val("");
                }
    });


    $("#td, #do").on("click","input",function(){
        var data = getDate();
        var index = $(this).siblings("span").attr("id");
        // console.log(index);
        data[index].done = $(this).prop("checked");
        // console.log(data);
        saveData(data);
        load();
    })

    function getDate(){
        var  data = localStorage.getItem("todlist");
        if (data != null){
            return JSON.parse(data);
        } else{
            return [];
        }
    }
    function saveData(data){
        localStorage.setItem("todlist",JSON.stringify(data))
    }

    $("#td,#do").on("click","span",function(){
        var data = getDate();
        var index = $(this).attr("id");
        // console.log(index);
        data.splice(index,1);
        saveData(data);
        load();
    })

    function load(){
        var data = getDate();
        // console.log(data);
        $("#td, #do").empty();
        var tdnum = 0;
        var donum = 0;
        $.each(data, function(i,n){
            // console.log(n);
            if(n.done){
                donum++;
                $("#do").prepend("<li class='list-group-item'><input type='checkbox' checked='checked' /><span id ='"+i+"'class='badge'>删除</span>&nbsp&nbsp"+n.title+"</li>")

            }else{
                tdnum++;
                $("#td").prepend("<li class='list-group-item'><input type='checkbox' /><span id ='"+i+"'class='badge'>删除</span>&nbsp&nbsp"+n.title+"</li>")
            }
    });
    $("#tdnum").text(tdnum);
    $("#donum").text(donum);
    }
})