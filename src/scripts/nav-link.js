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
        //if(this.containerEl) return;
        if(this.parentElement) this.start();
        else setTimeout(()=>{this.start()}, 100);
    }

    start ()
    {
        this.innerHTML = "";
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
            const id = `${source.menu}.${source.name}`;
            if(first)
            {
                first = false;
                if(!window.location.hash) window.location.hash = `#${id}`;
                //change(id);
            }
            this.containerEl.innerHTML += `<li><a title="${source.description}" href="#${id}">${source.title}</a></li>`;
        }
    } 

    get menu ()
    {
        return this.#menu;
    }
}

NavLink.define();