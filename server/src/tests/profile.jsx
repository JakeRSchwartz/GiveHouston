const { registerUser } = require('../src/controllers/registerUser');
const { DI } = require('../src/middleware/di');
const { User } = require('../src/entities/user.entity');
const bcrypt = require('bcrypt');
const {expect} = require("@jest/globals");
import { jest } from '@jest/globals';

jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword123'),
}));

describe('registerUser', () => {
    let mockEm;
    let mockRequest;
    let mockResponse;
    let jsonMock;
    let statusMock;
    let sendMock;

    beforeEach(() => {

        mockEm = {
            fork: jest.fn().mockReturnThis(),
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            persistAndFlush: jest.fn(),
        };


        DI.orm = { em: mockEm };


        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock, send: jsonMock });
        sendMock = jest.fn();
        mockRequest = {
            body: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                address1: '123 Main St',
                address2: '',
                city: 'Houston',
                state: 'Texas',
                zip: '77004',
                skills: ['Leadership','Teamwork'],
                preferences: 'Outdoors',
                availability: ['2024-03-10'],
            },
        };
        mockResponse = {
            status: statusMock,
            json: jsonMock,
            send: sendMock,
        };
    });

    test('should register a new user successfully', async () => {
        mockEm.findOne.mockResolvedValue(null);
        mockEm.find.mockResolvedValue([]);
        mockEm.create.mockImplementation((entity, data) => data); // Simulate entity creation

        await registerUser(mockRequest, mockResponse);

        expect(mockEm.findOne).toHaveBeenCalledWith(User, { email: 'john.doe@example.com' });
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
        expect(mockEm.persistAndFlush).toHaveBeenCalled();
        expect(sendMock).toHaveBeenCalledWith('Registered successfully');
        expect(statusMock).toHaveBeenCalledWith(201);
    });

    test('should return 400 if required fields are missing', async () => {
        mockRequest.body.firstName = ''; // Missing first name

        await registerUser(mockRequest, mockResponse);

        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Missing required fields' });
    });

    test('should return 409 if user already exists', async () => {
        mockEm.findOne.mockResolvedValue({ id: 1, email: 'john.doe@example.com' });

        await registerUser(mockRequest, mockResponse);

        expect(statusMock).toHaveBeenCalledWith(409);
        expect(sendMock).toHaveBeenCalledWith('User already exists');
    });

    test('should return 500 on unexpected errors', async () => {
        mockEm.findOne.mockRejectedValue(new Error('Database error'));

        await registerUser(mockRequest, mockResponse);

        expect(statusMock).toHaveBeenCalledWith(500);
        expect(sendMock).toHaveBeenCalledWith('An unknown error occurred');
    });
});
