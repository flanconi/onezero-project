import { UserDatabase } from "../database/userDatabase";
import { ozmapUser, ozmapUserDTO } from "../model/user";
import { IdGenerator } from "../services/idGenerator";

export class UserBusiness {
    constructor(
        private idGenerator:IdGenerator,
        private userDatabase:UserDatabase,
    ){}

    insertUserOnDB = async (input:ozmapUserDTO):Promise<void> => {
        const {name, email, age} = input

        if(!name || !email || !age){
            throw new Error('Fill up the fields.')
        }

        if(age < 18){
            throw new Error('User must be older than 18 years old.')
        }
        

        const id = this.idGenerator.generateID()

        const inputModelOnDB:ozmapUser = {
            id: id,
            name: name,
            email: email,
            age: age
        }

        await this.userDatabase.insertUserOnDB(inputModelOnDB)
    }

    showUserTable = async () => {
        
        const usersList = await this.userDatabase.showUserTable()

        return usersList
    }

    getUserById = async (id:string) => {
        if(!id){
            throw new Error('Missing user id.')
        }

        const user = await this.userDatabase.getUserById(id)
 
        return user
    }

    deleteUserOfDB = async (id:string):Promise<void> => {
        if(!id){
            throw new Error('Missing user id.')
        }
        
        await this.userDatabase.deleteUserOfDB(id)
    }

    updateUserInfo = async (id:string, input:ozmapUserDTO):Promise<void> => {
        const {name, email, age} = input
        
        if(!name || !email || !age){
            throw new Error('Fill up the fields')
        }

        if(!id){
            throw new Error('Missing user id.')
        }
        
        await this.userDatabase.updateUserInfo(id, input)
    }
}