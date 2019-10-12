const listsContainer = document.querySelector('[data-lists]')
const deleteListButton = document.querySelector('[data-delete-list-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
      selectedListId = e.target.dataset.listId;
      save();
      renderLists();
    }
})

deleteListButton.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null
    save();
    renderLists();
})

            $(".txtlist").on("keyup",function(e){
                if (e.keyCode==13 && $(".txtlist").val() != "")
                {
                    var list = $("<li class='list-name'></li>").text($(".txtlist").val());

                    $(".task-list").append(list);
                    const listTemp = createList(list.text());
                    lists.push(listTemp);
                    save();
                    //xoá kế hoạch sau khi đã add
                    $(".txtlist").val("");
                }
            });
            
            $(".txtb").on("keyup",function(e){
                if (e.keyCode==13 && $(".txtb").val() != "" && selectedListId != null) 
                {
                    kt=true;
                    for (i=2;i<localStorage.length;i+=2){
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

            var taskRemain=0;
            function LoadList() {
                display();
                renderLists();


                for (i=2;i<localStorage.length;i+=2){
                    if (localStorage.getItem(i)!="")
                    {
                        var temp=localStorage.getItem(i);
                        var temp1=localStorage.getItem(i+1);
                        if (temp1=="false"){
                            taskRemain+=1;
                            var task = $("<div class='task'></div>").text(temp);

                                var del = $("<i class='fas fa-trash-alt'></i>").click(function(){
                                    var p = $(this).parent();

                                    for (j=2;j<localStorage.length;j+=2){
                                        if (localStorage.getItem(j)==p.text())
                                        {
                                            localStorage.setItem(j,"");
                                            if (localStorage.getItem(j+1) !="true")
                                            {
                                                taskRemain-=1;
                                                CountTask();
                                            }
                                            break;
                                        }
                                    }

                                    p.fadeOut(function(){
                                        p.remove();                                                  
                                    });
                                
                                });
                                var highlight = $("<i class='fas fa-star'></i>").click(function(){
                                    var p = $(this).parent();
                                    $(this).toggleClass("blue");
                                    p.toggleClass("upcase");                           
                                });
                                var check = $("<i class='fas fa-check'></i>").click(function(){
                                    var p = $(this).parent();
                                    taskRemain-=1;
                                    CountTask();
                                    for (j=2;j<localStorage.length;j+=2){
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


                                task.append(del,check,highlight);
                                $(".notcomp").append(task);
                        }
                        else if (temp1!="false"){
                            var task = $("<div id='' class='task'></div>").text(temp);
                                var del = $("<i class='fas fa-trash-alt'></i>").click(function(){
                                    var p = $(this).parent();
                                    for (j=2;j<localStorage.length;j+=2){
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
                                var highlight = $("<i class='fas fa-star'></i>").click(function(){
                                    var p = $(this).parent();
                                    $(this).toggleClass("blue");
                                    p.toggleClass("upcase");                           
                                });
                                task.append(del,highlight);
                                $(".comp").append(task);
                        }

                    }
                }
                CountTask();
            }

            

            function CountTask(){
                document.getElementById("taskRemaining").textContent = taskRemain + " task remaining";
            }
            const dateElement = document.getElementById("date");

            const options = {weekday:"long",month:"short",day:"numeric"};
            const today = new Date();

            dateElement.innerHTML = today.toLocaleDateString("en-US",options);

            function save(){
                localStorage.setItem(LOCAL_STORAGE_LIST_KEY,JSON.stringify(lists));
                localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY,selectedListId);
            }

            function createList(name) {
                return { id: Date.now().toString(), name: name, tasks: [] }
            }

            function renderLists() {
                display();

                clearElement(listsContainer)
                lists.forEach(list => {
                  const listElement = document.createElement('li')
                  listElement.dataset.listId = list.id
                  listElement.classList.add("list-name")
                  listElement.innerText = list.name
                  if (list.id === selectedListId) {
                    listElement.classList.add('active-list')
                  }
                  listsContainer.appendChild(listElement)
                })

              }

           
            function clearElement(element) {
                while (element.firstChild) {
                  element.removeChild(element.firstChild)
                }
            }

            function display(){
                if (selectedListId == null) {
                    listDisplayContainer.style.display = 'none'
                  } else {
                    listDisplayContainer.style.display = ''
                  }
            }
