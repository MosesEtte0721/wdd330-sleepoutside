const apiBaseURL = import.meta.env.VITE_SERVER_URL || "https://wdd330-backend.onrender.com/";
const baseURL = apiBaseURL.endsWith("/") ? apiBaseURL : `${apiBaseURL}/`;

function convertToJson(res) {
  return res.json().then(jsonResponse => {
    if (res.ok) {
      return jsonResponse;
    } else {
      throw { name: 'servicesError', message: jsonResponse };
    }
  });
}

export default class ExternalServices {
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(order) {
    const response = await fetch(`${baseURL}checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    return convertToJson(response);
  }
}
