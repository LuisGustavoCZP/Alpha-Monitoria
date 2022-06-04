window.monitores = [];

async function iniciar ()
{
    window.menus = await fetch("https://script.google.com/macros/s/AKfycbzb4sv7b74DlplgxJ7a8xJQcTggVZFS8Aw2LMfVfNXxb6IJBJy9uE2NHKsdX35wI1xj0g/exec?sheet=Navigation")
    .then(resp => resp.json())
    .then(resp => 
    {
        
        const menus = {};
        for(let n of resp)
        {
            let m = menus[n.Menu];
            if(!m)
            {
                m = {};
                menus[n.Menu] = m;
            }
            m[n.ID] = n;
        }

        console.log("Navigation atualizada", resp, " to ", menus);
        return menus;
    })
    .catch(err => console.log(err));

    window.monitores = await fetch("https://script.google.com/macros/s/AKfycbzb4sv7b74DlplgxJ7a8xJQcTggVZFS8Aw2LMfVfNXxb6IJBJy9uE2NHKsdX35wI1xj0g/exec?sheet=Monitores")
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
}

iniciar ();