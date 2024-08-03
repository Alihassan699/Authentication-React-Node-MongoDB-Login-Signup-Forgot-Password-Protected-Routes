import rateLimit from 'express-rate-limit';

// Map to track IP attempts and cooldowns
const attemptLog = new Map();

// Helper function to get the current cooldown time
const getCooldownTime = (attempts) => {
    if (attempts === 1) return 15 * 60 * 1000; // 15 minutes
    if (attempts === 2) return 30 * 60 * 1000; // 30 minutes
    // Increase time progressively
    return Math.min(60 * 60 * 1000, (2 ** (attempts - 1)) * 15 * 60 * 1000); // Max 1 hour
};

// Middleware function for rate limiting
const otpLimiter = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const userAttempts = attemptLog.get(ip) || { count: 0, lastAttempt: now };

    if (userAttempts.count > 0) {
        const cooldownTime = getCooldownTime(userAttempts.count);
        if (now - userAttempts.lastAttempt < cooldownTime) {
            return res.status(429).json({
                message: `Too many requests. Try again in ${Math.ceil((cooldownTime - (now - userAttempts.lastAttempt)) / 60000)} minutes.`,
            });
        }
    }

    // Proceed with the request and update the attempt log
    attemptLog.set(ip, {
        count: userAttempts.count + 1,
        lastAttempt: now,
    });

    next();
};

export default otpLimiter;
