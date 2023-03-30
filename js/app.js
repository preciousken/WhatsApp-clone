class Session {
    constructor(){
        this.chatBrief = document.querySelector('.message_body')
        // this.home = document.querySelector('.home')
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

    // Everything related to logging to the chatRoom
    login(){
       document.querySelector('.signup').classList.add('hide')
    }

}
