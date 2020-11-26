const { load } = require('cheerio');
const { req } = require('./util/fetch');
const axios = require('axios').default;
const qs = require('qs');
const _ = require('lodash');
const { reject } = require('lodash');

const getServers = async(id) =>{
  return new Promise(async(resolve, reject) =>{
    try {
      const res = await req(id);
      const $ = load(res);
      const server = $('body iframe#ytplayer').attr('src');
      resolve(server);
    } catch (error) {
      const err = new Error(error);
      reject(err);  
    }
  });
};

const donwloadEpisode = async(id) =>{
  const fixedID = id && id.replace('anime', 'descargar');
  const res = await req(fixedID);
  const $ = load(res);
  const data = $('body div.bloque_download div.row div.col-sm-6.text-right').map((index, element) => new Promise((resolve, reject) =>{
    try {
      const $element = $(element);
      const url = $element.find('a').attr('href');
      const option = $element.find('a').text();
      resolve({
        url,
        option
      });
    } catch (error) {
      reject(error); 
    }
  })).get();

  return Promise.all(data);
};

const episodes = async(id = 'tokyo-ghoul') =>{
  const res = await req(`/anime/${id}`);
  const $ = load(res);

  const info = [];
  $('body div.tabs div.tab-content').each((index, element) =>{
    try {
      const $element = $(element); 
      const creator = $element.find('p').eq(0).find('.font-GDSherpa-Regular span.lila-color').text() || null;
      const director = $element.find('p').eq(1).find('.font-GDSherpa-Regular span.lila-color').text() || null;
      info.push({
        creator,
        director
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  const actors = []; 
  $('body div.tabs div.tab-content div.base-carusel div.carusel_voces div.item div.voz-st').each((index, element) =>{
    try {
      const $element = $(element); 
      const actor_name = $element.find('h1.mb-0').text() || null;
      const character_name = $element.find('h2').text() || null;
      const _image = $element.find('a img').attr('src') || null;
      const image = `https://www.otakustv.com/${_image}`;
      actors.push({
        actor_name,
        character_name,
        image
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  const genres = []; 
  $('body div.container-fluid ul.list-inline li').each((index, element) =>{
    try {
      const $element = $(element); 
      const genresRef = $element.find('a').attr('href') || null;
      if(!genresRef.includes('tags')){
        const genre = genresRef && genresRef.split('anime/')[1].replace('/', '').trim() || null;
        genres.push({
          genre
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  });
      
  const eps = [];
  $('body div.tabs div.pl-0 div.row div.col-md-2').each((index, element) =>{
    try {
      const $element = $(element); 
      const _id = $element.find('a').attr('href') || null;
      const eps_id = _id && _id.split('com')[1] || null;
      const title = $element.find('div.font-GDSherpa-Bold span').text() || null;
      const _eps_num = $element.find('div.font-GDSherpa-Bold').text().trim() || null;
      const eps_num = _eps_num && _eps_num.replace(/[\r\n\t]+/g, '').split(' ')[1]
      const poster = $element.find('a').attr('href') || null;
      const description = $element.find('a').attr('title') || null;
      eps.push({
        eps_id,
        title: title && title.trim(),
        eps_num: eps_num && parseInt(eps_num, 10),
        description: description && description.trim(),
        poster: poster && poster.trim(),
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  const doc = _.assign({}, {
    info: info, 
    actors: actors, 
    genres: genres, 
    episodes: eps
  });
  return doc;
};

const premiereEpisodes = async() =>{
  const res = await req();
  const $ = load(res);
  
  const data = $('body div.container-fluid div.content div.reciente').eq(0).find('div.w-100 div.row div.col-md-2').map((index, element) => new Promise(async(resolve, reject) =>{
    const $element = $(element);
    const _id = $element.find('a').attr('href') || null;
    const id = _id && `/anime${_id.split('anime')[1]}` || null;
    const title = $element.find('a h1.text-white').text().trim() || null;
    const _eps_num = $element.find('p').text().trim() || null;
    const eps_num = _eps_num && parseInt(_eps_num.match(/\d+/)[0], 10);
    const posterRef = $element.find('a div.pre-anime').attr('style') || null
    let poster = null;
    if(posterRef && posterRef.includes('image')){
      poster = `https://www.otakustv.com/${posterRef.split('url')[1].replace(/[();]/g, '').trim()}`
    }
    const premier = $element.find('a.new_movie').text() || null;
    const eps_video = await getServers(id);
    resolve({
      title,
      eps_num,
      poster,
      premier,
      eps_video
    });
  })).get();

  return Promise.all(data);
};

const finishedAnime = async() =>{
  const res = await req();
  const $ = load(res);
  
  const data = $('body div.container-fluid div.content div.reciente').eq(1).find('div.w-100 div.row div.col-md-2').map((index, element) => new Promise(async(resolve, reject) =>{
    try {
      const $element = $(element);
      const _id = $element.find('a').attr('href') || null;
      const id = _id && `/anime${_id.split('anime')[1]}` || null;
      const title = $element.find('a h1.text-white').text().trim() || null;
      const _eps_num = $element.find('p').text().trim() || null;
      const eps_num = _eps_num && parseInt(_eps_num.match(/\d+/)[0], 10);
      const posterRef = $element.find('a div.pre-anime').attr('style') || null
      let poster = null;
      if(posterRef && posterRef.includes('image')){
        poster = `https://www.otakustv.com/${posterRef.split('url')[1].replace(/[();]/g, '').trim()}`
      }
      const premier = $element.find('a.new_movie').text() || null;
      const eps_video = await getServers(id);
      resolve({
        title,
        eps_num,
        poster,
        premier,
        eps_video
      });
    } catch (error) {
      reject(error);
    }
  })).get();

  return Promise.all(data);
};

const ranking = async() =>{
  const res = await req();
  const $ = load(res);
  
  const data = $('body div.container-fluid div.content div.ranking div.base-carusel div.item').map((index, element) => new Promise(async(resolve, reject) =>{
    const $element = $(element);
    const _id = $element.find('a').attr('href') || null;
    const id = _id && _id.split('anime/')[1].replace('/', '');
    const title = $element.find('a p.text-white').text().trim() || null;
    const _votes = $element.find('p').text().trim() || null;
    const votes = _votes && parseInt(_votes.match(/\d+/)[0], 10);
    const posterRef = $element.find('a div.pre-anime').attr('style') || null
    let poster = null;
    if(posterRef && posterRef.includes('image')){
      poster = `https://www.otakustv.com/${posterRef.split('url')[1].replace(/[();]/g, '').trim()}`
    }
    const eps = await episodes(id);
    resolve({
      title,
      votes,
      poster,
      eps
    });
  })).get();

  return Promise.all(data);
};


const simulcasts = async() =>{
  const res = await req();
  const $ = load(res);
  
  const data = $('body div.container-fluid div.content div.simulcasts div.base-carusel div.item').map((index, element) => new Promise(async(resolve, reject) =>{
    const $element = $(element);
    const _id = $element.find('a').attr('href') || null;
    const id = _id && _id.split('anime/')[1].replace('/', '');
    const title = $element.find('a p.text-white').text().trim() || null;
    const posterRef = $element.find('a div.pre-anime').attr('style') || null
    let poster = null;
    if(posterRef && posterRef.includes('image')){
      poster = `https://www.otakustv.com/${posterRef.split('url')[1].replace(/[();]/g, '').trim()}`
    }
    const eps = await episodes(id);
    resolve({
      title,
      poster,
      eps
    });
  })).get();

  return Promise.all(data);
};

const dubbedLatin = async() =>{
  const res = await req();
  const $ = load(res);
  
  const data = $('body div.container-fluid div.content div.latino div.base-carusel div.item').map((index, element) => new Promise(async(resolve, reject) =>{
    try {
      const $element = $(element);
      const _id = $element.find('a').attr('href') || null;
      const id = _id && _id.split('anime/')[1].replace('/', '');
      const title = $element.find('a p.text-white').text().trim() || null;
      const posterRef = $element.find('a div.pre-anime').attr('style') || null
      let poster = null;
      if(posterRef && posterRef.includes('image')){
        poster = `https://www.otakustv.com/${posterRef.split('url')[1].replace(/[();]/g, '').trim()}`
      }
      const eps = await episodes(id);
      resolve({
        title,
        poster,
        eps
      });
    } catch (error) {
      reject(error);
    }
  })).get();

  return Promise.all(data);
};

const recentlyAdded = async() =>{
  const res = await req();
  const $ = load(res);
  
  const data = $('body div.container-fluid div.content div.reciente div.base-carusel div.item').map((index, element) => new Promise(async(resolve, reject) =>{
    try {
      const $element = $(element);
      const _id = $element.find('a').attr('href') || null;
      const id = _id && _id.split('anime/')[1].replace('/', '');
      const title = $element.find('a p.text-white').text().trim() || null;
      const posterRef = $element.find('a div.pre-anime').attr('style') || null
      let poster = null;
      if(posterRef && posterRef.includes('image')){
        poster = `https://www.otakustv.com/${posterRef.split('url')[1].replace(/[();]/g, '').trim()}`
      }
      const eps = await episodes(id);
      resolve({
        title,
        poster,
        eps
      });
    } catch (error) {
      reject(error);
    }
  })).get();

  return Promise.all(data);
};


// page limit 4
const premieresAnime = async(page) =>{
  const url = `https://www.otakustv.com/lo-mas-nuevo.php?`;
  const { data } = await axios({
    method: 'post',
    url: url,
    data: qs.stringify({
      page: page,
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    }  
  });
  
  const $ = load(data);

  const _data = $('body div.container-fluid div.item').map((index, element) => new Promise(async(resolve, reject) =>{
    try {
      const $element = $(element);
      const _id = $element.find('a').attr('href') || null;
      const id = _id && _id.split('anime/')[1].replace('/', '');
      const title = $element.find('a p.text-white').text().trim() || null;
      const description = $element.find('a').attr('title')
      const posterRef = $element.find('a div.pre-anime').attr('style') || null
      let poster = null;
      if(posterRef && posterRef.includes('image')){
        poster = `https://www.otakustv.com/${posterRef.split('url')[1].replace(/[();]/g, '').trim()}`
      }
      const eps = await episodes(id);
      resolve({
        title,
        poster,
        description,
        eps
      });
    } catch (error) {
      reject(error); 
    }
  })).get();

  return Promise.all(_data);
};  

// page limit 36
const queries = async(genero, anno, tipo, estado, orden, page) =>{
  const url = `https://www.otakustv.com/buscador.php?`;
  const { data } = await axios({
    method: 'post',
    url: url,
    data: qs.stringify({
      genero: genero,
      anno: anno,
      tipo: tipo,
      estado: estado,
      orden: orden,
      buscador: '',
      action: 'send',
      page: page
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    }  
  });
  
  const $ = load(data);

  const _data = $('body div.container-fluid div.item').map((index, element) => new Promise(async(resolve, reject) =>{
    try {
      const $element = $(element);
      const _id = $element.find('a').attr('href') || null;
      const id = _id && _id.split('anime/')[1].replace('/', '');
      const title = $element.find('a p.text-white').text().trim() || null;
      const description = $element.find('a').attr('title')
      const posterRef = $element.find('a div.pre-anime').attr('style') || null
      let poster = null;
      if(posterRef && posterRef.includes('image')){
        poster = `https://www.otakustv.com/${posterRef.split('url')[1].replace(/[();]/g, '').trim()}`
      }
      const eps = await episodes(id);
      resolve({
        title,
        poster,
        description,
        eps
      });
    } catch (error) {
      reject(error); 
    }
  })).get();

  return Promise.all(_data);
};  

const search = async(query) =>{
  const url = `https://www.otakustv.com/buscador.php?`;
  const { data } = await axios({
    method: 'post',
    url: url,
    data: qs.stringify({
      buscador: query,
      action: 'send',
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    }  
  });
  
  const $ = load(data);

  const _data = $('body div.container-fluid div.item').map((index, element) => new Promise(async(resolve, reject) =>{
    try {
      const $element = $(element);
      const _id = $element.find('a').attr('href') || null;
      const id = _id && _id.split('anime/')[1].replace('/', '');
      const title = $element.find('a p.text-white').text().trim() || null;
      const description = $element.find('a').attr('title')
      const posterRef = $element.find('a div.pre-anime').attr('style') || null
      let poster = null;
      if(posterRef && posterRef.includes('image')){
        poster = `https://www.otakustv.com/${posterRef.split('url')[1].replace(/[();]/g, '').trim()}`
      }
      const eps = await episodes(id);
      resolve({
        title,
        poster,
        description,
        eps
      });
    } catch (error) {
      reject(error); 
    }
  })).get();

  return Promise.all(_data);
}; 

module.exports = {
  getServers,
  premiereEpisodes,
  finishedAnime,
  ranking,
  simulcasts,
  dubbedLatin,
  recentlyAdded,
  premieresAnime,
  queries,
  search,
  donwloadEpisode
};