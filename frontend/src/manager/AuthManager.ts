export class AuthManager{
    async login(username: string, password: string) : Promise<void>{
        if(username != "admin" || password != "admin"){
            throw new Error("Invalid credentials provided.");
        }
    }
    async loginAsGuest() : Promise<void>{

    }
    
    async register(username: string, password: string) : Promise<void>{

    }

    async logout(){

    }
}