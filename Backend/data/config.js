import dotenv from 'dotenv'
import assert from 'assert'


dotenv.config();

const{port,sqlServer,sqlUser,sqlPwd,sqlDb,JWT_SECRET} = process.env



assert(port,'port is required');



const config ={
    port: 5000,
    sql:{
        user: "sa",
        password: "Wamutitu#1",
        server: "localhost",
        database: "MyCAFE",
        options: {
            encryt: true,
            trustServerCertificate: true
        }

    },
    jwt_secret: JWT_SECRET
}
export default config;