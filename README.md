<p align="center">
  <img src="./assets/img/logo.png" alt="Otakustv API" />
</p>

  
<p align="center">
 The Otakustv API is a content provider of the latest in the world of anime with sub in Spanish and free. Using as a reference the website otakustv.com, to extract the data.
</p>
<p align="center">
  <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />          
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  <img src="https://img.shields.io/badge/Otakustv-API-brightgreen.svg"/>
</p>

<p align="center">
 <a href="https://nodei.co/npm/otakustv/"><img src="https://nodei.co/npm/otakustv.png"></a>
</p> 



# 📖 API Documentation


## getServers([eps_id])
To access the servers you must use the `eps_id` property that you will find under the `episodes` array. 

**For now it only returns the server Drive.google**

```js
(async() =>{
  const data = await getServers(eps_id = '/anime/tokyo-ghoul/episodio-12/');
})();
```

```json
"https://drive.google.com/file/d/1ImYmj21QXMmqqd4dpBEU8KMnRSGi5o6_/preview"
```

## donwloadEpisode([eps_id])
To download the eposide you must use the `eps_id` property that you will find under the `episodes` array. 

```js
(async() =>{
  const data = await donwloadEpisode(eps_id = '/anime/tokyo-ghoul/episodio-12/');
})();
```

```json
[
  {
    url: 'https://mega.nz/file/u9wkwAKb#z-ojeXqQXWU9VhtqoKK2FWiEYCw2xEgOeg5MSsIjklo',
    option: 'Descargar 1'
  },
  {
    url: 'https://mega.nz/file/u9wkwAKb#z-ojeXqQXWU9VhtqoKK2FWiEYCw2xEgOeg5MSsIjklo',
    option: 'Descargar 2'
  },
  {
    url: 'https://mega.nz/file/u9wkwAKb#z-ojeXqQXWU9VhtqoKK2FWiEYCw2xEgOeg5MSsIjklo',
    option: 'Descargar 3'
  }
]
```
  
## premiereEpisodes()

```js
(async() =>{
  const data = await premiereEpisodes();
})();
```

```json
[
  {
    title: 'Tsukiuta. The Animation 2',
    eps_num: 8,
    poster: 'https://www.otakustv.com/images/videos/episodio5fbe986482877.jpg',
    premier: 'Nuevo',
    eps_video: 'https://drive.google.com/file/d/1B8GqCH8znqAy4Nr6iPNIM7kr9H1I6_xk/preview'
  },
  // .....
]
```

## finishedAnime()

```js
(async() =>{
  const data = await finishedAnime();
})();
```

```json
[
  {
    title: 'Naruto',
    eps_num: 132,
    poster: 'https://www.otakustv.com/images/videos/episodio5fac026f8dc81.jpg',
    premier: null,
    eps_video: 'https://drive.google.com/file/d/1KsTAVmgCsJfwBM9fUPW1nAH8BWTLopo5/preview'
  },
    // .....
]
```

## ranking()

```js
(async() =>{
  const data = await ranking();
})();
```

```json
[
  {
    title: 'Haikyuu!!',
    votes: 10420,
    poster: 'https://www.otakustv.com/images/portadas/5c45233b6faa1.jpg',
    eps: {
      info: [Array],
      actors: [Array],
      genres: [Array],
      episodes: [Array]
    }
  },
    // .....
]
```

## simulcasts()

```js
(async() =>{
  const data = await simulcasts();
})();
```

```json
[
  {
    title: '100-man no Inochi no Ue ni Ore wa Tatteiru',
    poster: 'https://www.otakustv.com/images/portadas/5f773f139188b.jpg',
    eps: {
      info: [Array],
      actors: [Array],
      genres: [Array],
      episodes: [Array]
    }
  },
    // .....
]
```

## dubbedLatin()

```js
(async() =>{
  const data = await dubbedLatin();
})();
```

```json
[
  {
    title: 'Saint Seiya',
    poster: 'https://www.otakustv.com/images/portadas/5fb4cc59be0a1.jpg',
    eps: {
      info: [Array],
      actors: [Array],
      genres: [Array],
      episodes: [Array]
    }
  },
    // .....
]
```

## recentlyAdded()

```js
(async() =>{
  const data = await recentlyAdded();
})();
```

```json
[
  {
    title: 'RWBY Volume 8',
    poster: "https://www.otakustv.com/'images/portadas/5fb963a725d40.jpg'",
    eps: {
      info: [Array],
      actors: [Array],
      genres: [Array],
      episodes: [Array]
    }
  },
    // .....
]
```
 
##  premieresAnime([page])
The value may change in the next days / weeks.
| PAGE LIMIT |
| ---------- |
| 4          |

```js
(async() =>{
  const data = await premieresAnime(page = 1);
})();
```

```json
[
  {
    title: 'RWBY Volume 8',
    poster: 'https://www.otakustv.com/images/portadas/5fb963a725d40.jpg',
    description: 'Con el artefacto en sus garras, el poder de Salem alcanza nuevas y peligrosas alturas. Atlas, y toda Remnant en general, nunca habían corrido tanto peligro como ahora. ¿Habrá alguna esperanza de victoria para los protagonistas o las capacidades de Salem son demasiado grandes como para poder derrotarla?',
    eps: {
      info: [Array],
      actors: [Array],
      genres: [Array],
      episodes: [Array]
    }
  },
    // .....
]
```

##  queries([genero, anno, tipo, estado, orden, page])
The value may change in the next days / weeks.
| PAGE LIMIT |
| ---------- |
| 36         |

