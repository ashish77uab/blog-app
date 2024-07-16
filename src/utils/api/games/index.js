const devEnv = process.env.NODE_ENV !== "production";
const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;
export const API_URL=devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API
export const createGame= async (url,data)=>{
    return fetch(`/api/${url}`, {
         headers: {
      'Content-Type': 'application/json',
    },
        method: 'POST',
        body: JSON.stringify(data),
    })
}
export const createQuestions = async (url,data)=>{
    return fetch(`/api/${url}`, {
         headers: {
      'Content-Type': 'application/json',
    },
        method: 'POST',
        body: JSON.stringify(data),
    })
}
export const getGames= async (url)=>{
    const res= await fetch(`http://localhost:3000/api/${url}`, {
        method: 'GET',
    })
    return res.json()
}