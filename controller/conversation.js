
const createConversation = async(req,res)=>{
    try {
        res.status(400).json({
            status:true,
            message:`Conversation created successfully`,
            // Data: user
        })
        return;
    } catch (error) {
        res.status(500).json({
            error : 'UNKNOWN_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }
}


module.exports={createConversation}