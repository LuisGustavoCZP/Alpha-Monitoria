import spelement from './sp-element.js';

class NavLink extends HTMLElement 
{
    #src;
    containerEl = null;
    hash = null;
    sources = [];

    static define ()
    {
        customElements.define('nav-link', NavLink);
    }

    constructor()
    {
        self = super();

        this.containerEl = document.createElement("ul");
        const nav = document.createElement("nav");
        this.append(nav);
        nav.append(this.containerEl);

        if(this.hasAttribute('src')) 
        {
            this.src = this.getAttribute('src');
        }
        
        window.addEventListener('popstate', ()=>
        {
            const h = window.location.hash;
            console.log("mudou para " + h);
            this.change(h);
        });
    }

    change (_id)
    {
        this.hash = _id;
        spe.src = this.sources[_id].link;
    }

    /**
    * @param {String} _path
    */
    set src (_path)
    {
        this.#src = _path;
        const isBlank = !_path || _path == "";
        
        //console.log("Carregando!");
        if(isBlank) { this.hidden = true; return;} else { this.hidden = false; }
        
        fetch(_path)
        .then(resp => resp.json())
        .then(resp => {
            this.containerEl.innerHTML = "";
            this.sources = {};
            resp.forEach((element) => 
            {
                const id = `#${element.title.toLowerCase()}`;
                this.sources[id] = element;
                this.containerEl.innerHTML += `<li><a title="${element.desc}" href="${id}">${element.title}</a></li>`;
            });
            //this.innerHTML = resp;
            if(resp.length > 0) this.change(`#${resp[0].title.toLowerCase()}`);
            console.log("Carregado com sucesso!", resp);
        })
        .catch(err => {
            console.log("Page can not be loaded!");
            this.hidden = true;
        });
    } 

    get src ()
    {
        return this.#src;
    }
}

NavLink.define();