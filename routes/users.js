const express = require("express");
let { users } = require("../data/users.json")

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Accecc: Public
 * Parameters: None
 */
router.get('', (req, res) => {
    res.status(200).json({
        Success: true,
        data: users
    });
});

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get user by their id
 * Accecc: Public
 * Parameters: None
 */
router.get('/find/:id', (req, res) => {

    const { id } = req.params;
    // console.log(id);
    const user = users.find((each) => each.id == id);
    // console.log(user);

    if (!user) {
        return (
            res.status(404).json({
                success: false,
                message: `User not found ${id}`
            })
        )
    }

    res.status(200).json({
        Success: true,
        data: user
    });
});


/**
 * Route: /users/add
 * Method: POST
 * Description: Create/Register a new User
 * Accecc: Public
 * Parameters: None
 */

router.post('/add', (req, res) => {

    // req.body should have the fllowing fields
    const { id, name, surname, email, phone, membershipType, joinDate } = req.body;
    console.log(`{${id}, ${name}, ${surname}, ${email}, ${phone}, ${membershipType}, ${joinDate}`);


    // Check all filed are present or not if not then return status 404
    if (!id || !name || !surname || !email || !phone || !membershipType || !joinDate) {
        return (
            res.status(404).json({
                success: false,
                message: "Please provide all the required field"
            })
        );
    }

    // If all field are available then check the user already exists or not 
    // If user already exist then retun with responce status 404
    const user = users.find((each) => each.id == id);
    if (user) {
        return (
            res.status(404).json({
                success: false,
                message: `User Already Exists with id: ${id}`
            })
        );
    }

    // If user not exists then insert filed within given id 
    users.push({ id, name, surname, email, phone, membershipType, joinDate })

    res.status(201).json({
        success: true,
        message: `User profile created successfully with id : ${id}`
    })

})




/**
 * Route: /users/update/:id
 * Method: PUT
 * Description: Create/Register a new User
 * Accecc: Public
 * Parameters: None
 */

router.put('/update/:id', (req, res) => {

    const  id  = Number(req.params.id);  // Retrive ID from Body and convert that into number
    const { data } = req.body;

    console.log(id);
    console.log(data);

    // Check user is exists or not
    const user = users.find((each) => each.id === id);
    // console.log(user);

    // If user not exists
    if (!user) {
        return (
            res.status(404).json({
                success: false,
                message: `User not found with id : ${id}`
            })
        )
    }

    // If user Exists

    users.map((each) => {
        if (each.id === id) {
            Object.assign(each, data);
        }
    });

    console.log(users);

    res.status(200).json({
        success: true,
        message: `User updated by id : ${id} with given data`
    })

})


/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Create/Register a new User
 * Accecc: Public
 * Parameters: None
 */

router.delete('/delete/:id', (req, res) => {
    let id = Number(req.params.id);

    const user = users.find((each) => each.id === id);
    // console.log(user);

    // If user not exists
    if (!user) {
        return (
            res.status(404).json({
                success: false,
                message: `User not found with id : ${id}`
            })
        )
    }

    users = users.filter((each) => each.id !== id);

    // Object.assign(users, newUser);

    res.status(200).json({
        success: true,
        message: `User deleted by id : ${id} from users list`
    })

})



/**
 * Route: /users/subscription
 * Method: GET
 * Description: Users with subscription
 * Accecc: Public
 * Parameters: None
 */
router.get('/subscription', (req, res) => {
    const userWithSubscription = users.filter((each) => each.membershipType != null);

    if(userWithSubscription.length === 0){
        return (
            res.status(404).json({
                success: false,
                message: "There are no any user with subscription"
            })
        )
    }

    res.status(200).json({
        success: true,
        data: userWithSubscription,
        message:"These are the user with subscription"
    });
})


/**
 * Route: /users/subscriptionBasic
 * Method: GET
 * Description: Users with basic subscription
 * Accecc: Public
 * Parameters: None
 */
router.get('/subscription/basic', (req, res) => {
    const userWithSubscription = users.filter((each) => (each.membershipType != null && each.membershipType == "basic"));

    if(userWithSubscription.length === 0){
        return (
            res.status(404).json({
                success: false,
                message: "There are no any user basic(3 month) with subscription"
            })
        )
    }

    res.status(200).json({
        success: true,
        data: userWithSubscription,
        message:"These are the user with basic(3 month) subscription"
    });
})


/**
 * Route: /users/subscription/standard
 * Method: GET
 * Description: Users with standard subscription
 * Accecc: Public
 * Parameters: None
 */
router.get('/subscription/standard', (req, res) => {
    const userWithSubscription = users.filter((each) => (each.membershipType != null && each.membershipType == "standard"));

    if(userWithSubscription.length === 0){
        return (
            res.status(404).json({
                success: false,
                message: "There are no any user with standard(6 month) subscription"
            })
        )
    }

    res.status(200).json({
        success: true,
        data: userWithSubscription,
        message:"These are the user with standard(6 month) subscription"
    });
})


/**
 * Route: /users/subscription/premium
 * Method: GET
 * Description: Users with premium subscription
 * Accecc: Public
 * Parameters: None
 */
router.get('/subscription/premium', (req, res) => {
    const userWithSubscription = users.filter((each) => (each.membershipType != null && each.membershipType == "premium"));

    if(userWithSubscription.length === 0){
        return (
            res.status(404).json({
                success: false,
                message: "There are no any user with premium(12 month) subscription"
            })
        )
    }

    res.status(200).json({
        success: true,
        data: userWithSubscription,
        message:"These are the user with premium(12 month) subscription"
    });
})




// Subscription with lecture

/**
 * Route: user/subscription-detials/:id
 * Method: Get
 * Description: Subscription detials with by id
 * Accecc: Public
 * Parameters: None
 */
router.get('/subscription-detials/:id', (req, res) => {
    let  id  = Number(req.params.id);

    const user = users.find((each) => each.id === id);
    if(!user){
        return (
            res.status(404).json({
                success: false,
                message: `There are no any user with id : ${id}`
            })
        )
    }

    let membershipType = user.membershipType;
    let dateOfMembership = user.dateOfMembership;

    let date = new Date(dateOfMembership);

    // console.log(date);
    
    if(membershipType === "basic"){
        date.setMonth(date.getMonth() + 3);
    }else if(membershipType === "standard"){
        date.setMonth(date.getMonth() + 6);
    }else if(membershipType === 'premium'){
        date.setMonth(date.getMonth() + 12);
    }
    
    date = date.toISOString().split("T")[0];

    // console.log(date);
    const isActive = new Date(date) > new Date();

    res.status(200).json({
        success: true,
        DateOfMembership : dateOfMembership,
        DateofCompetingMemberShip : date,
        message: (isActive) ? "MemberShip active" : "MemberShip Expired"

    })
})



module.exports = router;