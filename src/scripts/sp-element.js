class SinglePageElement extends HTMLElement 
{
    #src;
    main = null;
    title = null;
    onloadevent = null;

    static define ()
    {
        customElements.define('sp-element', SinglePageElement);
    }

    constructor()
    {
        self = super();

        this.title = document.createElement("h2");
        this.main = document.createElement("main");
        
        this.append(this.title);
        this.append(this.main);

        this.onloadevent = new Event('loadevent');
        if(this.hasAttribute('src')) 
        {
            //console.log("Tem source!");
            this.src = { path:this.getAttribute('src') };
        }

        window.spe = this;
    }

    removeScripts (scripts)
    {
        if(!scripts) return;
        for(const sp of scripts)
        {
            console.log("Deletando", sp);
            sp.remove();
        }
    }

    runScripts (scripts)
    {
        if(!scripts) return;
        for(const sp of scripts)
        {
            const cont = sp.innerText;
            const csrc = sp.src;
            const nscr = document.createElement("script");
            
            if(cont) nscr.innerText = `(() => {${cont}})()`;
            if(csrc) nscr.src = csrc;

            this.main.append(nscr);
            console.log("Trocando", sp, "por", nscr);
        }
    }

    /**
    * @param {String} _path
    */
    set src (_source)
    {
        this.main.innerHTML = "";
        this.#src = _source;
        const isBlank = !_source || _source == "";
        
        //console.log("Carregando!");
        if(isBlank) { this.hidden = true; return;} else { this.hidden = false; }
        
        fetch(_source.path)
        .then(resp => resp.text())
        .then(resp => 
        {
            if(!this.src) throw new Error("Page not exist!");

            if(this.src.title) 
            {
                this.title.innerHTML = _source.title;
            }
            if(resp) 
            {
                const p = document.createElement("div");
                p.innerHTML = resp;
                const scriptsC = p.getElementsByTagName('script');
                const scripts = Object.values(scriptsC);
                this.removeScripts(scripts);
                this.main.innerHTML = p.innerHTML;
                this.runScripts (scripts);
                if(this.onloadevent) this.dispatchEvent(this.onloadevent);
            }

            console.log("Carregado com sucesso!");
        })
        .catch(err => {
            console.log("Page can not be loaded!", err);
            this.hidden = true;
        });
    } 

    get src ()
    {
        return this.#src;
    }
}

SinglePageElement.define();

export default SinglePageElement;