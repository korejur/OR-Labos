const { Router } = require("express");
const controller = require('./controller');

const router = Router();

router.get("/", controller.getMuzeji);
router.get("/izlozbe", controller.getIzlozbe);
router.get("/izlozbe/opis/:opis", controller.getIzlozbaByOpis);
router.get("/izlozbe/:id", controller.getIzlozbaById);
router.get("/:id", controller.getMuzejById);


router.post("/izlozbe", controller.addIzlozba);

router.delete("/izlozbe/:id", controller.deleteIzlozba);

router.put("/izlozbe/:id", controller.updateIzlozba);

const handleUnsupportedMethod = (req, res) => {
    const allowedMethods = ["GET", "POST", "PUT", "DELETE"]; // Add supported methods here
    const requestedMethod = req.method.toUpperCase();

    if (!allowedMethods.includes(requestedMethod)) {
        const response = {
            status: "Not Implemented",
            message: "Method not implemented for requested resource",
            response: null
        };
        res.status(501).json(response);
    } else {
        const response = {
            status: "Error",
            message: "Method not allowed for requested resource",
            response: null
        };
        res.status(405).json(response);
    }
};

router.all('/', handleUnsupportedMethod);
router.all('/izlozbe', handleUnsupportedMethod);
router.all('/izlozbe/opis/:opis', handleUnsupportedMethod);
router.all('/izlozbe/:id', handleUnsupportedMethod);
router.all('/:id', handleUnsupportedMethod);

module.exports = router;
