# pragma-express

uso 
```
import { Service } from "pragma-express"
import {Request, Response, Router} from 'express'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {res.status(200).send('Service is working correctly!')})

class ServiceAPI extends Service {
    constructor() {
        super();
    }

    public setRoutes(): void {
        this.express.use('/api/', router)
    }
}
const PORT = 3030
const service = new ServiceAPI()

service.express.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})```