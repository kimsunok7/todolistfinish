let taskInput = document.getElementById("task-input");
// console.log(taskInput);
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("click", addTask);

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

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false, //안끝나면  false
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `<div class="task">
        
      <div class="task-done">${taskList[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
        <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
        
        <div>${taskList[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
          <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
        </div>
      </div>`;
    }
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
  console.log(id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      // taskList[i].isComplete = true; true를 토글하기 위해서 수정함
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id) {
  // console.log("삭제");
  // console.log("삭제", id);
  //splice는 몇번째 있는 인덱스인지 알아야함
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  // console.log(taskList);
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
