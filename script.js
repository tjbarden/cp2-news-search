const searchFrom = document.querySelector('.search');
    const input = document.querySelector('.input');
    const newsList = document.querySelector('.news-list')

    console.log(newsList);

    searchFrom.addEventListener('submit', retrieve);

    function retrieve(e) {

      if (input.value == '') {
        alert('Error: Input field is empty')
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
          if (json.length === 0) {
            alert("Sorry, this search returned no results. Please try again.");
          }
          let results = '';
          results += '<h2 style = "padding-left: 15px; padding-top: 15px;">Here are ' + json.length + ' connotations of "' + topic + '", their definitions, and their synonyms:</h2><br>';
          let divmain = document.createElement('div');
          divmain.setAttribute('class', 'divmain');
          let header = document.createElement('h2');
          header.setAttribute('class', 'text');
          header.setAttribute('style', 'color: rgb(255, 255, 255);');
          header.setAttribute('margin-bottom', '5px;');
          header.innerHTML = results;
          divmain.appendChild(header);
          for (let i = 0; i < json.length; ++i) {
            let div = document.createElement('div');
            div.setAttribute('class', 'article');
            /*let img = document.createElement('img');
            img.setAttribute('src', article.urlToImage);
            img.setAttribute('class', 'articleImage');*/
            let a = document.createElement('h3');
            a.textContent = topic + " - " + json[i].fl;
            a.setAttribute('style', 'color: rgb(255, 255, 255)');
            div.appendChild(a);
            let b = document.createElement('ol');
            let definitions = "";
            for (let k = 0; k < json[i].shortdef.length; ++k) {
              definitions += "<li>" + json[i].shortdef[k] + "</li>";
            }
            b.setAttribute('class', 'definition');
            b.innerHTML = definitions;
            div.appendChild(b);
            let author = document.createElement('h5');
            let articleInfo = "";
            articleInfo = '<br>Synonyms: <em>';
            let array = json[i].meta.syns[0];
            //console.log(array.length);
            for(let j = 0; j < array.length; ++j) {
                articleInfo += array.at(j);
                //console.log(articleInfo);
                if (j < array.length - 1) {
                    articleInfo += ",</em> <em>";
                }
                if (j === array.length) {
                  articleInfo += "</em>"
                }
            }
            author.setAttribute('style', 'color: rgb(255, 255, 255)');
            author.innerHTML = articleInfo;
            divmain.appendChild(author);
            //author.innerHTML = 'Source: ' + json.article.source(name) + '&emsp; Author: ' + json.article.author;
            div.appendChild(author);
            divmain.appendChild(div);
            newsList.appendChild(divmain);
            }
    }))};