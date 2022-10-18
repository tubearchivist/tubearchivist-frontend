import type { Download, Task, Tasks } from "../types/download";

export const getDownloads = async (
  token: string,
  filter: boolean,
  pageNumber: number
): Promise<Download> => {
  if (!token) {
    throw new Error(`Unable to fetch downloads, no token provided.`);
  }
  const response = await fetch(
    `${API_URL}/api/download/?filter=${
      filter ? "ignore" : "pending"
    }&page=${pageNumber}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        mode: "no-cors",
      },
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    // var error: Download = {
    //   data: null,
    //   config: null,
    //   paginate: null,
    //   message: response.statusText + " (" + response.status + ")",
    // }
    // error = response.statusText + " (" + response.status + ");
    throw new Error(response.statusText + " (" + response.status + ")");
    // return error;
  }
};

export const sendDownloads = async (
  token: string,
  input: string
): Promise<Download> => {
  if (!token) {
    throw new Error(`Unable to send downloads, no token provided.`);
  }
  var data = {
    data: [
      {
        youtube_id: input,
        status: "pending",
      },
    ],
  };
  const response = await fetch(`${API_URL}/api/download/`, {
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
    method: "POST",
  });
  if (response.ok) {
    return response.json();
  } else if (response.status == 400) {
    throw new Error(
      "Failed to extract links. Please input IDs or URLs for videos, channels, or playlists."
    );
  } else {
    throw new Error("Failed to connect to the API.");
  }
};

export const sendDeleteAllQueuedIgnored = async (
  token: string,
  filter: string
): Promise<Download> => {
  if (!token) {
    throw new Error(`Unable to delete downloads, no token provided.`);
  }
  const response = await fetch(`${API_URL}/api/download/?filter=${filter}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error removing all videos.");
    // return response.json();
  }
  return response.json();
};

export const sendDeleteVideoQueuedIgnored = async (
  token: string,
  videoId: string
): Promise<Download> => {
  if (!token) {
    throw new Error(`Unable to delete downloads, no token provided.`);
  }
  const response = await fetch(`${API_URL}/api/download/${videoId}/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error removing video.");
    // return response.json();
  }
  return response.json();
};

export const sendMoveVideoQueuedIgnored = async (
  token: string,
  videoId: string,
  status: string
): Promise<Download> => {
  if (!token) {
    throw new Error(`Unable to move downloads, no token provided.`);
  }
  var data = {
    status: status,
  };
  const response = await fetch(`${API_URL}/api/download/${videoId}/`, {
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Error moving video to" + status + ".");
  }
  return response.json();
};

export const sendTasks = async (token: string, task: Tasks): Promise<Task> => {
  if (!token) {
    throw new Error(`Unable to start task, no token provided.`);
  }
  var data = {
    run: task,
  };
  const response = await fetch(`${API_URL}/api/task/`, {
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Error running task: ${task}.`);
  }
  return response.json();
};
