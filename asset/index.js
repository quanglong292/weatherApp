const msg = document.getElementById("msg");
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const apiKey = "0597f7f34e8994e36e089e1a093e3757";
const list = document.querySelector(".ajax-section .cities");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputVal = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  // handle same cities
  //1
  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    //2
    const filteredArray = listItemsArray.filter((el) => {
      let content = "";
      content = el.querySelector(".city-name span").textContent.toLowerCase();
      console.log(content);
      // run until return = true;
      return content == inputVal.toLowerCase();
    });

    //3
    if (filteredArray.length > 0) {
      // console.log(filteredArray, content);
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      // reset form => return => ko chay ajax
      form.reset();
      input.focus();
      return;
    }
  }

  // Ajax
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // request data
      console.log(data);
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
      // create markup to push (innerHTML) to <li>
      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
            <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
            <figure>${weather[0]["main"]}</figure>
        </figure>
      `;
      // then push <li> to <ul>
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city :(";
    });
  msg.textContent = "";
  form.reset();
  input.focus();
});
