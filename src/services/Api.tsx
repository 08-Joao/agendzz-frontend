import { SignInInputDto } from "@/dtos/signin.dto";
import backendRoute from "./httpClient";
import { SignUpInputDto } from "@/dtos/signup.dto";

const Api = {
    signin: async function (data: SignInInputDto) {
        try {
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
        } catch (e) {
            console.log(e)
        }
    },
    signup: async function (data: SignUpInputDto) {
        try {
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
        } catch (e) {
            console.log(e)
        }
    },
    signout: async function () {
        try {
            const response = await backendRoute.post('/auth/signout', {}, { withCredentials: true })

            return response
        } catch(e) {
            console.log(e)
        }
    },
    getMe: async function () {
      try{
        const response = backendRoute.get('/auth/me', { withCredentials: true })

        return response
      }catch(e){
        console.log(e)
      }  
    },
    acceptInvitation: async function (token: string) {
        try {
            const response = await backendRoute.patch(`/invitation/accept/${token}`, {}, { withCredentials: true })

            return response
        } catch (e) {
            console.log(e)
        }
    },
    declineInvitation: async function (token: string) {
        try {
            const response = await backendRoute.patch(`/invitation/decline/${token}`, {}, { withCredentials: true })

            return response
        } catch (e) {
            console.log(e)
        }
    },
    getUserNotifications: async function () {
        try {
            const response = await backendRoute.get('/notifications', { withCredentials: true })

            return response
        } catch (e) {
            console.log(e)
        }
    },
    markNotificationAsRead: async function (notificationIds: string[]) {
        try { 
            const response = await backendRoute.patch(`/notifications/markAsRead`, {
                notificationIds
            }, { withCredentials: true })

            return response
        }catch(e){
            console.log(e)
        }
    }
}

export default Api