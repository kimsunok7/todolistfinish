let taskInput = document.getElementById("task-input");
// console.log(taskInput);
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("click", addTask);

function addTask() {
  //   console.log("clicked");
  //아이템을 여러개 추가하기 때문에 배열로 만듦 taskList
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  //   console.log(taskList);
  //화면에 그려주면 됨
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div>
          <button>Check</button>
          <button>Delete</button>
        </div>
      </div>`;
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}
