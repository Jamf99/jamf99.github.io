import Vue from "vue";
import Vuex from "vuex";
import md5 from 'md5'
import db from './firebase'
Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    state:{
        users:[],
        messages: [],
        subjects: [],
        flagUserValidation: false,
        flagUserRegister: false,
        flagUserEdit: false,
        flagUserDelete:false,
        flagMessageCreation: false, 
        flagMessageEdit: false,
        flagMessageDelete: false,
        flagSubjectCreation: false,
        flagSubjectEdit: false, 
        flagSubjectDelete: false
    },
    getters:{
        getUsers: state => state.users,
        getMessages: state=> state.messages,
        getSubjects: state=> state.subjects,
        getFlagUserValidation: state=> state.flagUserValidation,
        getFlagUserRegister: state=> state.flagUserRegister,
        getFlagUserEdit: state=> state.flagUserEdit,
        getFlagUserDelete:state=> state.flagUserDelete,
        getFlagMessageCreation:state=> state.flagMessageCreation,
        getFlagMessageEdit: state=> state.flagMessageEdit,
        getFlagMessageDelete:state=> state.flagMessageDelete,
        getFlagSubjectCreation: state => state.flagSubjectCreation,
        getFlagSubjectEdit: state => state.flagSubjectEdit,
        getFlagSubjectDelete: state=> state.flagSubjectDelete
    },  
    mutations:{
        setUsers(state,users){
            state.users= users
        },
        setMessages(state,messages){
            state.messages= messages
        },
        setSubjects(state,subjects){
            state.subjects= subjects
        },
        setFlagValidation(state,flag){
            state.flagUserValidation= flag
        },
        setFlagRegister(state,flag){
            state.flagUserRegister= flag
        },
        setFlagUserEdit(state,flag){
            state.flagUserEdit= flag
        },
        setFlagUserDelete(state, flag){
            state.flagUserDelete= flag
        },
        setFlagMessageCreation(state,flag){
            state.flagMessageCreation= flag
        },
        setFlagMessageEdit(state,flag){
            state.flagMessageEdit= flag
        },
        setFlagMessageDelete(state, flag){
            state.flagMessageDelete= flag
        },
        setFlagSubjectCreation(state,flag){
            state.flagSubjectCreation= flag
        },
        setFlagSubjectEdit(state,flag){
            state.flagSubjectEdit= flag
        },
        setFlagSubjectDelete(state, flag){
            state.flagSubjectDelete= flag
        }
    },
    actions:{
        getAllUsers: function({commit}){
            let collect= [];
            db.collection("users").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    collect.push(doc.data())
                });
            }).then(function(){
                commit('setUsers',collect)
            })
        },
        getAllMessages: function({commit}){
            let collect= [];
            db.collection("messages").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    collect.push(doc.data())
                });
            }).then(function(){
                commit('setMessages',collect)
            })
        },
        getAllSubjects: function({commit}){
            let collect= [];
            db.collection("subjects").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    collect.push(doc.data())
                });
            }).then(function(){
                commit('setSubjects',collect)
            })
        },
        registerMessage: function({commit},payload){
            const idMessage= this.getters.getMessages().length
            const idResponse=payload.idResponse
            if(idResponse.localeCompare("")!=0){
                var message = db.collection("messages").doc(idResponse).then(function(){
                    message.update({
                        responses: db.FieldValue.increment(1)
                    })
                    .then(function() {
                        console.log("Document successfully updated!");
                        // this.$store.dispatch('getAllMessages')
                    })
                    .catch(function(error) {
                        commit('setFlagMessageCreation',false)
                        console.error("Error updating document: ", error);
                    });
                })
            }
            const idSubject= payload.idSubject
            var subject = db.collection("subjects").doc(idSubject).then(function(){
                subject.update({
                    numMessages: db.FieldValue.increment(1)
                })
                .then(function() {
                    this.$store.dispatch('getAllSubjects')
                    console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    commit('setFlagMessageCreation',false)
                    console.error("Error updating document: ", error);
                });
            })
            const idUser= payload.idUser
            var user = db.collection("users").doc(idUser).then(function(){
                user.update({
                    numMessages: db.FieldValue.increment(1)
                })
                .then(function() {
                    // this.$store.dispatch('getAllUsers')
                    console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    commit('setFlagMessageCreation',false)
                    console.error("Error updating document: ", error);
                });
            })
            const responses= 0
            const text= payload.text;
            db.collection('messages').doc(idMessage+"").set({ idMessage,idResponse,idSubject,idUser,responses,text}).then(function() {
                commit('setFlagMessageCreation',true)
            }).catch(function() {
                commit('setFlagMessageCreation',false)
            });
        },
        editMessage:function({commit},payload){
            const idMessage= payload.idMessage
            const idResponse=payload.idResponse
            const idSubject= payload.idSubject
            const idUser= payload.idUser
            const responses= payload.responses
            const text= payload.text;
            db.collection('messages').doc(idMessage+"").set({ idMessage,idResponse,idSubject,idUser,responses,text}).then(function() {
                // this.$store.dispatch('getAllMessages')
                commit('setFlagMessageEdit',true)
            }).catch(function() {
                commit('setFlagMessageEdit',false)
            });
        },
        deleteMessage: function({commit},payload){
            if(payload.responses==0){
                db.collection('messages').doc(payload.idMessage+"").delete().then(function() {
                    commit('setFlagMessageDelete',true)
                    // this.$store.dispatch('getAllMessages')
                }).catch(function() {
                    commit('setFlagMessageDelete',false)
                });
            }
            else{
                commit('setFlagMessageDelete',false)
            }
        },
        registerSubject: function({commit},payload){
            const idSubject= payload.idSubject
            const theme= payload.theme
            const numMessages =0
            db.collection('subjects').doc(idSubject+"").set({ idSubject,theme, numMessages}).then(function() {
                commit('setFlagSubjectCreation',true)
            }).catch(function() {
                commit('setFlagSubjectCreation',false)
            });
        },
        editSubject: function({commit},payload){
            const idSubject= payload.idSubject
            const theme= payload.theme
            const numMessages =payload.numMessages
            db.collection('subjects').doc(idSubject+"").set({ idSubject,theme, numMessages})
            .then( ()=> {
                // this.$store.dispatch('getAllSubjects')
                commit('setFlagSubjectEdit',true)
            }).catch(function(error) {
                console.log(error)
                commit('setFlagSubjectEdit',false)
            });
        },
        deleteSubject: function({commit}, payload){
            if(payload.numMessages==0){
                db.collection('subjects').doc(payload.idSubject+"").delete().then(function() {
                    // this.$store.dispatch('getAllSubjects')
                    commit('setFlagSubjectDelete',true)
                }).catch(function() {
                    commit('setFlagSubjectDelete',false)
                });
            }
            else{
                commit('setFlagSubjectDelete',false)
            }
        },
        validateUser: function({commit},payload){
            const collect= []
            db.collection("users").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    collect.push(doc.data())
                });
            }).then(function(){
                var validation= false
                collect.forEach(element => {
                    if(element.email.localeCompare(payload.email) == 0){
                        if(element.password.localeCompare(encode(payload.password))== 0){
                            validation= true;
                        }
                    }
                });
                commit('setFlagValidation',validation)
            })
        },
        registerUser: function({commit},payload){
            var collect= []
            db.collection("users").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    collect.push(doc.data())
                });
            }).then(function(){
                var validation= false
                collect.forEach(element => {
                    if(element.email.localeCompare(payload.email) == 0){
                            validation= true;
                    }
                });
                if(!validation){
                    const name= payload.name
                    const lastName=payload.lastName
                    const email= payload.email
                    const password= encode(payload.password)
                    const numMessages= 0
                    const id= collect.length;
                    const active= true
                    db.collection('users').doc(id+"").set({ name, lastName, email,password,numMessages,id,active})
                    commit('setFlagRegister',true)
                }
                else{
                    const message= "Error ! already exist the user";
                    commit('setFlagRegister',message)
                }
            })
        },
        editUser:function({commit},payload){
            var collect= []
            db.collection("users").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    collect.push(doc.data())
                });
            }).then(function(){
                var validation= false
                collect.forEach(element => {
                    if(element.email.localeCompare(payload.email) == 0){
                        if(element.id.localeCompare(payload.id)!=0){
                            validation= true;
                        }
                    }
                });
                if(!validation){
                    const name= payload.name
                    const lastName=payload.lastName
                    const email= payload.email
                    const password= encode(payload.password)
                    const numMessages= payload.numMessages
                    const id= payload.id;
                    const active= payload.active
                    db.collection('users').doc(id+"").set({ name, lastName, email,password,numMessages,id,active})
                    commit('setFlagUserEdit',true)
                }
                else{
                    // const message= "Error ! already exist the user";
                    commit('setFlagUserEdit',false)
                }
            })
        },
        deleteUser: function({commit},payload){
            if(payload.numMessages==0){
                db.collection('users').doc(payload.id+"").delete().then(function() {
                    commit('setFlagUserDelete',true)
                }).catch(function() {
                    commit('setFlagUserDelete',false)
                });
            }
            else{
                commit('setFlagUserDelete',false)
            }
        }
    }
})
function encode(param){
    return md5(param);
}