const jsonServer = require('json-server');
const server = jsonServer.create()
const router = jsonServer.router('./db/db.json')
const middlewares = jsonServer.defaults({ noCors: true })
const cors = require('cors');
server.use(jsonServer.bodyParser);
server.use(middlewares);

var whitelist = ['*'];

var corsOptions = {
    credentials: true,
    origin: true,//Allow all origins
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: 'accept, content-type'
};
server.use(cors(corsOptions));

server.get('/echo', (req, res) => {
    res.jsonp({ prueba: 'Correcta' })
})

server.use(jsonServer.bodyParser)
server.post('/authentication', (req, res) => {
    console.log("req ", req)
    if (req.method === 'POST') {
        res.status(200).jsonp(
            {
                "id": 1,
                "strategy": "local",
                "usuarioMail": "chimu@satelnet.cl",
                "usuarioPassword": "demo",
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NTc2NDczNDksImV4cCI6MTY1NzczMzc0OSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiMzUiLCJqdGkiOiI4N2NiNWM4Zi00Y2JhLTQ2MjgtOTU4NC04OGIwZTI1ZDY2MmQifQ.8gIrTdg1ZwIQo8PKhULTGoEKL97tcy4hTesVEJkVH2g",
                "user": {
                    "empresaId": 7,
                    "centroId": 1,
                    "empresa": 7,
                    "centro": 25,
                    "usuarioRol": req.body.usuarioMail,
                }
            }
        );
    }
});


server.use(router);
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

router.render = (req, res) => {
    res.jsonp({
        "total": res.locals.data.length,
        "limit": 40,
        "skip": 0,
        "data": res.locals.data
    })
}

server.listen(3020, () => {
    console.log("JSON Server is running");
});