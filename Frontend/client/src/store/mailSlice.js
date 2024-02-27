import { createSlice } from "@reduxjs/toolkit";

const mail = createSlice({
    name:'mail',
    initialState:{
        mails:[],
        totalUnread:0,
        sentMails:[],
    },
    reducers:{
        setMail:(state,action)=>{
            const {mail}= action.payload;
            let count=0;
            mail.map((item)=>{
                if(!item.read){
                    count++;
                }
              
            })

            state.totalUnread=count;
            state.mails=mail;
        },
        addMail:(state,action)=>{
            const {mail}= action.payload;
            state.mails= state.mails.push(mail);
            state.totalUnread=state.totalUnread+1;
        },
        getTotalUnreadMails:(state,action)=>{
            let count=0;
            state.mails.map((item)=>{
                if(!item.read){
                    count++;
                }
            })

            state.totalUnread=count;
        },
        updateReadInMail:(state,action)=>{
            const {id}=action.payload;

            const newmap= state.mails.map((item)=>{
                if(item.id==id){
                    item.read=true
                }
                return item
            })

            state.totalUnread=state.totalUnread-1;
            state.mails=newmap
        },
        deleteMail:(state,action)=>{
            const {id}=action.payload;

            const newarray=state.mails.filter((item)=>{
                if(item.id!=id){
                    return item
                }

            })

            state.mails=newarray;
        }
,
        setSentMail:(state,action)=>{
            const {mail}= action.payload;
           
            state.sentMails=mail;
        }
    }
})

export const {setMail,addMail,getTotalUnreadMails,updateReadInMail,deleteMail,setSentMail}=mail.actions
export default mail.reducer;