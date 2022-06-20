class FormSheetElement extends HTMLElement 
{
    url;
    form = null;
    onsubmitsucess = null;

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
        
        this.onsubmitsucess = new Event('submitsucess');

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
            this.dispatchEvent(this.onsubmitsucess);
        })
        .catch(error => console.log('Error!', error.message))

        this.form.reset();
    }
}

FormSheetElement.define();

class MonitoriaForm extends FormSheetElement 
{
    sheet;
    constructor()
    {
        super();
        
        this.url = window.backend.api;
        if(this.hasAttribute('sheet')) 
        {
            this.sheet = this.getAttribute('sheet');
            this.url += `/${this.sheet}`;
            console.log(this.url);
        }
    }

    static define ()
    {
        customElements.define('form-monitoria', MonitoriaForm);
    }

}

MonitoriaForm.define();
export default {FormSheetElement, MonitoriaForm};