/**
 * Simple validation middleware
 * Usage: validate({ body: { field: { required: true, type: 'string' } } })
 */
const validate = (schema) => (req, res, next) => {
    try {
        if (schema.body) {
            for (const [field, rules] of Object.entries(schema.body)) {
                const value = req.body[field];
                
                // Required check
                if (rules.required && !value) {
                    return res.status(400).json({ 
                        success: false,
                        message: `${field} is required` 
                    });
                }
                
                // Skip other validations if value is empty and not required
                if (!value) continue;
                
                // Type validation
                if (rules.type) {
                    if (rules.type === 'email') {
                        const emailRegex = /.+@.+\..+/;
                        if (!emailRegex.test(value)) {
                            return res.status(400).json({ 
                                success: false,
                                message: `${field} must be a valid email` 
                            });
                        }
                    } else if (rules.type === 'number') {
                        if (isNaN(value)) {
                            return res.status(400).json({ 
                                success: false,
                                message: `${field} must be a number` 
                            });
                        }
                    } else if (typeof value !== rules.type) {
                        return res.status(400).json({ 
                            success: false,
                            message: `${field} must be a ${rules.type}` 
                        });
                    }
                }
                
                // Min length
                if (rules.minLength && value.length < rules.minLength) {
                    return res.status(400).json({ 
                        success: false,
                        message: `${field} must be at least ${rules.minLength} characters` 
                    });
                }
                
                // Enum validation
                if (rules.enum && !rules.enum.includes(value)) {
                    return res.status(400).json({ 
                        success: false,
                        message: `${field} must be one of: ${rules.enum.join(', ')}` 
                    });
                }
            }
        }
        
        if (schema.params) {
            for (const [field, rules] of Object.entries(schema.params)) {
                 if (rules.required && !req.params[field]) {
                    return res.status(400).json({ 
                        success: false,
                        message: `URL parameter ${field} is required` 
                    });
                }
            }
        }

        next();
    } catch (err) {
        console.error('Validation error:', err);
        next(err);
    }
};

module.exports = { validate };
