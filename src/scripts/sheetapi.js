window.monitores = [];
window.api = "https://script.google.com/macros/s/AKfycbzb4sv7b74DlplgxJ7a8xJQcTggVZFS8Aw2LMfVfNXxb6IJBJy9uE2NHKsdX35wI1xj0g/exec";
window.backend = {
    //api:"https://backendalphamonitoria10.andersonferreiraalves.com",
    api:"http://localhost:3333",
    datas:[
        "navigations",
        "trails",
        "monitors",
        "doubts",
        "revisions",
        "materials"
    ],
    options:{
        get: {
            method:"GET",
            mode:"cors",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
        },
        post: {
            method:"POST",
            mode:"cors",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
        }
    }
}

import navlink from "./nav-link.js";
import forms from "./form-sheet.js";
import main from "./components/main.js";

window.components = { main };

/* {
    main: {
        home: main.home,
        doubts: main.doubts,
        revision: main.revision,
        staff: main.staff,
    },
} */

async function iniciar ()
{
    window.trilhas = await fetch(`${backend.api}/trails`, backend.options.get)
    .then(resp => resp.json())
    .then(resp => 
    {
        
        
        return Object.fromEntries(
            resp.map(object => {
              return [object.name, object];
            }),
        );
    })
    .catch(err => console.log(err));
    console.log("Trilhas atualizada", window.trilhas);

    window.monitores = await fetch(`${backend.api}/mentorships`)
    .then(resp => resp.json())
    .then(resp => 
    {
        return resp;
    })
    .catch(err => console.log(err));
    console.log("Montoria atualizada", window.monitores);

    window.menus = await fetch(`${backend.api}/navigations`, backend.options.get)
    .then(resp => resp.json())
    .then(resp => 
    {
        //console.log(resp);
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

    const p = document.querySelector("body > header");
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
    const path = h.split(".");
    const newPath = window.menus[path[0]][path[1]];
    const changed = spe.src != newPath;
    if(!changed) return;
    console.log("mudou para ", newPath);
    spe.src = newPath;
    spe.addEventListener("loadevent", () => 
    {
        const funcComponent = window.components[path[0]][path[1]]
        if(funcComponent) {
           try { 
            funcComponent(); 
           } catch(e) { console.log(e); }
        }
    });
}

iniciar ();