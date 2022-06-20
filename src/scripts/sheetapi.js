window.monitores = [];
window.api = "https://script.google.com/macros/s/AKfycbwxd-RZlLM0vO72L79P2UgT4ppVwUUsv5h4cPQQMo82wcm5N4B5KGjnkdxlB5fGs9pLtg/exec";

import formsheet from "./form-sheet.js";
import navlink from "./nav-link.js";
const searchStrings = window.location.search.replace("?", "").replaceAll("=", ":").split("&");
const searchDatas = {}
searchStrings.forEach((d) => {
    const [key, value] = d.split(":");
    searchDatas[key] = value;
});

console.log("Search", searchDatas);

async function iniciar ()
{
    window.trilhas = await fetch(`${window.api}?sheet=Trilhas`)
    .then(resp => resp.json())
    .then(resp => 
    {
        console.log("Trilhas atualizada", resp);
        
        return Object.fromEntries(
            resp.map(object => {
              return [object.name, object];
            }),
        );
    })
    .catch(err => console.log(err));
    console.log(window.trilhas);

    window.menus = await fetch(searchDatas["user"] ? `${window.api}?sheet=Navigation&user=${searchDatas["user"]}`: `${window.api}?sheet=Navigation`)
    .then(resp => resp.json())
    .then(resp => 
    {
        const menus = {};
        for(let n of resp)
        {
            let m = menus[n.menu];
            if(!m)
            {
                m = {};
                menus[n.menu] = m;
            }
            m[n.name] = n;
        }

        console.log("Navigation atualizada", resp, " to ", menus);
        return menus;
    })
    .catch(err => console.log(err));

    window.monitores = await fetch(`${window.api}?sheet=Monitores`)
    .then(resp => resp.json())
    .then(resp => 
    {
        console.log("Montoria atualizada", resp);
        return resp;
    })
    .catch(err => console.log(err));

    const p = document.querySelector("body > header");
    console.log(p);
    const navlink = document.createElement("nav-link");
    
    p.append(navlink);
    navlink.setAttribute("menu", "main");

    window.addEventListener('popstate', changePage);
    if(window.location.hash)
    {    
        changePage();
    }
}

function changePage ()
{
    const h = window.location.hash.replace("#", "");
    console.log("mudou para " + h);
    const path = h.split(".");
    spe.src = window.menus[path[0]][path[1]];
}

iniciar ();