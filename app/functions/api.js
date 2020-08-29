import { setUser, logOut, removeCellars, removeWines, setWines, setCellars, setResults, setTimeQuery } from '../redux/actions'
import { getCredentials, resetKeychain, rememberEmailPassword } from './keychainFunctions'
import NavigationService from './navigationService'
import { Auth, API } from 'aws-amplify';
import moment from 'moment'
import axios from 'axios'
import io from 'socket.io-client';
const SQL_URL = 'http://localhost:8002'
const URL = "https://api.vinologie.ovh"
// const URL = "http://localhost:3000/api"
let token = "";
let accessToken = "";
// var socket;
function deleteToken() {
  token = ""; //lol
  return
}
function searchWineBase(wine) {
  return new Promise((resolve, reject) => {
    const URLDB = `https://api.globalwinescore.com/globalwinescores/latest?wine=${encodeURIComponent(wine)}`

    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json', "Authorization": "Token db8794b625ac276302a401f7d826d57b169721c1" },
      url: URLDB,
    };
    axios(options).then(async function (res) {
      console.log(res.status)
      const result = await res.json()
      resolve(result)
    }).catch(e => reject(e))
  })

}
function getRegions({ country }) {
  return fetchSQL("GET", "/regions/" + country).then(json => json)
}
function textSearch(query = {}) {
  return new Promise((resolve, reject) => {
    fetchData("GET", "/admin-wines", query)
      .then(array => {
        console.log({ array })
        resolve(array);
      })
      .catch(e => reject(e))
  })
}
function fetchSearch(query = {}) {
  return function (dispatch) {
    return new Promise(async function (resolve, reject) {
      fetchData("GET", "/wines/", query)
        .then(array => {
          dispatch(setResults(array))
          resolve();
        })
        .catch(e => reject(e))
    })
  }
}
function fetchWines(cellarId = '', wineId = '', query = {}) {
  return function (dispatch) {
    return new Promise(async function (resolve, reject) {
      fetchData("GET", "/wines/" + wineId, query)
        .then(json => {
          if (json && json.wines) {
            dispatch(setWines(json.wines))
            dispatch(setTimeQuery(moment(json.mostRecentUpdate).toDate()))
          }

          resolve();
        })
        .catch(e => reject(e))
    })
  }
}
function deleteCellar(cellarArray) {
  return function (dispatch) {
    return new Promise(async function (resolve, reject) {
      let body = { cellars: cellarArray }
      fetchData("DELETE", "/cellars/", {}, body)
        .then(array => {
          dispatch(removeCellars(cellarArray))
          resolve();
        })
        .catch(e => reject(e))
    })
  }
}
function moveWines(all = false, wineArray, cellarId, newCellarId) {
  return function (dispatch) {
    return new Promise(async function (resolve, reject) {
      let params = {}
      let body = {}
      if (all) {
        params = {
          allSelect: true,
          cellarId,
          newCellarId
        }
      } else {
        body = { wines: wineArray }
        params = { newCellarId }
      }
      fetchData("PUT", "/wines/", params, body)
        .then(array => {
          dispatch(setWines([array]))
          resolve();
        })
        .catch(e => reject(e))
    })
  }
}
function deleteWine(all = false, wineArray, cellarId) {
  return function (dispatch) {
    return new Promise(async function (resolve, reject) {
      let params = {}
      let body = {}
      if (all) {
        params = {
          allSelect: true,
          cellarId: cellarId
        }
      } else {
        body = { wines: wineArray }
      }
      fetchData("DELETE", "/wines/", params, body)
        .then(array => {
          if (all) dispatch(removeWines(cellarId))
          else dispatch(removeWines(wineArray))
          resolve();
        })
        .catch(e => reject(e))
    })
  }
}
function saveWine(wine, wineId = '') {
  return function (dispatch) {
    return new Promise(async function (resolve, reject) {
      fetchData("POST", "/wines/" + wineId, {}, wine)
        .then(array => {
          dispatch(setWines([array]))
          resolve();
        })
        .catch(e => reject(e))
    })
  }
}
function saveCellar(cellar, cellarId = '') {
  return function (dispatch) {
    return new Promise(async function (resolve, reject) {
      fetchData("POST", "/cellars/" + cellarId, {}, cellar)
        .then(array => {
          console.log(array)
          dispatch(setCellars([array]))
          resolve();
        })
        .catch(e => reject(e))
    })
  }
}
function fetchCellars(cellarId = '') {
  return function (dispatch) {
    return new Promise(async function (resolve, reject) {
      fetchData("GET", "/cellars/" + cellarId)
        .then(array => {
          dispatch(setCellars(array))
          resolve();
        })
        .catch(e => {
          console.log(e)
          reject(e)
        })
    })
  }
}
function getUser() {
  return function (dispatch) {
    return new Promise(async function (resolve, reject) {
      fetchData("GET", "/user")
        .then(user => {
          if (!user) {
            reject(e) //don't propagate null to redux. the case is treated in front (go to profileForm)
            return;
          } else {
            dispatch(setUser(user));
            resolve(user);
          }
        })
        .catch(e => reject(e))
    })
  }
}
function fetchCredentials() {
  return new Promise(function (resolve, reject) {
    fetchData("GET", "/authConnected")
      .then(res => {
        socket = io(URL, {
          query: { token: res.token },
          secure: true,
          transports: ['websocket'],
        });
        resolve(socket)
      })
      .catch(e => reject(e))
  })
}
function resetPass(email) {
  return new Promise(async function (resolve, reject) {
    fetchData("POST", "/askForReset", {}, { email }) //email dans body
      .then((json) => {
        console.log({ json })
        resolve()
      })
      .catch(e => {
        console.log("ERREUR MAIL: " + e)
        reject(e)
      })
  })
}
function askForConfirmation(email) {
  return new Promise(async function (resolve, reject) {
    fetchData("GET", "/askForConfirmation", { email }).then((res) => {
      resolve()
    }).catch(e => {
      reject(e)
    })
  })
}
function logOutUser() {
  return function (dispatch) {
    return new Promise(async function (resolve, reject) {
      Auth.signOut().then((res) => {
        resetKeychain()
        dispatch(logOut());
        resolve()
      }).catch(e => {
        console.log(e)
        reject(e)
      })


    })
  }
}

