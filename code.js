
            $(".txtb").on("keyup",function(e){
                if (e.keyCode==13 && $(".txtb").val() != "")
                {
                    kt=true;
                    for (i=0;i<localStorage.length;i+=2){
                        if ($(".txtb").val()==localStorage.getItem(i))
                        {
                            alert("Nhap trung ke hoach, vui long nhap lai");
                            location.reload();
                            kt=false;
                            break;
                        }
                    }
                    if (kt==true)
                    {
                    localStorage.length+=2;
                    localStorage.setItem(localStorage.length,$(".txtb").val());
                    localStorage.setItem(localStorage.length,false);
                    }
                    //localStorage.length=$(".txtb").val();
                    //var task = $("<div class='task'></div>").text($(".txtb").val());
                    location.reload();
                    //
                    //
                    
                    //

                    //xoá kế hoạch sau khi đã add
                    $(".txtb").val("");
                }
            });

            function LoadList() {
                for (i=0;i<localStorage.length;i+=2){
                    if (localStorage.getItem(i)!="")
                    {
                        var temp=localStorage.getItem(i);
                        var temp1=localStorage.getItem(i+1);
                        if (temp1=="false"){
                            var task = $("<div class='task'></div>").text(temp);

                                var del = $("<i class='fas fa-trash-alt'></i>").click(function(){
                                    var p = $(this).parent();
                                    for (j=0;j<localStorage.length;j+=2){
                                        if (localStorage.getItem(j)==p.text())
                                        {
                                            localStorage.setItem(j,"");
                                            break;
                                        }
                                    }

                                    p.fadeOut(function(){
                                        p.remove();                                                  
                                    });
                                
                                });
                                var check = $("<i class='fas fa-check'></i>").click(function(){
                                    var p = $(this).parent();
                                    for (j=0;j<localStorage.length;j+=2){
                                        if (localStorage.getItem(j)==p.text())
                                        {
                                            localStorage.setItem(j+1,"true");
                                            break;
                                        }
                                    }
                                    p.fadeOut(function(){
                                        $(".comp").append(p);
                                        p.fadeIn();
                                    });
                                    $(this).remove();
                                });
                                task.append(del,check);
                                $(".notcomp").append(task);
                        }
                        else if (temp1!="false"){
                            var task = $("<div id='' class='task'></div>").text(temp);
                                var del = $("<i class='fas fa-trash-alt'></i>").click(function(){
                                    var p = $(this).parent();
                                    for (j=0;j<localStorage.length;j+=2){
                                        if (localStorage.getItem(j)==p.text())
                                        {
                                            localStorage.setItem(j,"");
                                            break;
                                        }
                                    }
                                    
                                    p.fadeOut(function(){
                                        p.remove();                                                  
                                    });
                                });
                                task.append(del);
                                $(".comp").append(task);
                        }

                    }
                }
            }
