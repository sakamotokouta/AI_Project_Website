
import bcrypt from 'bcrypt';



let Password = '12345'

//パスワードのハッシュ化
export const hashPassword = async(password:string):Promise<string> =>{
    const hash = await bcrypt.hash(password,12);
    return hash;
}

export const verifyPassword = async(password:string,hash:string):Promise<boolean> =>{
    const result = bcrypt.compare(password,hash);
    let flg:boolean = false;
    if(result){
        flg = true;
    }else{
        flg = false;
    }
    return flg;
}

//hashPassword(Password);

