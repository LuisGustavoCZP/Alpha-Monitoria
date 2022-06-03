class SinglePageElement extends HTMLElement 
{
    #src;
    main = null;
    title = null;

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

        if(this.hasAttribute('src')) 
        {
            //console.log("Tem source!");
            this.src = this.getAttribute('src');
        }
        
        window.spe = this;
    }

    runScripts ()
    {
        const sps = this.main.getElementsByTagName('script');
        console.log(sps);
        for(const sp of sps)
        {
            sp.remove();
            const cont = sp.innerText;
            const csrc = sp.src;
            const nscr = document.createElement("script");
            if(cont) nscr.innerText = cont;
            if(csrc) nscr.src = csrc;
            this.main.append(nscr);
            //console.log("Trocando", sp, "por", nscr)
        }
    }

    /**
    * @param {String} _path
    */
    set src (_source)
    {
        if(this.src) this.classList.remove(this.src.title.toLowerCase());
        this.main.innerHTML = "";
        this.#src = _source;
        const isBlank = !_source || _source == "";
        
        //console.log("Carregando!");
        if(isBlank) { this.hidden = true; return;} else { this.hidden = false; }
        
        fetch(_source.link)
        .then(resp => resp.text())
        .then(resp => 
        {
            this.classList.add(_source.title.toLowerCase());
            this.title.innerHTML = _source.title;
            if(resp) 
            {
                this.main.innerHTML = resp;
                this.runScripts ();
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