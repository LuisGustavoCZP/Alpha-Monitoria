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
            if(resp) this.main.innerHTML = resp;
            
            /* const sps = this.main.getElementsByTagName('script');
            sps.forEach(element => {
                 
            }); */

            console.log("Carregado com sucesso!");
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

SinglePageElement.define();

export default SinglePageElement;