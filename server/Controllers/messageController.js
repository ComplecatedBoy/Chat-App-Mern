const Message=require("../Models/messageModel.js")

exports.addMessage=async (req, res, next) => {
    let{from,to,message}=req.body;
    try {
        const msg = Message.create({
            message:{text: message},
            users:[from,to],
            sender:from
        });
        if(msg){
            res.json({msg:"message added successfully",status:true})
        }else{
            res.json({msg:"Message couldn't be saved in DB",status:false})
        }
    } catch (e) {
        res.json({msg:e.message,status:false});
    }
}

exports.getAllMessage=async (req,res,next)=>{
    let { from ,to }=req.body;

    try {
        let messages= await Message.find({
            users:{$all:[from,to]}
        }).sort({'updatedAt':1});
        if(messages){
            
            let projectMessages=messages.map((msg)=>{
                return {
                    sendSelf:msg.sender.toString()===from,
                    message:msg.message.text
                }
            })
            res.json({data:projectMessages,status:true});
        }
        else
        res.json({msg:"Can't get any message",status:false})
        
    } catch (e) {
        console.log(e.message);
        res.json({msg:e.message,status:true})
    }

}