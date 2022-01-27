import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
  const form = document.querySelectorAll('form');
  const inputs = document.querySelectorAll('input');
  

  checkNumInputs('input[name="user_phone"]');

  const message = {
    loading:'loading...',
    sucsess:'thank you. we contact you soon',
    failure:'something wrong'
  }

  const postdata = async (url, data) => {
    document.querySelectorAll('.status').textContent = message.loading;

    let res = await fetch(url, {
      method: "POST",
      body: data
    });


    return await res.text();
  }

  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = ''
    });
  }

  form.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage);

      const formdata = new FormData(item);

      if (item.getAttribute('data-calc') === 'end') {
        for (let key in state){
          formdata.append(key, state[key])
        }
      };

      postdata('assets/server.php', formdata)
        .then(res => { console.log(res)
              statusMessage.textContent = message.sucsess;
        })
        .catch(()=> {
          statusMessage.textContent = message.failure;
        })
        .finally(() => {
            clearInputs();
            setTimeout(()=>{
              statusMessage.remove();
            }, 5000)
        })
        
    })
  })
};

export default forms;