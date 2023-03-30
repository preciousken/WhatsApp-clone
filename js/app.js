class Session {
    constructor(){
        this.chatBrief = document.querySelector('message_body')
        // this.log()
        console.log(this.chatBrief);
    }


    log(){
        this.chatBrief.addEventListener('click',()=>{

            console.log('clicked');
        })
    
    }

}
