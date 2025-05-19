import { API_TOKEN, API_URL } from "../constants/constants.js";

export async function fetchTasks(page, pageSize) {
    const result = await fetch(
        `${API_URL}/tasks?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
        {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        }
    );

    const data = await result.json();

    return data
}