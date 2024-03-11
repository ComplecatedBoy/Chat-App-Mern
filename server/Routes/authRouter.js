const router= require("express").Router();
const { signup,login,setAvatar,getAllContacts }=require("../Controllers/authController")

router.post("/signup",signup);
router.post("/login",login)
router.post("/setAvatar/:id",setAvatar);
router.get("/getAllContacts/:id",getAllContacts)

module.exports = router;