@param **genero**  
```html
<option value="0">default</option>
<option value="1">Acción</option>
<option value="2">Artes Marciales</option>
<option value="3">Aventura</option>
<option value="4">Carreras</option>
<option value="5">Ciencia Ficción</option>
<option value="6">Comedia</option>
<option value="7">Demonios</option>
<option value="8">Deportes</option>
<option value="9">Drama</option>
<option value="10">Ecchi</option>
<option value="11">Escolares</option>
<option value="12">Escuela</option>
<option value="47">Espacial</option>
<option value="13">Fantasía</option>
<option value="14">Fútbol</option>
<option value="15">Gore</option>
<option value="16">Harem</option>
<option value="17">Histórico</option>
<option value="18">Horror</option>
<option value="20">Infantil</option>
<option value="48">Josei</option>
<option value="19">Juegos</option>
<option value="21">Latino</option>
<option value="22">Lucha</option>
<option value="23">Magia</option>
<option value="46">Mecha</option>
<option value="24">Militar</option>
<option value="25">Misterio</option>
<option value="26">Música</option>
<option value="27">Parodia</option>
<option value="28">Peleas</option>
<option value="29">Policía</option>
<option value="30">Psicológico</option>
<option value="45">Recuentos de la vida</option>
<option value="31">Recuerdos</option>
<option value="32">Romance</option>
<option value="33">Samurai</option>
<option value="34">School</option>
<option value="35">Seinen</option>
<option value="37">Shoujo</option>
<option value="43">Shounen</option>
<option value="39">Sobrenatural</option>
<option value="40">Superpoderes</option>
<option value="41">Suspenso</option>
<option value="44">Terror</option>
<option value="42">Vampiros</option>
```

@param **anno** 
```html
<option value="0">default</option>
<option value="1980">1980</option>
<option value="1981">1981</option>
<option value="1982">1982</option>
<option value="1983">1983</option>
<option value="1984">1984</option>
<option value="1985">1985</option>
<option value="1986">1986</option>
<option value="1987">1987</option>
<option value="1988">1988</option>
<option value="1989">1989</option>
<option value="1990">1990</option>
<option value="1991">1991</option>
<option value="1992">1992</option>
<option value="1993">1993</option>
<option value="1994">1994</option>
<option value="1995">1995</option>
<option value="1996">1996</option>
<option value="1997">1997</option>
<option value="1998">1998</option>
<option value="1999">1999</option>
<option value="2000">2000</option>
<option value="2001">2001</option>
<option value="2002">2002</option>
<option value="2003">2003</option>
<option value="2004">2004</option>
<option value="2005">2005</option>
<option value="2006">2006</option>
<option value="2007">2007</option>
<option value="2008">2008</option>
<option value="2009">2009</option>
<option value="2010">2010</option>
<option value="2011">2011</option>
<option value="2012">2012</option>
<option value="2013">2013</option>
<option value="2014">2014</option>
<option value="2015">2015</option>
<option value="2016">2016</option>
<option value="2017">2017</option>
<option value="2018">2018</option>
<option value="2019">2019</option>
<option value="2020">2020</option>
```

@param **tipo** 
```html
<option value="0">default</option>
<option value="1">SERIE</option>
<option value="2">PELICULA</option>
<option value="3">ESPECIAL</option>
<option value="4">OVA</option>
<option value="5">TRAILER</option>
```

@param **estado** 
```html
<option value="0">default</option>
<option value="1">EMITIENDOSE</option>
<option value="2">PROXIMO</option>
<option value="3">FINALIZADO</option>
```

@param **orden**
```html 
<option value="0">default</option>
<option value="1">descendente por registro</option>
<option value="2">ascendente por registro</option>
```

```js
(async() =>{
  const data = await queries(
      genero = 1, 
      anno   = 2020, 
      tipo   = 0, 
      estado = 0, 
      orden  = 0, 
      page   = 0
    );
})();
```

```json
[
  {
    title: 'Appare-Ranman!',
    poster: 'https://www.otakustv.com/images/portadas/5f001b1b82bab.jpg',
    description: 'La historia se desarrollará al final del siglo XIX, cerca ya del inicio del nuevo siglo. Tras ciertas circunstancias, la brillante pero socialmente inpeta ingeniera Sorano Appare y el cobarde samurái Isshiki Kosame',
    eps: {
      info: [Array],
      actors: [Array],
      genres: [Array],
      episodes: [Array]
    }
  },
    // .....
]
```

## search([query])

```js
(async() =>{
  const data = await search(query = 'tokyo ghoul');
  console.log(data);
})();
```

```json
[
  {
    title: 'Tokyo Ghoul',
    poster: 'https://www.otakustv.com/images/portadas/5c4397772ab7f.jpg',
    description: 'Extraños asesinatos se están sucediendo uno tras otro en Tokyo. Debido a las pruebas encontradas en las escenas, la policía concluye que los ataques son obra de ghouls que se comen a las personas. Kaneki y Hide, dos compañeros de clase, llegan a la c',
    eps: {
      info: [Array],
      actors: [Array],
      genres: [Array],
      episodes: [Array]
    }
  },
    // .....
]
```


## **:handshake: Contributing**

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

---

### **:busts_in_silhouette: Credits**

- [Chris Michael](https://github.com/ChrisMichaelPerezSantiago) (Project Leader, and Developer)

---

### **:anger: Troubleshootings**

This is just a personal project created for study / demonstration purpose and to simplify my working life, it may or may
not be a good fit for your project(s).

---

### **:heart: Show your support**

Please :star: this repository if you like it or this project helped you!\
Feel free to open issues or submit pull-requests to help me improving my work.


---


### **:robot: Author**

_*Chris Michael*_

> You can follow me on
[github](https://github.com/ChrisMichaelPerezSantiago)&nbsp;&middot;&nbsp;[twitter](https://twitter.com/Chris5855M)

---

Copyright © 2020 [Otakustv API](https://github.com/ChrisMichaelPerezSantiago/otakustv).
