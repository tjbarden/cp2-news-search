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
          results += '<h2 style="padding:15px;">Here are " + json.size() + " articles related to "' + topic + '":</h2><br>';
          let divmain = document.createElement('div');
          divmain.setAttribute('class', 'divmain');
          let header = document.createElement('h2');
          header.setAttribute('class', 'text');
          header.setAttribute('style', 'color: rgb(255, 255, 255);');
          header.innerHTML = results;
          divmain.appendChild(header);
          json.articles.forEach(article =>{
            let div = document.createElement('div');
            div.setAttribute('class', 'article');
            /*let img = document.createElement('img');
            img.setAttribute('src', article.urlToImage);
            img.setAttribute('class', 'articleImage');*/
            let a = document.createElement('a');
            a.setAttribute('href', article.url);
            a.setAttribute('target', '_blank');
            a.textContent = article.title;
            a.setAttribute('style', 'color: rgb(255, 255, 255)');
            div.appendChild(a);
            let author = document.createElement('h5');
            let articleInfo = "";
            articleInfo = '<br>Source: <em>' + article.source.name + '</em>&emsp; Author: <em>' + article.author + '</em><br>Published: ' + article.publishedAt.substr(0, 10);
            author.setAttribute('style', 'color: rgb(255, 255, 255)');
            author.innerHTML = articleInfo;
            divmain.appendChild(author);
            //author.innerHTML = 'Source: ' + json.article.source(name) + '&emsp; Author: ' + json.article.author;
            div.appendChild(author);
            divmain.appendChild(div);
            newsList.appendChild(divmain);
          //document.getElementById("news-list").innerHTML = results;
          })
          console.log(newsList);
       })
      
      )};