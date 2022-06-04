import spelement from './sp-element.js';

class NavLink extends HTMLElement 
{
    #menu;
    containerEl = null;
    sources = [];

    static define ()
    {
        customElements.define('nav-link', NavLink);
    }

    constructor(...args)
    {
        self = super(...args);// 

        if(this.parentElement) this.start();
        else setTimeout(()=>{this.start()}, 100);
    }

    start ()
    {
        this.containerEl = document.createElement("ul");
        const nav = document.createElement("nav");
        nav.append(this.containerEl);
        this.append(nav);

        if(this.hasAttribute('menu')) 
        {
            this.menu = this.getAttribute('menu');
        }
    }

    /**
    * @param {String} _path
    */
    set menu (_path)
    {
        this.#menu = _path;
        const isBlank = !_path || _path == "";
        
        //console.log("Carregando!");
        if(isBlank) { this.hidden = true; return;} else { this.hidden = false; }
        
        this.containerEl.innerHTML = "";
        this.sources = window.menus[this.menu];
        console.log(this.sources);
        let first = true;
        for(const sourceid in this.sources) 
        {
            const source = this.sources[sourceid];
            console.log(sourceid, source);
            const id = `${source.Menu}.${source.ID}`;
            if(first)
            {
                first = false;
                window.location.hash = `#${id}`;
                //change(id);
            }
            this.containerEl.innerHTML += `<li><a title="${source.Desc}" href="#${id}">${source.Titulo}</a></li>`;
        }
    } 

    get menu ()
    {
        return this.#menu;
    }
}

function change (_id)
{
    const path = _id.split(".");
    spe.src = window.menus[path[0]][path[1]];
}

window.addEventListener('popstate', ()=>
{
    const h = window.location.hash.replace("#", "");
    console.log("mudou para " + h);
    change(h);
});

NavLink.define();