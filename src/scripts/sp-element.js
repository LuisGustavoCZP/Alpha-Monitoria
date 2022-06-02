class SinglePageElement extends HTMLElement 
{
    #src;

    static define ()
    {
        customElements.define('sp-element', SinglePageElement);
    }

    constructor()
    {
        self = super();

        if(this.hasAttribute('src')) 
        {
            console.log("Tem source!");
            this.src = this.getAttribute('src');
        }

        console.log("Iniciado!")
    }

    set src (_path)
    {
        this.innerHTML = "";
        this.#src = _path;
        const isBlank = !_path || _path == "";
        
        console.log("Carregando!");
        if(isBlank) { this.hidden = true; return;} else { this.hidden = false; }
        
        fetch(_path)
        .then(resp => resp.text())
        .then(resp => {
            this.innerHTML = resp;
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