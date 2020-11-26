const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * @route POST api/users
 * @desc register user
 * @access public
 */

router.post('/', [
    // express validator
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'A valid e-mail address is required').isEmail(),
    check('password', 'Password needs to be 6 or more characters').isLength({ min: 6 })
],
    async (req, res) => {
        // check validation and stop execution if errors
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        const { name, email, password } = req.body;

        try {
            // check if user exists
            let user = User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            // create Mongo object
            user = new User({
                name,
                email,
                password
            })

            // encrypt pass
            salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // save user
            await user.save();

            // JWT
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
                if (err) {
                    throw err;
                }

                res.json({ token });
            })
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })

module.exports = router;