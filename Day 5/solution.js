/**
 * Day 5: Object Manipulation and Destructuring
 */

// Sample user data
const userProfile = {
    personal: {
        name: 'John Doe',
        age: 28,
        email: 'john@example.com',
        address: {
            street: '123 Main St',
            city: 'New York',
            country: 'USA'
        }
    },
    preferences: {
        theme: 'dark',
        notifications: true,
        language: 'en'
    },
    social: {
        twitter: '@johndoe',
        linkedin: 'john-doe-123'
    }
};

// 1. Basic destructuring with aliases and defaults
const extractBasicInfo = (user) => {
    const { 
        personal: { 
            name: fullName = 'Anonymous', 
            age = 0, 
            email: contactEmail 
        },
        preferences: { 
            theme = 'light' 
        } = {}
    } = user;
    
    return { fullName, age, contactEmail, theme };
};

// 2. Nested destructuring for address
const extractAddress = (user) => {
    const {
        personal: {
            address: {
                street,
                city,
                country = 'Unknown'
            } = {}
        } = {}
    } = user;
    
    return `${street}, ${city}, ${country}`;
};

// 3. Dynamic property access
const getNestedProperty = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
};

const setNestedProperty = (obj, path, value) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
        if (!(key in current)) current[key] = {};
        return current[key];
    }, obj);
    target[lastKey] = value;
    return obj;
};

// 4. Object merging and cloning
const mergeProfiles = (profile1, profile2) => {
    // Deep merge using recursive approach
    const deepMerge = (target, source) => {
        const result = { ...target };
        
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = deepMerge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        
        return result;
    };
    
    return deepMerge(profile1, profile2);
};

// 5. Safe property checking
const hasNestedProperty = (obj, path) => {
    try {
        return getNestedProperty(obj, path) !== undefined;
    } catch {
        return false;
    }
};

// 6. Extract all social media links
const extractSocialMedia = ({ social = {} }) => {
    return Object.entries(social).map(([platform, handle]) => ({
        platform,
        handle,
        url: generateSocialUrl(platform, handle)
    }));
};

const generateSocialUrl = (platform, handle) => {
    const urls = {
        twitter: `https://twitter.com/${handle.replace('@', '')}`,
        linkedin: `https://linkedin.com/in/${handle}`,
        github: `https://github.com/${handle}`,
        instagram: `https://instagram.com/${handle}`
    };
    return urls[platform] || `https://${platform}.com/${handle}`;
};

// User Profile Manager Class
class UserProfileManager {
    constructor(profile) {
        this.profile = { ...profile };
    }
    
    updateProfile(updates) {
        this.profile = mergeProfiles(this.profile, updates);
        return this;
    }
    
    getInfo(path) {
        return getNestedProperty(this.profile, path);
    }
    
    setInfo(path, value) {
        setNestedProperty(this.profile, path, value);
        return this;
    }
    
    getSummary() {
        const basicInfo = extractBasicInfo(this.profile);
        const address = extractAddress(this.profile);
        const socialMedia = extractSocialMedia(this.profile);
        
        return {
            ...basicInfo,
            address,
            socialMedia,
            hasNotifications: hasNestedProperty(this.profile, 'preferences.notifications')
        };
    }
}

// Tests
console.log('=== Day 5 Tests ===');
console.log('Basic info:', extractBasicInfo(userProfile));
console.log('Address:', extractAddress(userProfile));
console.log('Theme setting:', getNestedProperty(userProfile, 'preferences.theme'));
console.log('Social media:', extractSocialMedia(userProfile));

const manager = new UserProfileManager(userProfile);
console.log('Profile summary:', manager.getSummary());

// Test updates
manager.updateProfile({
    personal: { age: 29 },
    social: { github: 'johndoe' }
});
console.log('Updated summary:', manager.getSummary());

module.exports = {
    extractBasicInfo,
    extractAddress,
    getNestedProperty,
    setNestedProperty,
    mergeProfiles,
    extractSocialMedia,
    UserProfileManager
};