const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    //нужно hraders, чтобы отправить в формате json
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(obj),
    body: data,
  });

  //возвращаем в json формате
  return await res.json();
};

export { postData };
const getResourse = async (url) => {
  const res = await fetch(url);

  //Обработка состояния fetch
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  //возвращаем в json формате
  return await res.json();
};


export { getResourse };
