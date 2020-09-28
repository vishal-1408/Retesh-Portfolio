$(".nav-link").addClass("cb");
$(".navbar-brand").addClass("cb")

//////////////////////////////////////////using the object intead of normal global variables as vars manipulated inside of an event listener can't be accessed outside!!

function Type(Element, array, wait=3000){
    this.Element=Element;
    this.words=array;
    this.text='';
    this.wait=parseInt(wait);
    this.currentIndex=0;
    this.typing();                             ///function not dfined here !!
    this.isDeleting=false;
}

////defining the type function

Type.prototype.typing=function(){
    var currentword = this.words[this.currentIndex];
    //console.log("current",currentword);
    if(!this.isDeleting){
        this.text=currentword.substring(0,this.text.length+1);
    }else{
        this.text=currentword.substring(0,this.text.length-1);
    }
    this.Element.innerHTML=`<span class='pointer'>${this.text}</span>`;

    
    let typeSpeed=250;

    if(this.isDeleting){
        typeSpeed/=2;
    }


    if(!this.isDeleting && this.text===currentword){
        this.isDeleting=true;
        typeSpeed=this.wait;
        
    }else if(this.text==='' && this.isDeleting){
        this.isDeleting=false;
        this.currentIndex++;
        this.currentIndex%=this.words.length;
        typeSpeed=300;
    }

 


    setTimeout(()=>this.typing(),typeSpeed);
}
















document.addEventListener('DOMContentLoaded',main);

function main(){
    var Element = document.querySelector(".typewriter");
    var wait = Element.getAttribute("data-wait");
    var words= JSON.parse(Element.getAttribute("data-words"));
    new Type(Element,words,wait);
    console.log("loaded");
}