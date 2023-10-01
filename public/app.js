document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "edit") {
    const title = event.target.dataset.title;
    const newTitle = prompt("Введите новое название", title);
    if (newTitle !== null && newTitle !== title) {
      updateTitle(event.target.dataset.id, newTitle).then(() => {
        const titleElement = event.target
          .closest("li")
          .querySelector("div.flex-grow-1");
        titleElement.textContent = newTitle;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function updateTitle(id, newTitle) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newTitle }),
  });
}
