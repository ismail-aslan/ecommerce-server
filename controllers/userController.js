const catchAsync = require('./../utils/catchAsync');


exports.getUsers = catchAsync(async (req, res, next) => {
    res.status(204).send({
        status: 'success',
        data: null
    });
});

exports.getUserById = catchAsync(async (req, res, next) => {
    res.status(204).send({
        status: 'success',
        data: null
    });
});

exports.createUser = catchAsync(async (req, res, next) => {
    // if mail is already registered
    return next(new Error('This email has alredy been taken!'))
    // await User.create(req.user.id, { active: false });
    // res.status(204).send({
    //     status: 'success',
    //     data: null
    // });
});

exports.updateUserById = catchAsync(async (req, res, next) => {
    res.status(204).send({
        status: 'success',
        data: null
    });
});

exports.deleteUserById = catchAsync(async (req, res, next) => {
    res.status(204).send({
        status: 'success',
        data: null
    });
});