const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

jest.mock('jsonwebtoken');
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn().mockImplementation((token, secret, callback) => {
      if (token === 'validToken') callback(null, { id: '12345' });
      else callback(new Error('Invalid token'));
    }),
  }));

describe('verifyToken Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = { cookies: {}, headers: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }; 
        next = jest.fn(); 
    });

    it('should proceed to the next middleware if token is valid', () => {
        const mockToken = 'mockValidToken';
        const mockDecoded = { userId: '123', role: 'admin' };
        req.cookies.token = mockToken;

        jwt.verify.mockReturnValue(mockDecoded); 

        verifyToken(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.JWT_SECRET_KEY);
        expect(req.userId).toBe(mockDecoded.userId);
        expect(req.role).toBe(mockDecoded.role);
        expect(next).toHaveBeenCalled();
    });

    it('should return 401 if no token is provided', () => {
        verifyToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'Inavalid token' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', () => {
        const mockToken = 'mockInvalidToken';
        req.cookies.token = mockToken;

        jwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        verifyToken(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.JWT_SECRET_KEY);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'Error while verifying token' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should handle errors during verification gracefully', () => {
        const mockToken = 'mockErrorToken';
        req.cookies.token = mockToken;

        jwt.verify.mockImplementation(() => {
            throw new Error('Some error');
        }); 

        verifyToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'Error while verifying token' });
        expect(next).not.toHaveBeenCalled();
    });
});
