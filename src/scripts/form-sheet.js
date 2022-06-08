class FormSheetElement extends HTMLElement 
{
    url;
    form = null;
    eventSubmitSucess = null;

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
        eventSubmitSucess = new Event('submitsucess');
        

        this.form.addEventListener('submit', e => 
        {
            e.preventDefault();
            this.submit();
        });
    }

    submit () 
    {
        if(!this.url) return;
        const formData = new FormData(this.form);
        console.log("Sending form", formData.entries())
        fetch(this.url, { method: 'POST', body: formData })
        .then(response => 
        { 
            console.log('Success!', response);
            this.dispatchEvent(eventSubmitSucess);
        })
        .catch(error => console.log('Error!', error.message))

        this.form.reset();
    }
}

FormSheetElement.define();

//export default FormSheetElement;