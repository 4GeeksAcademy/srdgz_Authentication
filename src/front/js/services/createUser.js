export const createUser = async ({ email, password }) => {
  const data = JSON.stringify({
    email: email,
    password: password,
  });

  try {
    const response = await fetch(
      "https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev/user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error adding new user: ${response.statusText}`
      );
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`Error adding new user: ${error.message}`);
  }
};