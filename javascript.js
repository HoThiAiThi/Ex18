document.addEventListener("DOMContentLoaded", function () {
  const list_task = document.getElementById("list-task");
  const totalTaskElement = document.getElementById("totalTaskElement");
  const taskForm = document.getElementById("taskForm");
  const btnAddTask = document.getElementById("btnAddTask");
  const inputTaskname = document.getElementById("inputTaskname");
  const inputDescription = document.getElementById("inputDescription");
  const btnCancel = document.getElementById("btnCancel");
  const btnConfirmAddTask = document.getElementById("btnConfirmAddTask");
  const addForm = document.getElementById("addForm");

  // hien thi va khong hien thi form
  btnAddTask.addEventListener("click", function () {
    taskForm.style.display = "block";
    addForm.style.display = "none";
  });

  btnCancel.addEventListener("click", function () {
    taskForm.style.display = "none";
    addForm.style.display = "block";
  });

  // Hàm render ra Task List
  function renderNewTask(taskName, description) {
    const newTaskHTML = `
        <div class="flex items-start py-2 pb-6 border-b-2 w-full">
        <input type="checkbox" class="form-checkbox mt-1 rounded-full w-5 h-5">

          <div class="flex-grow ms-3">
              <label for="link-checkbox" class="text-base">${taskName}</label>
              <p class="text-[#8f9eb4] mt-1">${description}</p>
          </div>
          <div class="dropdown-menu hidden">
              <ul>
                  <li class="border-b-2 mb-2 px-4 py-2 "><i class="fa-solid fa-pen" style="color: #a0aec0;" ></i><a href="#" class="update-task font-bold ml-3 ">Update</a></li>
                  <li class="px-4 "><i class="fa-solid fa-trash" style="color: #e53e3e;"></i><a href="#" class="delete-task text-[#e53e3e] font-bold ml-3 ">Delete</a></li>
              </ul>
          </div>
          <div class="flex justify-end">
              <i class="fa-solid fa-ellipsis-vertical" style="color: #a0aec0;"></i>
          </div>
        </div>
    `;
    list_task.innerHTML += newTaskHTML;
    updateTotalTasks();

    const ellipsisIcon = list_task.lastElementChild.querySelector(
      ".fa-ellipsis-vertical"
    );
    ellipsisIcon.addEventListener("click", function () {
      const dropdownMenu = this.parentElement.previousElementSibling;
      dropdownMenu.classList.toggle("hidden");
    });
  }

  // kiem tra trang thai checked cua ckeckbox
  list_task.addEventListener("click", function (event) {
    if (event.target.type === "checkbox") {
      updateTotalTasks();

      const label = event.target.nextElementSibling.querySelector("label");
      const description = event.target.nextElementSibling.querySelector("p");

      if (event.target.checked) {
        label.style.textDecoration = "line-through";
        description.style.textDecoration = "line-through";
      } else {
        label.style.textDecoration = "none";
        description.style.textDecoration = "none";
      }
    }
  });

  //update total Task
  function updateTotalTasks() {
    let checkedTasks = list_task.querySelectorAll(
      'input[type="checkbox"]:checked'
    ).length;
    let totalTasks = list_task.children.length;
    let remainingTasks = totalTasks - checkedTasks;
    totalTaskElement.innerHTML = `${remainingTasks}/${totalTasks} tasks <i class="fa-solid fa-check me-2"></i> `;
  }

  // confirm addTask
  btnConfirmAddTask.addEventListener("click", function () {
    const taskName = inputTaskname.value;
    const description = inputDescription.value;

    if (taskName.trim() !== "" && description.trim() !== "") {
      renderNewTask(taskName, description);

      inputTaskname.value = "";
      inputDescription.value = "";
    }
    taskForm.style.display = "none";
    addForm.style.display = "block";
  });
});
