const searchFrom = document.querySelector('.search');
    const input = document.querySelector('.input');
    const newsList = document.querySelector('.news-list')

    console.log(newsList);

    searchFrom.addEventListener('submit', retrieve);

    function retrieve(e) {

      if (input.value == '') {
        alert('Input field is empty')
        return
      }

      newsList.innerHTML = ''

      e.preventDefault()

      const apiKey = 'c9040f9e-6ad6-4925-9851-d9a73707648e'
      let topic = input.value;

      let url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${topic}?key=${apiKey}`

      fetch(url).then((res)=>{
        return res.json()
      }).then((function(json) {
          console.log(json)
          let results = '';
          console.log(json.length);
          console.log(json[0].fl);
          for(let i = 0; i < json.length - 1; ++i) {
            for(let j = 0; j < json[i].meta.syns.length; ++j) {
              results += json[i].meta.syns[i];
              results += " ";
            }
            
          }
          console.log(results);
       })
      
      )};