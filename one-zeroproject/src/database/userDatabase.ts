import { ozmapUserDTO } from "../model/user";
import { BaseDatabase } from "./baseDatabase";

export class UserDatabase extends BaseDatabase {
    userTable = 'ozmap_users'

    insertUserOnDB = async (input:ozmapUserDTO) => {
        try {
            
            await BaseDatabase.connection(this.userTable)
            .insert(input)

        } catch (e) {
            if(e instanceof Error) {
                throw new Error(e.message)
            }

        }
    }

    showUserTable = async () => {
        try{

           const usersList = await BaseDatabase.connection(this.userTable)
           .select('*')
           .orderBy('name') 

           return usersList
            
        } catch (e) {

            if(e instanceof Error) {
                throw new Error(e.message)
            } 

        }
    }

    getUserById = async (id:string) => {
        try{

            const user = await BaseDatabase.connection(this.userTable)
            .select('*')
            .where({id})
 
            return user
             
         } catch (e) {
 
            if(e instanceof Error) {
                throw new Error(e.message)
            } 
 
        }
    }

    deleteUserOfDB = async (id:string) => {
        try{
            
            await BaseDatabase.connection(this.userTable)
            .where({id})
            .del()

        } catch (e) {
            if(e instanceof Error) {
                throw new Error(e.message)
            }

        }
    }

    updateUserInfo = async (id:string, input:ozmapUserDTO) => {
        const {name, email, age} = input

        try{

            await BaseDatabase.connection(this.userTable)
            .where({id})
            .update({name, email, age})

        } catch (e) {
            if(e instanceof Error) {
                throw new Error(e.message)
            }

        }
    
    }

}