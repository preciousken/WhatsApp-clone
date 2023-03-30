class Session {
    constructor(){
        this.chatBrief = document.querySelector('.message_body')
        // this.log()
        console.log(this.chatBrief);
    }

    // Navigate to chatRoom
    NavigateToChat(){
        const home = document.querySelector('.home')
        home.classList.add('showchatroom')
        
    }

    // Navigate to Message Brief
    NavigateToMessageBrief(){
        home.classList.remove('showchatroom')
    }

}
