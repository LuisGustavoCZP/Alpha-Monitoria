class FormSheetElement extends HTMLElement 
{
    url;
    form = null;

    static define ()
    {
        customElements.define('form-sheet', FormSheetElement);
    }

    constructor()
    {
        self = super();

        const content = this.innerHTML;
        this.innerHTML = '';
        this.form = document.createElement("form");
        this.form.innerHTML = content;
        this.append(this.form);

        if(this.hasAttribute('url')) 
        {
            //console.log("Tem source!");
            this.url = this.getAttribute('url');
        }
        
        this.form.addEventListener('submit', e => 
        {
            e.preventDefault();
            this.submit();
        });
    }

    submit () 
    {
        if(!this.url) return;
        console.log("Sending form")
        fetch(this.url, { method: 'POST', body: new FormData(this.form) })
        .then(response => { console.log('Success!', response) })
        .catch(error => console.log('Error!', error.message))

        this.form.reset();
    }
}

FormSheetElement.define();

//export default FormSheetElement;