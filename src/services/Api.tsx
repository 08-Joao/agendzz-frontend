import { SignInInputDto } from "@/dtos/signin.dto";
import backendRoute from "./httpClient";
import { SignUpInputDto } from "@/dtos/signup.dto";

const Api = {
    signin: async function(data: SignInInputDto) {
        const response = await backendRoute.post('/auth/signin', 
            data,
             { 
                headers: { 
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )

        return response
    },
    signup: async function(data: SignUpInputDto) {
        const response = await backendRoute.post('/auth/signup', 
            data,
             {
                headers: { 
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )

        return response
    }
}

export default Api