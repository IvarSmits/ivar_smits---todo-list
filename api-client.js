const BASE_URL = "http://localhost:3000";

const getAllTasks = async () => {
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("error", error);
  }
};

const postTask = async (description) => {
  try {
    const data = { description: description, done: false };
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("error", error);
  }
};

const deleteTask = async (id) => {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("error", error);
  }
};
