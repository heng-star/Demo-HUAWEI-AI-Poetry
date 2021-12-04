import { apis } from "../env"
export const getRandomApi = () => {
    return apis[Math.floor(Math.random() * apis.length)];
}