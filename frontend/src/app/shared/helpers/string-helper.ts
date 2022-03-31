export class StringHelper {
    public static isNullOrEmpty(val: any) : boolean {                
        if (val === undefined || val === null || val.toString().trim() === '') {
            return true;
        }
        return false;
    };
}