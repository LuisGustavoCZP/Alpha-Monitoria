window.monitores = [];
window.api = "https://script.google.com/macros/s/AKfycbzb4sv7b74DlplgxJ7a8xJQcTggVZFS8Aw2LMfVfNXxb6IJBJy9uE2NHKsdX35wI1xj0g/exec";
window.apiurl = "https://backendalphamonitoria10.andersonferreiraalves.com";
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

    window.menus = await fetch(`${window.apiurl}/navigations`,
    {
        method:"GET",
        mode:"no-cors",
        headers: {
            "Content-Type": "application/json"
        }
    })
    /* .then(resp => resp.json()) */
    .then(resp => 
    {
        console.log(resp.status);
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