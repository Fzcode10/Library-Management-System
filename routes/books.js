const express = require("express");
let { books } = require("../data/books.json")


const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the list of books in the system
 * Accecc: Public
 * Parameters: None
 */
router.get('', (req, res) => {
    console.log(books);
    res.status(200).json({
        Success: true,
        data: books
    })
})


/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by their id
 * Accecc: Public
 * Parameters: None
 */
router.get('/find/:id', (req, res) => {

    const { id } = req.params;
    // console.log(id);
    const book = books.find((each) => each.id == id);
    // console.log(book);

    if (!book) {
        return (
            res.status(404).json({
                success: false,
                message: `Book not found ${id}`
            })
        )
    }

    res.status(200).json({
        Success: true,
        data: book
    });
});


/**
 * Route: /books/add
 * Method: POST
 * Description: Create/Register a new User
 * Accecc: Public 
 * Parameters: None
 */

router.post('/add', (req, res) => {

    // req.body should have the fllowing fields
    const { id, name, author, genre, price, publisher } = req.body;
    console.log(`${id}, ${name}, ${author}, ${genre} ${price} , ${publisher}`);


    // Check all filed are present or not if not then return status 404
    if (!id || !name || !author || !genre || !price || !publisher) {
        return (
            res.status(404).json({
                success: false,
                message: "Please provide all the required field"
            })
        );
    }

    // If all field are available then check the user already exists or not 
    // If user already exist then retun with responce status 404
    const book = books.find((each) => each.id == id);
    if (book) {
        return (
            res.status(404).json({
                success: false,
                message: `Book Already Exists with id: ${id}`
            })
        );
    }

    // If user not exists then insert filed within given id 
    books.push({ id, name, author, price, publisher });

    res.status(201).json({
        success: true,
        message: `User profile created successfully with id : ${id}`
    })

})



/**
 * Route: /books/:id
 * Method: PUT
 * Description: Create/Register a new User
 * Accecc: Public
 * Parameters: None
 */

router.put('/update/:id', (req, res) => {

    const id = Number(req.params.id);  // Retrive ID from Body and convert that into number
    const { data } = req.body;

    console.log(id);
    console.log(data);

    // Check user is exists or not
    const book = books.find((each) => each.id === id);
    // console.log(user);

    // If user not exists
    if (!book) {
        return (
            res.status(404).json({
                success: false,
                message: `Book not found with id : ${id}`
            })
        )
    }

    // If user Exists

    books.map((each) => {
        if (each.id === id) {
            Object.assign(each, data);
        }
    });

    console.log(books);

    res.status(200).json({
        success: true,
        message: `Books updated by id : ${id} with given data`
    })
})


/**
 * Route: All user who issued the book with book id
 * Method: GET
 * Description: All user who issued specific book
 * Accecc: Public
 * Parameters: None
 */
router.get('/issueduser/:id', (req, res) => {

    let id = Number(req.params.id);
    console.log(id);

    const book = books.find((each) => each.id === id);

    if(!book){
        return( 
            res.status(404).json(
                {
                    success: false,
                    message: "There are no one who issued this book"
                }
            )
        )
    }

    books.map((each) => {
            if (each.id === id) {
            let data = each.issuedID;

            return (
                res.status(200).json(
                    {
                        success: true,
                        d: data,
                        message: "These user are issued this book"
                    }
                )
            )
    }
    })
});


/**
 * Route: All issued book 
 * Method: GET
 * Description: All book which are issued
 * Accecc: Public
 * Parameters: None
 */
router.get('/fine', (req, res) => {

    const bookWithFine = books.filter((each) => each.fine.length != 0);
    console.log(bookWithFine);

    if(bookWithFine.length === 0){
        return (
            res.status(404).json({
                success: false,
                message: "There are no any book with fine"
            })
        )
    }

    res.status(200).json({
        success: true,
        data: bookWithFine,
        message: "All book with fine detials"
    });
})



/**
 * Route: /books/delete/:id
 * Method: DELETE
 * Description: Create/Register a new User
 * Accecc: Public
 * Parameters: None
 */

router.delete('/delete/:id', (req, res) => {
    let id = Number(req.params.id);

    const book = books.find((each) => each.id === id);
    // console.log(user);

    // If user not exists
    if (!book) {
        return (
            res.status(404).json({
                success: false,
                message: `Book not found with id : ${id}`
            })
        )
    }
    //First Method 
    books = books.filter((each) => each.id !== id);

    // Secound Method but here id should same with index of obj list 
    //books.splice(id, 1);

    res.status(200).json({
        success: true,
        message: `Book deleted by id : ${id} from books list`
    })

});



module.exports = router;