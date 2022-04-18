import { UserBusiness } from "../business/userBusiness";
import { Context } from 'koa'
import { ozmapUserDTO } from "../model/user";

export class UserController {
    constructor(
        private userBusiness:UserBusiness
    ){}

    insertUserOnDB = async (ctx:Context) => {
        const { name, email, age } = ctx.request.body

        const requestInput:ozmapUserDTO = {
            name,
            email,
            age
        }

        try{
            
            await this.userBusiness.insertUserOnDB(requestInput)

            ctx.body = { message: 'User added successfully.'}

        } catch (e){

            if(e instanceof Error) {

                if(e.message){
                    ctx.throw(400, e.message)

                }else {
                    ctx.throw(400, 'Problem inserting user')                
                }
            }

        }
    }

    showUserTable = async (ctx:Context) => {
        
        try {

            const usersList = await this.userBusiness.showUserTable()

            ctx.body = usersList

        } catch (e){

            if(e instanceof Error) {

                if(e.message){
                    ctx.throw(400, e.message)

                }else {
                    ctx.throw(404, 'There is no user to display')                
                }
            }

        }
        
    }

    getUserById = async (ctx:Context) => {
        const { id } = ctx.params

        try{

            const user = await this.userBusiness.getUserById(id)
 
            ctx.body = user
            
         } catch (e){

            if(e instanceof Error) {

                if(e.message){
                    ctx.throw(400, e.message)

                }else {
                    ctx.throw(404, 'There is no user to display')                
                }
            }

        }
    }

    deleteUserOfDB = async (ctx:Context) => {
        const { id } = ctx.params

        try{
            
            await this.userBusiness.deleteUserOfDB(id)

            ctx.body = { user: id, status: "deleted" }

        } catch (e){

            if(e instanceof Error) {

                if(e.message){
                    ctx.throw(400, e.message)

                }else {
                    ctx.throw(400, 'Problem deleting user')                
                }
            }

        }
    }

    updateUserInfo = async (ctx:Context) => {
        const { id } = ctx.params
        const { name, email, age } = ctx.request.body

        const requestInput:ozmapUserDTO = {
            name,
            email,
            age
        }

        try{

            await this.userBusiness.updateUserInfo(id, requestInput)

            ctx.body = { user: id, status: "updated" }
            
        }catch (e){

            if(e instanceof Error) {

                if(e.message){
                    ctx.throw(400, e.message)

                }else {
                    ctx.throw(400, 'Problem updating user')                
                }
            }

        }
    }


}