function login(data, passport, name) {
  return new Promise(async function (resolve, reject) {
    //case : login attempt with customs credentials
    let query;
    let body;
    if (passport == 'email') {
      body = { name }
      query = { email: data.email, password: data.password }
    } else {
      query = { access_token: data.accessToken }
    }
    console.log(query)
    fetchData("POST", "/auth/" + passport + "/token", query, body)
      .then(async function (res) {
        console.log(res)
        await rememberEmailPassword(query, passport)
        // if (data && !passport) await rememberEmailPassword(res.userId,res.accessToken)
        resolve()
      })
      .catch(e => {
        console.log(e)
        resetKeychain()
        reject(e)
      })
  })
}
async function fetchSQL(method, path, query = '', body = {}) {
    try {
     const res = await fetch(SQL_URL + path + query, {
        method: method,
        credentials: 'include',
        ...(method !== 'GET' && { body: JSON.stringify(body) })
        // body: JSON.stringify(body) || "",
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Authorization':token.signInUserSession.idToken.jwtToken
  
      })
      const json = await res.json() //this is a promise
      return json
    } catch (e) {
      console.log("can't perform " + method + ", message: " + e)
    }
}

function fetchData(method, path, params, body) {
  return new Promise(async function (resolve, reject) {
    Auth.currentAuthenticatedUser().then((token) => {
      let query = "";
      if (params && Object.keys(params).length > 0) {
        query = "?" + Object.keys(params)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
          .join('&');
      }
      console.log(URL + path + query, {
        method: method,
        credentials: 'include',
        body: JSON.stringify(body) || "",
        headers: {
          'Content-Type': 'application/json',
          Authorization: token.signInUserSession.idToken.jwtToken
        }
      })
      fetch(URL + path + query, {
        method: method,
        credentials: 'include',
        body: JSON.stringify(body) || "",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token.signInUserSession.idToken.jwtToken
        }
      }).then(async function (res) {
        console.log(res)
        let credentials;
        let text;
        switch (res.status) {
          case 500:
            text = await res.text()
            reject(text || "bad password")
            break;
          case 502:
            reject("server error")
            break;
          case 422:
            reject("missing parameters")
            break;
          case 403:     // try login (renew token)
            //
            // try{
            //   credentials = await getCredentials()
            //   // resetKeychain()
            //   await login(credentials,credentials.type)
            //
            //   return fetchData(method,path,params,body)
            // }catch(e){
            //   console.log(e)
            reject("unauthorized, can't re-login")
            // }
            break;
          case 404:
            reject("not found")
            break;
          case 401:
            text = await res.text()
            reject(text || "bad password")
            break;
          case 410:
            reject("resource not available anymore")
            break;
          case 200:
            // ALL GOOD CASE
            return res.json() //this is a promise
            break;
          default:
            const statusText = await res.text()
            console.log({ statusText })
            reject("strange error")
            break;
        }
      }).then(json => {
        resolve(json)
      })
        .catch(e => {
          console.log("can't perform " + method + ", message: " + e)
          reject(e)
          return
        })//end fetch
    })//end fetch
  })//end promise
}
//
export { getRegions, searchWineBase, askForConfirmation, resetPass, fetchCredentials, logOutUser, moveWines, deleteCellar, deleteWine, textSearch, fetchSearch, fetchCellars, fetchData, login, getUser, saveCellar, saveWine, fetchWines }
