let taskInput = document.getElementById("task-input");
// console.log(taskInput);
let addButton = document.getElementById("add-button");
let taskList = [];
let mode = "all";
let filterList = [];
addButton.addEventListener("click", addTask);

let underline = document.getElementById("under-line");
let list = [];

/*2탄까지는 이걸로 실행했음*/
//function addTask() {
//   console.log("clicked");
//아이템을 여러개 추가하기 때문에 배열로 만듦 taskList
//let taskContent = taskInput.value;
// taskList.push(taskContent);
//   console.log(taskList);
//화면에 그려주면 됨
// render();
//}

/*list에 있는 아이템이 끝났는지 안 끝났는지를 알아야함 각각의 정보가 끝났는지 안끝난지를 들고 있어야함 그래서 추가 정보를 넣어줄것임 그래서 객체가 필요함*/

let tabs = document.querySelectorAll(".task-tabs div");
console.log(tabs);
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
    // lineMove(event);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false, //안끝나면  false
  };
  taskList.push(task);
  console.log(taskList);
  taskInput.value = "";
  render();
}

function render() {
  //3번째 render
  //1. 내가 선택한 탭에 따라서 mode가 들고 있음. 전역변수로 선언해서 render도 알수있게함

  list = [];

  if (mode === "all") {
    //all taskList
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    //ongoing, done filterList
    list = filterList;
  }
  //2. 리스트를 달리 보여준다
  //all 이면 taskList
  //ongoing, done 이면 filterList를 보여줘야함

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task task-done" id="${list[i].id}">
        
      <div class="task-done " >${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">Check</button>
        <button onclick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task" id="${list[i].id}">
        
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`;
    }

    //2번째 render

    // let resultHTML = "";
    // for (let i = 0; i < taskList.length; i++) {
    //   if (taskList[i].isComplete == true) {
    //     resultHTML += `<div class="task">

    //     <div class="task-done">${taskList[i].taskContent}</div>
    //     <div>
    //       <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
    //       <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
    //     </div>
    //   </div>`;
    //   } else {
    //     resultHTML += `<div class="task">

    //       <div>${taskList[i].taskContent}</div>
    //       <div>
    //         <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
    //         <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
    //       </div>
    //     </div>`;
    //   }

    //첫번째 render

    // resultHTML += `<div class="task">

    //     <div>${taskList[i].taskContent}</div>
    //     <div>
    //       <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
    //       <button>Delete</button>
    //     </div>
    //   </div>`;
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  // console.log("check 됐음");
  // console.log(id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      // taskList[i].isComplete = true; true를 토글하기 위해서 수정함
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  // render();
  // console.log(taskList);
  filter();
}
function deleteTask(id) {
  // console.log("삭제");
  // console.log("삭제", id);
  //splice는 몇번째 있는 인덱스인지 알아야함
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      // break;
    }
  }
  // console.log(taskList);
  // render();
  filter();
}

//진행중, 끝남에서는 delete가 안됨

// function deleteTask(id) {
//   // console.log("삭제");
//   // console.log("삭제", id);
//   //splice는 몇번째 있는 인덱스인지 알아야함
//   for (let i = 0; i < taskList.length; i++) {
//     if (taskList[i].id == id) {
//       taskList.splice(i, 1);
//       break;
//     }
//   }
//   // console.log(taskList);
//   render();
// }

// function lineMove(event) {
//   underline.style.left = event.currentTarget.offsetLeft + "px";
//   underline.style.width = event.currentTarget.offsetWidth + "px";
//   underline.style.top =
//     event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";
// }
//어떤 탭을 클릭했는지를 event가 가지고 있음
function filter(event) {
  // console.log("filter");
  // console.log("filter", event.target.id);
  // mode = event.target.id;
  // let mode = event.target.id;  render를 수정할때 전역변수로 선언해야함
  //진행중인 리스트만 모아두는 배열을 만듦
  //let filterList = []; //render를 수정할때 사용할 수 있도록 전역변수로 선언해야함

  if (event) {
    mode = event.target.id;
    underline.style.left = event.currentTarget.offsetLeft + "px";
    underline.style.width = event.currentTarget.offsetWidth + "px";
    underline.style.top =
      event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";
  }
  filterList = [];

  if (mode === "ongoing") {
    //진행중인 아이템을 보여준다
    //task.isComplete=false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }

    // console.log("진행중", filterList);

    // render();
  } else if (mode === "done") {
    //끝나는 케이스
    //task.isComplete = true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
  }
  // console.log("끝남", filterList);
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
