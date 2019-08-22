export const appService = {
    capitilize(txt: string) {
        return txt.charAt(0).toUpperCase() + txt.slice(1);
    }
}